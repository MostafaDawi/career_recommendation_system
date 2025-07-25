from fastapi import APIRouter
from app.services.embeddings import merge_fields, generate_embedding
from app.schemas import schemas

router = APIRouter(prefix="/embed")

@router.get("/")
def read_root():
    return{"message":"careercompass embedding dervice is running!"}

@router.post("/embedding/user")
def create_embedding(data: schemas.userInputData):
    combined_text = merge_fields(data.model_dump(),"user")
    embedding = generate_embedding(combined_text)
    return {"embedding": embedding}

@router.post("/embedding/job")
def create_job_embedding(data: schemas.JobInputData):
    combined_text = merge_fields(data.model_dump(), "job")
    embedding = generate_embedding(combined_text)
    return {"embedding": embedding}