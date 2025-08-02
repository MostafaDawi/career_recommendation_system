from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

load_dotenv()

engine = create_async_engine(os.getenv("DATABASE_URL"))

AsyncSessionLocal = sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)

Base = declarative_base()

# This function is used in app startup to create tables
async def create_db_and_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

# Dependancy
async def get_db():
    db = AsyncSessionLocal()
    try:
        yield db
    finally:
        db.close()

