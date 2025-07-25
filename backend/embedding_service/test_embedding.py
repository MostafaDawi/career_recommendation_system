from embeddings import merge_fields, generate_embedding
user_input_data = {
    "interests": "reading, music",
    "skills": "python, data analysis",
    "personality": "curious and motivated",
    "description": "student"
}

user_text = merge_fields(user_input_data, "user")
print("User Combined text:", user_text)

user_embedding = generate_embedding(user_text)
print("User Embedding vector:", user_embedding)

job_input_data = {
    "title": "Data Analyst",
    "description": "Analyze data and create reports"
}

job_text = merge_fields(job_input_data, "job")
print("\nJob Combined text:", job_text)

job_embedding = generate_embedding(job_text)
print("Job Embedding vector:", job_embedding)
