"""
Authentication service - Business logic for user registration and login.
Handles user creation, password hashing, token generation, and store creation.
"""

from sqlalchemy.orm import Session
from app.models.user import User
from app.models.store import Store
from app.auth.password import hash_password, verify_password
from app.auth.jwt_handler import create_access_token
from app.schemas.user_schema import RegisterRequest, LoginRequest, UserResponse
from fastapi import HTTPException, status
import re


class AuthService:
    """Service class for authentication operations."""
    
    @staticmethod
    def validate_email(email: str) -> bool:
        """
        Validate email format.
        
        Args:
            email: Email address to validate
            
        Returns:
            True if valid, False otherwise
        """
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        return re.match(pattern, email) is not None
    
    @staticmethod
    def generate_slug(email: str) -> str:
        """
        Generate a URL-friendly slug from email.
        Removes domain and special characters.
        
        Args:
            email: Email address
            
        Returns:
            Generated slug
        """
        base_slug = email.split('@')[0].lower()
        slug = re.sub(r'[^a-z0-9-]', '-', base_slug)
        slug = re.sub(r'-+', '-', slug).strip('-')
        return slug
    
    @staticmethod
    def email_exists(db: Session, email: str) -> bool:
        """
        Check if email already exists in database.
        
        Args:
            db: Database session
            email: Email to check
            
        Returns:
            True if email exists, False otherwise
        """
        user = db.query(User).filter(User.email == email).first()
        return user is not None
    
    @staticmethod
    def generate_unique_slug(db: Session, base_slug: str) -> str:
        """
        Generate a unique slug for store.
        Appends a number if base slug already exists.
        
        Args:
            db: Database session
            base_slug: Base slug to check
            
        Returns:
            Unique slug
        """
        slug = base_slug
        counter = 1
        
        while db.query(Store).filter(Store.slug == slug).first():
            slug = f"{base_slug}-{counter}"
            counter += 1
        
        return slug
    
    @staticmethod
    def register_user(db: Session, user_data: RegisterRequest) -> dict:
        """
        Register a new user and create their default store.
        
        Args:
            db: Database session
            user_data: User registration data
            
        Returns:
            Dictionary with success status, message, and tokens
            
        Raises:
            HTTPException: If email already exists or validation fails
        """
        # Check if email already exists
        if AuthService.email_exists(db, user_data.email):
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Email already registered"
            )
        
        # Hash password
        password_hash = hash_password(user_data.password)
        
        # Create new user
        new_user = User(
            email=user_data.email,
            password_hash=password_hash,
            full_name=user_data.full_name,
            is_active=True
        )
        
        db.add(new_user)
        db.flush()  # Flush to get the user ID without committing
        
        # Create default store
        base_slug = AuthService.generate_slug(user_data.email)
        unique_slug = AuthService.generate_unique_slug(db, base_slug)
        
        default_store = Store(
            user_id=new_user.id,
            store_name=f"{user_data.full_name}'s Store",
            slug=unique_slug
        )
        
        db.add(default_store)
        db.commit()
        db.refresh(new_user)
        
        # Generate JWT token
        access_token = create_access_token(
            data={"sub": str(new_user.id)}
        )
        
        return {
            "success": True,
            "message": "User registered successfully",
            "data": {
                "access_token": access_token,
                "token_type": "bearer",
                "user": UserResponse.from_orm(new_user)
            }
        }
    
    @staticmethod
    def login_user(db: Session, login_data: LoginRequest) -> dict:
        """
        Authenticate user and return JWT token.
        
        Args:
            db: Database session
            login_data: Login credentials
            
        Returns:
            Dictionary with success status, message, and tokens
            
        Raises:
            HTTPException: If credentials are invalid
        """
        # Find user by email
        user = db.query(User).filter(User.email == login_data.email).first()
        
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password"
            )
        
        # Verify password
        if not verify_password(login_data.password, user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password"
            )
        
        # Check if user is active
        if not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Account is inactive"
            )
        
        # Generate JWT token
        access_token = create_access_token(
            data={"sub": str(user.id)}
        )
        
        return {
            "success": True,
            "message": "Login successful",
            "data": {
                "access_token": access_token,
                "token_type": "bearer",
                "user": UserResponse.from_orm(user)
            }
        }
    
    @staticmethod
    def get_user_by_id(db: Session, user_id: str) -> User:
        """
        Get user by ID from database.
        
        Args:
            db: Database session
            user_id: User ID (UUID string)
            
        Returns:
            User object
            
        Raises:
            HTTPException: If user not found
        """
        import uuid
        
        try:
            user_uuid = uuid.UUID(user_id)
        except ValueError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid user ID format"
            )
        
        user = db.query(User).filter(User.id == user_uuid).first()
        
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        
        return user
