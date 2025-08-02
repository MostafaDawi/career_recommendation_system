from fastapi import FastAPI, HTTPException
from fastapi.concurrency import asynccontextmanager
from pydantic import BaseModel
from app import schemas  # <- your defined Pydantic models
from app.qdrant_service import client, collection_name, create_collection, EMBEDDING_DIMENSIONALITY  # from qdrant_client.py
from app.util import send_to_embedding_service
from qdrant_client.http.models import PointStruct, Filter, FieldCondition, MatchValue

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Run this on startup
    create_collection()
    yield
    # (optional) cleanup code on shutdown

app = FastAPI(lifespan=lifespan)

@app.get("/")
def read_root():
    return {"message": "Vector search API is running!"}


@app.post("/search")
async def search_query(request: schemas.SearchRequest):

    res = schemas.SearchRequest(vector=request.vector, top_k=request.top_k)
    print(f"Received vector: {res.vector} with top_k: {res.top_k}")
    
    search_result = client.search(
        collection_name=collection_name,
        query_vector=res.vector,
        limit=res.top_k
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

@app.post("/store")
async def store_vector(job: schemas.JobPosting_v2):
    if len(job.embedding) != EMBEDDING_DIMENSIONALITY:
        raise HTTPException(status_code=400, detail=f"Embedding must be {EMBEDDING_DIMENSIONALITY} dimensions")

    point = PointStruct(
        id=str(job.id),  # <-- This acts as the foreign key in Qdrant
        vector=job.embedding,
        payload={
            "job_id": str(job.id),  # Optional but good to also include in payload
            "job_title": job.title,
            "description": job.description,
            "salary": job.salary,
            "location": job.location,
            "tags": job.tags,
        }
    )

    client.upsert(
        collection_name=collection_name,
        points=[point]
    )

    return {"status": "success", "job_id": job.id}