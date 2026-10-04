from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

# ==============================================================================
# PROJECT SCHEMAS
# ==============================================================================
class ProjectBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=150)
    description: str = Field(..., min_length=1)
    technologies: List[str] = Field(default_factory=list)
    githubUrl: Optional[str] = Field(default="", alias="github_link")
    liveDemoUrl: Optional[str] = Field(default="", alias="live_link")
    image: Optional[str] = Field(default="", alias="image_url")

    class Config:
        populate_by_name = True

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    technologies: Optional[List[str]] = None
    githubUrl: Optional[str] = None
    liveDemoUrl: Optional[str] = None
    image: Optional[str] = None

class Project(ProjectBase):
    id: Optional[str] = Field(None, alias="_id")
    views: int = 0
    createdAt: Optional[datetime] = None
    updatedAt: Optional[datetime] = None

    class Config:
        populate_by_name = True

class ProjectResponse(Project):
    pass

# ==============================================================================
# CONTACT MESSAGE SCHEMAS
# ==============================================================================
class ContactMessageCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: str = Field(
        ...,
        pattern=r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$',
        description="Valid email address"
    )
    message: str = Field(..., min_length=5, max_length=2000)

class ContactMessage(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    name: str
    email: str
    message: str
    createdAt: Optional[datetime] = None
    read: bool = False

    class Config:
        populate_by_name = True

class ContactMessageResponse(BaseModel):
    status: str
    message: str
    id: Optional[str] = None

# ==============================================================================
# AUTHENTICATION SCHEMAS
# ==============================================================================
class UserLogin(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class TokenData(BaseModel):
    username: Optional[str] = None