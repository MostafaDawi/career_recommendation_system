from app.schemas import UserProfile
import httpx
import os
from fastapi import HTTPException
from dotenv import load_dotenv

load_dotenv()

EMBEDDING_SERVICE=os.getenv("EMBEDDING_SERVICE")
VECTOR_SERVICE=os.getenv("VECTOR_SERVICE")

async def get_recommendations(user: UserProfile):
    try:
        async with httpx.AsyncClient() as client:
            # 1️⃣ Send user data to the embedding service
            embedding_response = await client.post(
                f"{EMBEDDING_SERVICE}/user",  # <- Your 1st microservice URL
                json=user.model_dump()
            )
            embedding_response.raise_for_status()
            embeddings = embedding_response.json().get("embedding")

            if not embeddings:
                raise HTTPException(status_code=500, detail="Failed to get embeddings")

            # 2️⃣ Send embeddings to vector DB (job matching service)
            match_response = await client.post(
                f"{VECTOR_SERVICE}/search",  # <- Your 2nd microservice URL
                json={"vector": embeddings, "top_k": 3}
            )
            match_response.raise_for_status()
            jobs = match_response.json().get("results")

        return {"recommendations": jobs}

    except HTTPException as e:
        raise HTTPException(status_code=500, detail=str(e))