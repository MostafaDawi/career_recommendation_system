from fastembed import TextEmbedding

model_name = "jinaai/jina-embeddings-v2-small-en"
model = TextEmbedding(model_name=model_name)

def embed_text(text: str):
    return list(model.embed([text]))[0]
