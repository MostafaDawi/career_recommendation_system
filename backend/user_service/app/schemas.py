from typing import List, Optional
from pydantic import BaseModel, EmailStr

class UserBase(BaseModel):
    name: str
    email: EmailStr
    password: str
    description: Optional[str] = None
    skills: Optional[List[str]] = []
    interests: Optional[List[str]] = []
    personality: Optional[dict] = None

class UserCreate(UserBase):
    pass

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    password: Optional[str] = None
    description: Optional[str] = None
    skills: Optional[List[str]] = None
    interests: Optional[List[str]] = None
    personality: Optional[dict] = None

class UserOut(UserBase):
    id: int

    model_config = {
        "from_attributes": True
    }

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    id: Optional[int] = None

