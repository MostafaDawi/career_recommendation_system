from pydantic import BaseModel, EmailStr
from typing import List, Optional
from uuid import UUID

# Request schema
class JobCreate(BaseModel):
    title: str
    description: str
    salary: Optional[int] = None
    location: Optional[str] = None
    tags: Optional[List[str]] = None
    jobType: Optional[str] = None
    companyName: Optional[str] = None
    contactEmail: Optional[EmailStr] = None

# Response schema
class JobOut(JobCreate):
    id: UUID

    model_config = {
        "from_attributes": True  # same as orm_mode=True in v1
    }

# Response schema
class JobOutEmbedded(JobOut):
    id: UUID
    embedding: Optional[List[float]]

    model_config = {
        "from_attributes": True  # same as orm_mode=True in v1
    }