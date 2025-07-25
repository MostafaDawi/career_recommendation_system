from pydantic import BaseModel

class userInputData(BaseModel):
    interests: str
    skills: str
    personality: str
    description:str
class JobInputData(BaseModel):
    title: str
    description: str