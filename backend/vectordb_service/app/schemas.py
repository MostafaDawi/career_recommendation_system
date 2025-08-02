from pydantic import BaseModel
from typing import List, Optional

class JobPosting(BaseModel):
    id: int
    text: str
    job_title: str
    company: str
    location: str
    description: str
    post_date: Optional[str]
    work_type: Optional[str] = "unknown"

# New schema
class JobPosting_v2(BaseModel):
    id: str
    title: str
    description: str
    salary: Optional[int] = None
    location: Optional[str] = None
    tags: Optional[List[str]] = None
    embedding: List[float]

class SearchRequest(BaseModel):
    vector: List[float]
    top_k: int = 3

class SearchResult(BaseModel):
    job_title: str
    company: str
    location: str
    score: float

class SearchUser(BaseModel):
    interests: str
    skills: str
    personality: str
    description:str
