from fastapi import APIRouter, HTTPException, Request, Depends
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
    try:
        response = await forward_request("PUT", f"{USER_SERVICE_URL}/update_user/{user_id}", headers=request.headers, json=body)
        if(response.is_error):
            raise HTTPException(status_code=response.status_code, detail=response.text)
    except Exception as e:
        print(f"[Caught an ERROR]: {e.detail}")
        raise HTTPException(status_code=response.status_code, detail=response.text)
    return JSONResponse({"data":response.json()}, status_code=response.status_code)

@router.put("/change_password")
async def update_password(request: Request, token_data=Depends(verify_jwt_token)):
    user_id = token_data.get("sub")
    body = await request.json()
    try:
        response = await forward_request("PUT", f"{USER_SERVICE_URL}/change_pass/{user_id}", headers=request.headers, json=body)
        if(response.is_error):
            raise HTTPException(status_code=response.status_code, detail=response.text)
    
    except Exception as e:
        print(f"[Caught an ERROR]: {e.detail}")
        raise HTTPException(status_code=response.status_code, detail=response.text)
    return JSONResponse({"data": response.json()}, status_code=response.status_code)