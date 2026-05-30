"""
User and authentication schemas - Pydantic models for request/response validation.
"""

from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime
import uuid


class UserBase(BaseModel):
    """Base user schema with common fields."""
    email: EmailStr = Field(..., description="User's email address")
    full_name: str = Field(..., min_length=2, max_length=255, description="User's full name")


class RegisterRequest(UserBase):
    """Schema for user registration requests."""
    password: str = Field(
        ...,
        min_length=8,
        max_length=255,
        description="Password (minimum 8 characters)"
    )


class LoginRequest(BaseModel):
    """Schema for login requests."""
    email: EmailStr = Field(..., description="User's email address")
    password: str = Field(..., description="User's password")


class UserResponse(BaseModel):
    """Schema for user response data."""
    id: uuid.UUID
    email: str
    full_name: str
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True


class AuthResponse(BaseModel):
    """Schema for authentication responses."""
    success: bool
    message: str
    data: dict = Field(default_factory=dict)


class TokenResponse(BaseModel):
    """Schema for token responses."""
    access_token: str
    token_type: str = "bearer"
    user: UserResponse


class LoginResponse(BaseModel):
    """Schema for login responses."""
    success: bool
    message: str
    data: TokenResponse
