from fastapi import APIRouter, Request, Depends
from fastapi.responses import JSONResponse
from utils.jwt import verify_jwt_token
from utils.client import forward_request
import os
from dotenv import load_dotenv
from app.routes import auth

load_dotenv()

RECOMMEND_SERVICE_URL = os.getenv("RECOMMEND_SERVICE_URL", "http://localhost:8002/recommendations")

router = APIRouter(tags=["Recommendations"])

@router.get("/me")
async def recommend(request: Request, token_data=Depends(verify_jwt_token)):
    response = await auth.get_current_user(request=request, token_data=token_data)
    user = response.get("data")

    request_kwargs = {
        "skills":", ".join(user['skills']),
        "description":user['description'],
        "interests":", ".join(user['interests']),
        "personality":", ".join(user['personality'].values())
    }

    response = await forward_request("POST", f"{RECOMMEND_SERVICE_URL}", headers=request.headers, json=request_kwargs)
    return response.json()