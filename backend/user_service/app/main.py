from fastapi import FastAPI

app = FastAPI()

@app.get("/users")
async def home():
    return "Hello from User Service"