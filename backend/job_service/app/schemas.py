from pydantic import BaseModel
from typing import List
from uuid import UUID

# Request schema
class JobCreate(BaseModel):
    title: str
    description: str
    salary: int
    location: str
    tags: List[str]

# Response schema
class JobOut(JobCreate):
    id: UUID

    model_config = {
        "from_attributes": True  # same as orm_mode=True in v1
    }