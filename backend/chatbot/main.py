<<<<<<< HEAD
=======

>>>>>>> fe9b67f1059cdf64251513d271dd8c34a6d9c664
from fastapi import FastAPI
from pydantic import BaseModel
from chatbot import FAQBot
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS setup to allow React frontend
app.add_middleware(
    CORSMiddleware,
<<<<<<< HEAD
    allow_origins=["http://localhost:5173"],
=======
    allow_origins=["*"],  # or your frontend URL like ["http://localhost:3000"]
>>>>>>> fe9b67f1059cdf64251513d271dd8c34a6d9c664
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
<<<<<<< HEAD

@app.get("/health")
def health():
    return {"status":"ok"}
=======
>>>>>>> fe9b67f1059cdf64251513d271dd8c34a6d9c664
