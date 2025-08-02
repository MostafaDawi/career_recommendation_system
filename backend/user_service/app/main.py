from fastapi import FastAPI
from fastapi.concurrency import asynccontextmanager
from app.database import create_db_and_tables
from app.routes import user_routes, auth_routes

@asynccontextmanager
async def lifespan(app: FastAPI):
    await create_db_and_tables()
    yield
    # Optionally add shutdown code here

app = FastAPI(lifespan=lifespan)

app.include_router(auth_routes.router)
app.include_router(user_routes.router)

@app.get("/")
async def root():
    return {"message": "Welcome to the User Service!"}