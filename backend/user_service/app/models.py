from app import database
from sqlalchemy import ARRAY, Column, Integer, Text, String
from sqlalchemy.dialects.postgresql import JSONB

class User(database.Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(120), unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    skills = Column(ARRAY(String), nullable=True)
    interests = Column(ARRAY(String), nullable=True)
    personality = Column(JSONB, nullable=True)