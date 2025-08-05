from fastapi import APIRouter, Request, Depends
from fastapi.responses import JSONResponse
from utils.jwt import verify_jwt_token
from utils.client import forward_request
import os

router = APIRouter(tags=["Auth"])

AUTH_SERVICE_URL = os.getenv("USER_SERVICE_URL", "http://localhost:8001/auth")

@router.post("/login")
async def login_user(request: Request):
    body = await request.json()
    url = f"{AUTH_SERVICE_URL}/login"
    response = await forward_request("POST", url, json=body)
    data = response.json()
    return {"data":data, "status_code":response.status_code}


@router.post("/register")
async def register_user(request: Request):
    body = await request.json()
    url = f"{AUTH_SERVICE_URL}/register"
    response = await forward_request("POST", url, json=body)
    data = response.json()
    return {"data":data, "status_code":response.status_code}

@router.get("/me")
async def get_current_user(request: Request, token_data=Depends(verify_jwt_token)):
    url = f"{AUTH_SERVICE_URL}/me"
    response = await forward_request("GET", url, headers=request.headers)
    data = response.json()
    return {"data":data, "status_code":response.status_code}
