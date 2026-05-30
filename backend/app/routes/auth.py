"""
Authentication routes - FastAPI endpoints for user registration, login, and profile.
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.auth.dependencies import get_current_user
from app.schemas.user_schema import (
    RegisterRequest,
    LoginRequest,
    UserResponse,
    AuthResponse,
    LoginResponse
)
from app.services.auth_service import AuthService

# Create router
router = APIRouter(
    prefix="/v1/auth",
    tags=["authentication"]
)


@router.post(
    "/register",
    response_model=AuthResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Register a new user"
)
async def register(
    user_data: RegisterRequest,
    db: Session = Depends(get_db)
):
    """
    Register a new user in the system.
    
    Creates:
    - User account with hashed password
    - Default store for the user
    - JWT access token
    
    Args:
        user_data: Registration form data
        db: Database session
        
    Returns:
        AuthResponse with access token and user data
        
    Raises:
        409: Email already registered
        422: Validation error
    """
    result = AuthService.register_user(db, user_data)
    return result


@router.post(
    "/login",
    response_model=LoginResponse,
    status_code=status.HTTP_200_OK,
    summary="Login user"
)
async def login(
    login_data: LoginRequest,
    db: Session = Depends(get_db)
):
    """
    Authenticate user and return JWT token.
    
    Args:
        login_data: Login credentials (email and password)
        db: Database session
        
    Returns:
        LoginResponse with access token and user data
        
    Raises:
        401: Invalid credentials
        403: Account inactive
    """
    result = AuthService.login_user(db, login_data)
    return result


@router.get(
    "/me",
    response_model=AuthResponse,
    status_code=status.HTTP_200_OK,
    summary="Get current user profile"
)
async def get_current_user_profile(
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get the profile of the currently authenticated user.
    Requires valid JWT token in Authorization header.
    
    Args:
        current_user: Current user from JWT token dependency
        db: Database session
        
    Returns:
        AuthResponse with user data
        
    Raises:
        401: Invalid or missing token
        404: User not found
    """
    user_id = current_user.get("user_id")
    user = AuthService.get_user_by_id(db, user_id)
    
    return {
        "success": True,
        "message": "User profile retrieved",
        "data": UserResponse.from_orm(user)
    }
