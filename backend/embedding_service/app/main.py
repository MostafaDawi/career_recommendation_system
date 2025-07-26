from fastapi import FastAPI
from app.routes import embedding_routes

app = FastAPI()

app.include_router(embedding_routes.router)
    
@app.get("/")
async def root():
    return {"message": "Welcome to the Embedding Service!"}