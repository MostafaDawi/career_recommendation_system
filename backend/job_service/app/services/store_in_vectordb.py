import httpx
import os
from dotenv import load_dotenv

load_dotenv()

VECTORDB_SERVICE_URL = os.getenv("VECTORDB_SERVICE_URL", "http://vectordb_service:8005/store")

async def send_to_vectordb_service(job: dict):

    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(f"{VECTORDB_SERVICE_URL}/store", json=job)
            response.raise_for_status()
        except httpx.HTTPStatusError as e:
            raise Exception(f"Embedding service error: {e.response.status_code} - {e.response.text}")
        except httpx.RequestError as e:
            raise Exception(f"Connection error: {e}")
        
        return response.json()