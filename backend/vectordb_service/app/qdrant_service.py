from qdrant_client import QdrantClient, models

client = QdrantClient("http://qdrant:6333")

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