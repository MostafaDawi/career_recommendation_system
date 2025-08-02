from fastapi import FastAPI
from fastapi.concurrency import asynccontextmanager
from app.routers.jobs import router as jobs_router
from app.database import create_db_and_tables
from fastapi.middleware.cors import CORSMiddleware

@asynccontextmanager
async def lifespan(app: FastAPI):
    await create_db_and_tables()
    yield
    # Optionally add shutdown code here

app = FastAPI(lifespan=lifespan)

# Optional: Enable CORS (for frontend integration)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to your frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register the jobs router
app.include_router(jobs_router)

@app.get("/")
async def root():
    return {"message": "Welcome to the Job Data Service!"}
