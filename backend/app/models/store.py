"""
Store model - SQLAlchemy ORM model for stores.
Represents a store owned by a user in the Sellory system.
"""

from sqlalchemy import Column, String, DateTime, ForeignKey, UniqueConstraint
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from datetime import datetime
from app.database import Base


class Store(Base):
    """
    Store model for managing user stores in Sellory.
    Each user gets a default store automatically upon registration.
    
    Attributes:
        id: Unique store identifier (UUID)
        user_id: Foreign key to user
        store_name: Name of the store
        slug: URL-friendly store identifier (unique)
        created_at: Store creation timestamp
        updated_at: Last update timestamp
        owner: Relationship to the store owner (User)
    """
    
    __tablename__ = "stores"
    
    # Primary key and identifiers
    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        nullable=False
    )
    
    # Foreign key to user
    user_id = Column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )
    
    # Store information
    store_name = Column(String(255), nullable=False)
    slug = Column(
        String(255),
        unique=True,
        nullable=False,
        index=True  # Index for URL lookups
    )
    
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
    owner = relationship("User", back_populates="store")
    
    # Constraints
    __table_args__ = (
        UniqueConstraint("user_id", name="one_store_per_user"),
    )
    
    def __repr__(self) -> str:
        return f"<Store(id={self.id}, slug={self.slug}, user_id={self.user_id})>"
