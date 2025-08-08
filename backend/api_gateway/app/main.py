from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth, user, job, recommendation

app = FastAPI(title="API Gateway")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["*"] for development
    allow_credentials=True,
    allow_methods=["*"],  # or ["GET", "POST", "PUT", "DELETE"]
    allow_headers=["*"],  # or ["Authorization", "Content-Type"]
)

@app.get("/")
def service_running():
    return {"message":"Welcome to API Gateway"}

# Register microservice routes
app.include_router(auth.router, prefix="/auth")
app.include_router(user.router, prefix="/user")
app.include_router(recommendation.router, prefix="/recommend")
# app.include_router(job.router, prefix="/jobs")
