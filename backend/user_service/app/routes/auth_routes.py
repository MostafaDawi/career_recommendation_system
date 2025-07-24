from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.auth.core import token
from app.auth import utils
from app.auth.core import deps
from app import schemas, services, database, models

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/register", response_model=schemas.UserOut)
async def register(user: schemas.UserCreate, db: AsyncSession = Depends(database.get_db)):
    existing_user = await services.get_user_by_id_or_email(db=db, user_email=user.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="User Already Exists")
    db_user = await services.create_user(db, user)
    return db_user

@router.post("/login", response_model=schemas.Token)
async def login(credentials: schemas.UserLogin, db: AsyncSession = Depends(database.get_db)):
    user = await utils.authenticate_user(db, credentials.email, credentials.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    generated_token = token.create_access_token(data={"sub": str(user.id)})
    return {"access_token": generated_token, "token_type": "bearer"}

@router.get("/me", response_model=schemas.UserOut)
async def get_me(user: models.User = Depends(deps.get_current_user)):
    return user
