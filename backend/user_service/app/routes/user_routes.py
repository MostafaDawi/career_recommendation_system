from fastapi import APIRouter, HTTPException, Depends, Body
from app import services, database, schemas
from app.auth.core import deps
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter(prefix="/users", tags=["User"], dependencies=[Depends(deps.get_current_user)])

@router.get("/", response_model=List[schemas.UserOut])
async def get_users(db: AsyncSession = Depends(database.get_db)):
    return await services.get_all_users(db=db)

@router.get("/{user_id}", response_model=schemas.UserOut)
async def get_user(user_id: int, db: AsyncSession = Depends(database.get_db)):
    user = await services.get_user_by_id_or_email(db=db, user_id=user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User Not Found")
    return user

@router.put("/update_user/{user_id}", response_model=schemas.UserOut)
async def update_user(user_id:int, user: schemas.UserUpdate = Body(default=None), db: AsyncSession = Depends(database.get_db)):

    if not user:
        raise HTTPException(status_code=400, detail="No Data Provided")

    existing_user = await services.get_user_by_id_or_email(db=db, user_id=user_id)
    if not existing_user:
        raise HTTPException(status_code=400, detail="User Doesn't Exist")
    return await services.update_user(db=db, req=user, user_id=user_id)

@router.delete("/{user_id}")
async def delete_user(user_id: int, db: AsyncSession = Depends(database.get_db)):
    user = await services.get_user_by_id_or_email(db=db, user_email=user.email)
    if user:
        raise HTTPException(status_code=400, detail="User Doesn't Exist")
    return await services.delete_user(db=db, user_id=user_id)