from fastapi import APIRouter, Request
from utils.client import forward_request
import os
from dotenv import load_dotenv

load_dotenv()

CHATBOT_SERVICE_URL = os.getenv("CHATBOT_SERVICE_URL", "http://0.0.0.0:8006")

router = APIRouter(tags=["Chatbot"])

@router.post("/")
async def send_message_to_chatbot(request: Request):
    body = await request.json()
    response = await forward_request("POST", f"{CHATBOT_SERVICE_URL}/faq", headers=request.headers, json=body)
    return response.json()

@router.get("/")
async def service_health():
    return {"message":"Welcome to chatbot service"}