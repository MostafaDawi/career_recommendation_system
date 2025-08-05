from fastapi import FastAPI
from app.routes import auth, user, job, recommendation

app = FastAPI(title="API Gateway")

@app.get("/")
def service_running():
    return {"message":"Welcome to API Gateway"}

# Register microservice routes
# app.include_router(auth.router, prefix="/auth")
app.include_router(user.router, prefix="/user")
# app.include_router(job.router, prefix="/jobs")
# app.include_router(recommendation.router, prefix="/recommendation")
