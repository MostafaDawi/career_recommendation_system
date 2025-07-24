from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app import models, schemas
from pydantic import EmailStr
from app.auth import utils

# Create a new user
async def create_user(db: AsyncSession, req: schemas.UserCreate):
    db_user = models.User(**req.model_dump())

    db_user.password = utils.hash_password(db_user.password)

    db.add(db_user)
    await db.commit()
    await db.refresh(db_user)
    return db_user

# Get a user by their ID
async def get_user_by_id_or_email(db: AsyncSession, user_id: int = None, user_email: EmailStr = None):
    if user_email is None:
        result = await db.execute(select(models.User).where(models.User.id == user_id))
    else:
        result = await db.execute(select(models.User).where(models.User.email == user_email))
    return result.scalar_one_or_none()

# Get all users
async def get_all_users(db: AsyncSession):
    result = await db.execute(select(models.User))
    return result.scalars().all()

# Delete a user by their ID
async def delete_user(db: AsyncSession, user_id):
    result = await db.execute(select(models.User).where(models.User.id == user_id))
    user = result.scalar_one_or_none()
    if user:
        db.delete(user)
        db.commit()
    return user
    
 # Update user's information   
async def update_user(db:AsyncSession, user_id: int, req: schemas.UserUpdate):
    result = await db.execute(select(models.User).where(models.User.id == user_id))
    user = result.scalar_one_or_none()

    if user:
        updates = req.model_dump(exclude_unset=True)

        if "password" in updates:
            updates["password"] = utils.hash_password(updates["password"])

        for key, value in updates.items():
            setattr(user, key, value)

        await db.commit()
        await db.refresh(user)
    return user

