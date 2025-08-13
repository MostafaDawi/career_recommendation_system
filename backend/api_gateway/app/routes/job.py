from json import JSONDecodeError
import json
from fastapi import APIRouter, Request, Depends
from fastapi.responses import JSONResponse
from utils.jwt import verify_jwt_token
from utils.client import forward_request
import os
from dotenv import load_dotenv
from app.routes import auth

load_dotenv()

JOB_SERVICE_URL = os.getenv("JOB_SERVICE_URL", "http://localhost:8004/jobs")

router = APIRouter(tags=["Jobs"])

@router.get("/available_jobs")
async def get_jobs(request: Request):
    try:
        response = await forward_request("GET", f"{JOB_SERVICE_URL}/", headers=request.headers)
        print("The response is: ", response.json())
        return JSONResponse({"data":response.json()}, status_code=200)
    except JSONDecodeError as e:
        print("Response Error: ", response.text)
        return JSONResponse({"error": e.msg}, status_code=response.status_code)
    
@router.post("/create")
async def get_jobs(request: Request,token_data=Depends(verify_jwt_token)):
    response = await auth.get_current_user(request=request, token_data=token_data)
    user = json.loads(response.body.decode())

    if user is not None:
        try:
            response = await forward_request("POST", f"{JOB_SERVICE_URL}/create_job", headers=request.headers, json= await request.json())
            print("The response is: ", response.json())
            return JSONResponse({"data":response.json()}, status_code=201)
        except JSONDecodeError as e:
            print("Response Error: ", response.text)
            return JSONResponse({"error": e.msg}, status_code=response.status_code)
        
    return JSONResponse({"error":"Please sign in first to be able to add a job"}, status_code=401)