from fastapi import FastAPI
from app.routers.jobs import router as jobs_router
from app.database import engine, Base
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Optional: Enable CORS (for frontend integration)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to your frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register the jobs router
app.include_router(jobs_router, prefix="/jobs", tags=["jobs"])

# Run this on app startup to create tables (no-op if they already exist)
@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)

@app.get("/")
async def root():
    return {"message": "Welcome to the Job Data Service!"}
