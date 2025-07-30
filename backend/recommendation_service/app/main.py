from fastapi import FastAPI, HTTPException
from app.schemas import UserProfile
from app.services import get_recommendations

app = FastAPI()

@app.post("/recommendations")
async def recommendations(user: UserProfile):
    return await get_recommendations(user=user)
