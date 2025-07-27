import httpx
import os
from dotenv import load_dotenv

load_dotenv()

EMBEDDING_SERVICE_URL = os.getenv("EMBEDDING_SERVICE_URL", "http://embedding_service:8003/embed/job")

async def send_to_embedding_service(job):
    payload = {
        "id": str(job.id),
        "title": job.title,
        "description": job.description,
    }

    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(EMBEDDING_SERVICE_URL, json=payload)
            response.raise_for_status()
        except httpx.HTTPStatusError as e:
            raise Exception(f"Embedding service error: {e.response.status_code} - {e.response.text}")
        except httpx.RequestError as e:
            raise Exception(f"Connection error: {e}")
        
        return response.json()