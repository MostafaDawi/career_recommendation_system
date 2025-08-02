from sentence_transformers import SentenceTransformer
model = SentenceTransformer('all-MiniLM-L6-v2')

def merge_fields(data: dict, mode: str) -> str:
    if mode == "user":
        interests = data.get("interests", "")
        skills = data.get("skills", "")
        personality = data.get("personality", "")
        description = data.get("description", "")
        combined_text = f"Interests: {interests}. Skills: {skills}. Personality: {personality}. Description: {description}"
    elif mode == "job":
        title = data.get("title", "")
        description = data.get("description", "")
        requirements = data.get("requirements", "")
        combined_text = f"Title: {title}. Description: {description}. Requirements: {requirements}"
    else:
        combined_text = ""
    return combined_text

def generate_embedding(text: str):
    embedding = model.encode(text)
    return embedding.tolist()

