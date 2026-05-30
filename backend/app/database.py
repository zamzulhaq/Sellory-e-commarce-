"""
Database configuration and session management.
Handles SQLAlchemy setup for PostgreSQL/Supabase.
"""

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy.pool import NullPool
from app.config import settings

# Database engine setup
engine = create_engine(
    settings.database_url,
    echo=settings.debug,
    poolclass=NullPool,  # Recommended for serverless/supabase
    connect_args={"connect_timeout": 10}
)

# Session factory
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# Base class for all models
Base = declarative_base()


def get_db():
    """
    Dependency function to get database session.
    Yields session for a request and ensures cleanup.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
