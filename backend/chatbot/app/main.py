from fastapi import FastAPI
from pydantic import BaseModel
from app.chatbot import FAQBot
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS setup to allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or your frontend URL like ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

bot = FAQBot()

class Query(BaseModel):
    question: str

@app.post("/faq")
def faq_response(query: Query):
    response = bot.get_answer(query.question)
    return {"answer": response}

@app.get("/")
def read_root():
    return {"message": "Career Recommendation Chatbot is running!"}

@app.get("/health")
def health():
    return {"status":"ok"}
