from fastapi import APIRouter, Request, Depends
from fastapi.responses import JSONResponse
from utils.jwt import verify_jwt_token
from utils.client import forward_request
import os
from dotenv import load_dotenv
from app.routes import auth

load_dotenv()

USER_SERVICE_URL = os.getenv("USER_SERVICE_URL", "http://localhost:8001/users")

router = APIRouter(tags=["User"], dependencies=[Depends(auth.get_current_user)])

@router.put("/me")
async def update_user(request: Request, token_data=Depends(verify_jwt_token)):
    user_id = token_data.get("sub")
    body = await request.json()
    response = await forward_request("PUT", f"{USER_SERVICE_URL}/update_user/{user_id}", headers=request.headers, json=body)
    return response.json()