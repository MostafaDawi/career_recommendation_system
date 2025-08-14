from qdrant_client import QdrantClient, models
from dotenv import load_dotenv
import os

load_dotenv()

VECTORDB_URL = os.getenv("QDRANT_URL")
if (os.getenv("ENV") != "Development"):
    API_KEY = os.getenv("API_KEY")

client = QdrantClient(url=VECTORDB_URL, api_key=API_KEY)

collection_name = "jobs-collection"
EMBEDDING_DIMENSIONALITY = 384

def create_collection():
    if not client.collection_exists(collection_name):
        client.create_collection(
            collection_name=collection_name,
            vectors_config=models.VectorParams(
                size=EMBEDDING_DIMENSIONALITY,
                distance=models.Distance.COSINE
            )
        )