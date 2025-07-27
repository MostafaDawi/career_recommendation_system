from fastapi import FastAPI
from fastapi.concurrency import asynccontextmanager
from app import schemas  # <- your defined Pydantic models
from app.qdrant_service import client, collection_name, create_collection  # from qdrant_client.py
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

    search_result = client.search(
        collection_name=collection_name,
        query_vector=request.vector,
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