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

class SearchRequest(BaseModel):
    vector: List[float]
    top_k: int = 3

class SearchResult(BaseModel):
    job_title: str
    company: str
    location: str
    score: float