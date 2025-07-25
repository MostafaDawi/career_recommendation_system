from fastapi import FastAPI
from pydantic import BaseModel
from embeddings import merge_fields, generate_embedding
app = FastAPI()
class userInputData(BaseModel):
    interests: str
    skills: str
    personality: str
    description:str
class JobInputData(BaseModel):
    title: str
    description: str
@app.get("/")
def read_root():
    return{"message":"careercompass embedding dervice is running!"}
@app.post("/embedding/user")
def create_embedding(data: userInputData):
    combined_text = merge_fields(data.dict(),"user")
    embedding = generate_embedding(combined_text)
    return {"embedding": embedding}
@app.post("/embed/job")
def create_job_embedding(data: JobInputData):
    combined_text = merge_fields(data.dict(), "job")
    embedding = generate_embedding(combined_text)
    return {"embedding": embedding}