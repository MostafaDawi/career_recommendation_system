from fastapi import FastAPI
from schemas import SearchRequest, SearchResult  # <- your defined Pydantic models

from my_qdrant_client import client, collection_name  # from qdrant_client.py
from embedding import embed_text  # from embeddings.py

from qdrant_client.http.models import PointStruct, Filter, FieldCondition, MatchValue

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Vector search API is running!"}


@app.post("/search")
def search_query(request: SearchRequest):
    vector = embed_text(request.query)

    search_result = client.search(
        collection_name=collection_name,
        query_vector=vector,
        limit=request.top_k
    )

    results = []
    for hit in search_result:
        payload = hit.payload
        results.append({
            "job_title": payload.get("job_title", "N/A"),
            "company": payload.get("company", "N/A"),
            "location": payload.get("location", "N/A"),
            "score": hit.score
        })

    return {"results": results}
