import httpx
from app import schemas

async def send_to_embedding_service(request: schemas.SearchUser):
    payload = request.model_dump()
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post("http://embedding_service:8003/embed/user", json=payload)
            response.raise_for_status()
        except httpx.HTTPStatusError as e:
            raise Exception(f"Embedding service error: {e.response.status_code} - {e.response.text}")
        except httpx.RequestError as e:
            raise Exception(f"Connection error: {e}")
        
        return response.json()