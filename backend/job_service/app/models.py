import uuid
from sqlalchemy import Column, String, Integer, ARRAY, DateTime, func
from sqlalchemy.dialects.postgresql import UUID
from app.database import Base

class Job(Base):
    __tablename__ = "jobs"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    title = Column(String, nullable=False, index=True)
    description = Column(String, nullable=False)
    salary = Column(Integer)
    location = Column(String)
    tags = Column(ARRAY(String))
    created_at = Column(DateTime(timezone=True), server_default=func.now())