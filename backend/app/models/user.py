"""
User model - SQLAlchemy ORM model for users.
Represents a user in the Sellory system.
"""

from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from datetime import datetime
from app.database import Base


class User(Base):
    """
    User model for Sellory authentication and account management.
    
    Attributes:
        id: Unique user identifier (UUID)
        email: User's email address (unique)
        password_hash: Hashed password (bcrypt)
        full_name: User's full name
        is_active: Whether the account is active
        created_at: Account creation timestamp
        updated_at: Last update timestamp
        store: Relationship to user's store
    """
    
    __tablename__ = "users"
    
    # Primary key and identifiers
    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        nullable=False
    )
    
    # User information
    email = Column(
        String(255),
        unique=True,
        nullable=False,
        index=True  # Index for faster email lookups
    )
    password_hash = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=False)
    
    # Status
    is_active = Column(Boolean, default=True, nullable=False)
    
    # Timestamps
    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )
    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False
    )
    
    # Relationships
    store = relationship("Store", back_populates="owner", uselist=False)
    
    def __repr__(self) -> str:
        return f"<User(id={self.id}, email={self.email})>"
