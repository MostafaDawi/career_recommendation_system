from fastapi import FastAPI
from fastapi.concurrency import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
from app.database import create_db_and_tables
from app.routes import user_routes, auth_routes

@asynccontextmanager
async def lifespan(app: FastAPI):
    await create_db_and_tables()
    yield
    # Optionally add shutdown code here

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["*"] for development
    allow_credentials=True,
    allow_methods=["*"],  # or ["GET", "POST", "PUT", "DELETE"]
    allow_headers=["*"],  # or ["Authorization", "Content-Type"]
)

app.include_router(auth_routes.router)
app.include_router(user_routes.router)

@app.get("/")
async def root():
    return {"message": "Welcome to the User Service!"}