from fastapi import FastAPI
from fastapi.concurrency import asynccontextmanager
from app.database import engine, Base, create_db_and_tables
from app.routes import router as user_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    await create_db_and_tables()
    yield
    # Optionally add shutdown code here

app = FastAPI(lifespan=lifespan)

app.include_router(user_router)