from fastapi import APIRouter, Request, Depends
from fastapi.responses import JSONResponse
from utils.jwt import verify_jwt_token
from utils.client import forward_request
import os

USER_SERVICE_URL = os.getenv("USER_SERVICE_URL", "http://localhost:8001")

router = APIRouter()

@router.get("/me")
async def get_current_user(request: Request, token_data=Depends(verify_jwt_token)):
    url = f"{USER_SERVICE_URL}/auth/me"
    response = await forward_request("GET", url, headers=request.headers)
    data = response.json()
    return JSONResponse(content=data, status_code=response.status_code)
