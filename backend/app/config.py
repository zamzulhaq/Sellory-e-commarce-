"""
Configuration module for Sellory backend.
Uses Pydantic settings for environment variable management.
"""

from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    """
    Application settings loaded from environment variables.
    All sensitive data should be in .env file.
    """
    
    # Database Configuration
    database_url: str
    supabase_url: Optional[str] = None
    supabase_key: Optional[str] = None
    
    # JWT Configuration
    jwt_secret: str
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    
    # Server Configuration
    debug: bool = False
    env: str = "development"
    api_prefix: str = "/api"
    
    class Config:
        env_file = ".env"
        case_sensitive = False


# Global settings instance
settings = Settings()
