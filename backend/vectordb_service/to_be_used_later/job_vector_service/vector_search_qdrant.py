
# # Vector Search with Qdrant


# ## Step 0: Setup
# 
# ### Docker
#  pull the image and start the container using the following commands:
# 
# ```bash
# docker pull qdrant/qdrant
# 
# docker run -p 6333:6333 -p 6334:6334 \
#    -v "$(pwd)/qdrant_storage:/qdrant/storage:z" \
#    qdrant/qdrant
# 
# windows:
# docker run -p 6333:6333 -p 6334:6334 -v "path_name/qdrant_storage:/qdrant/storage" qdrant/qdrant
# 
# ```
# 
# - 6333 – REST API port
# - 6334 – gRPC API port
# 
# When you're running Qdrant in Docker, the Web UI is available at http://localhost:6333/dashboard
# 
# ### Installing Required Libraries
# 
# - The `qdrant-client` package. We'll be using the Python client, but Qdrant also offers official clients for JavaScript/TypeScript, Go, and Rust, so you can choose the best fit for your own projects.
# 
# - The `fastembed` package - an optimized embedding (data vectorization) solution designed specifically for Qdrant. Make sure you install version `>= 1.14.2` to use the **local inference** with Qdrant.


# ## Step 1: Import Required Libraries & Connect to Qdrant

from qdrant_client import QdrantClient, models
client = QdrantClient("http://localhost:6333") #connecting to local Qdrant instance


# ## Step 2: Study the Dataset

import pandas as pd

postings_df =pd.read_csv('data/postings.csv')
companies_df = pd.read_csv('data/companies.csv')

# Join company name
# Merge but keep both columns temporarily
df = postings_df.merge(companies_df[['company_id', 'name']], on='company_id', how='left')
df['company_name'] = df['company_name'].fillna(df['name'])
df = df.drop(columns=['name'])  # drop the extra column


df = df.dropna(subset=['description', 'title','company_name', 'skills_desc'])  # remove rows without content

# create a text field to embed
df['text'] = df['title'] + ' at ' + df['company_name'] + ' (' + df['location'] + ')' + '\n\n' + df['description']


# # Find a suitable embedding model
# 

from fastembed import TextEmbedding
TextEmbedding.list_supported_models()




## set dim to 512
import json

EMBEDDING_DIMENSIONALITY = 512

for model in TextEmbedding.list_supported_models():
    if model["dim"] == EMBEDDING_DIMENSIONALITY:
        print(json.dumps(model, indent=2))



model_handle = "jinaai/jina-embeddings-v2-small-en"


# ## Step 4: Create a Collection

collection_name = 'jobs-collection'

# Create the collection with specified vector parameters
client.create_collection(
    collection_name=collection_name,
    vectors_config=models.VectorParams(
        size=EMBEDDING_DIMENSIONALITY,  # Dimensionality of the vectors
        distance=models.Distance.COSINE  # Distance metric for similarity search
    )
)


# ## Step 5: Create, Embed & Insert Points into the Collection

from fastembed import TextEmbedding

model = TextEmbedding(model_name=model_handle)


## batch embeddings
batch_size = 256

for i in range(0, len(df), batch_size):
    batch_df = df.iloc[i:i+batch_size]

    texts = batch_df['text'].tolist()
    try:
        vectors = list(model.embed(texts, batch_size=8))  # internal sub-batching
    except Exception as e:
        print(f"Batch {i} failed: {e}")
        continue

    points = [
        models.PointStruct(
            id=int(row['job_id']),
            vector=vectors[j],
            payload={
                "job_title": row['title'],
                "company": row['company_name'],
                "location": row['location'],
                "description": row['description'],
                "post_date": row['original_listed_time'],
                "work_type": row.get('formatted_work_type', 'unknown'),
            }
        )
        for j, (_, row) in enumerate(batch_df.iterrows())
    ]

    try:
        client.upsert(
            collection_name=collection_name,
            points=points
        )
        print(f"✅ Batch {i}–{i+batch_size} done.")
    except Exception as e:
        print(f"❌ Upsert failed for batch {i}: {e}")




##define a search function

def search(query, limit=1):

    results = client.query_points(
        collection_name=collection_name,
        query=models.Document( #embed the query text locally with "jinaai/jina-embeddings-v2-small-en"
            text=query,
            model=model_handle 
        ),
        limit=limit, # top closest matches
        with_payload=True #to get metadata in the results
    )

    return results


## pick a random user input : skill + company

import random
sample_query = df.sample(n=1).iloc[0].to_dict()

print(json.dumps(sample_query, indent=2))


query = f"{sample_query['formatted_work_type']} at {sample_query['company_name']}"
query_vector = list(model.embed([query]))[0]


# perform search in qadrant
search_result = client.search(
    collection_name="jobs-collection",
    query_vector=query_vector,
    limit=5  # number of similar results to retrieve
)


# view results
for res in search_result:
    print(f"ID: {res.id}, Score: {res.score}")
    # If you stored payload like job title, company, etc.:
    print(json.dumps(res.payload, indent=2))


# `score` – the cosine similarity between the `question` and `text` embeddings.
# 

# now search for soemthing that wasnt in the initial dataset

queries = [
    "Full-time roles in Carolina",
    "Remote software engineering jobs",
    "Marketing role in New York",
    "Part-time retail assistant near Chicago",
]

for q in queries:
    query_vector = list(model.embed([q]))[0]
    results = client.search(collection_name="jobs-collection", query_vector=query_vector, limit=3)
    print(f"\nQuery: {q}")
    for r in results:
        print(f"ID: {r.id}, Score: {r.score}")
        print(json.dumps(r.payload, indent=2))


similar = "Customer Service jobs in NC"
random = "Marine biologist in Iceland"

for q in [similar, random]:
    vector = list(model.embed([q]))[0]
    result = client.search(collection_name="jobs-collection", query_vector=vector, limit=1)
    print(f"\nQuery: {q}")
    print(f"Top Match Score: {result[0].score}")
    print(f"Top Match Title: {result[0].payload['job_title']}")


sample_query = "Warehouse job in Texas"
vec = list(model.embed([sample_query]))[0]
res = client.search(collection_name="jobs-collection", query_vector=vec, limit=1)
payload = res[0].payload
print(f"Job Title: {payload.get('job_title')}")
print(f"Company: {payload.get('company')}")
print(f"Work Type: {payload.get('work_type')}")
print(f"Description snippet: {payload.get('description', '')[:250]}")



def search_jobs(query, top_k=3):
    vec = list(model.embed([query]))[0]
    results = client.search(collection_name="jobs-collection", query_vector=vec, limit=top_k)
    for res in results:
        print(f"Score: {res.score}")
        print(f"Job Title: {res.payload['job_title']}")
        print(f"Company: {res.payload['company']}")
        print(f"Location: {res.payload['location']}")
        print('-' * 50)

# Example usage:
search_jobs("Remote data analyst position")

