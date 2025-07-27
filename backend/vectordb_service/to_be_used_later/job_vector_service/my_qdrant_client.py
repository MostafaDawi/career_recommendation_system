from qdrant_client import QdrantClient, models

client = QdrantClient("http://localhost:6333")

collection_name = "jobs-collection"
EMBEDDING_DIMENSIONALITY = 512

def create_collection():
    client.recreate_collection(
        collection_name=collection_name,
        vectors_config=models.VectorParams(
            size=EMBEDDING_DIMENSIONALITY,
            distance=models.Distance.COSINE
        )
    )
