# Step 1: Define the incoming user request model
from pydantic import BaseModel

class UserProfile(BaseModel):
    skills: str
    interests: str
    personality: str
    description: str

# Step 2: Recommendation response model
class JobMatch(BaseModel):
    job_title: str
    similarity_score: float