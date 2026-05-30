# Sellory Backend Setup Guide

## Prerequisites
- Python 3.8+
- PostgreSQL or Supabase PostgreSQL account
- pip package manager

## Installation

### 1. Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 2. Configure Environment
Create or update `.env` file with your database and JWT settings:
```
DATABASE_URL=postgresql://user:password@localhost:5432/sellory
JWT_SECRET=your-secure-secret-key
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
DEBUG=True
ENV=development
```

### 3. Initialize Database (Optional - Alembic)
```bash
alembic init .
alembic revision --autogenerate -m "Initial migration"
alembic upgrade head
```

## Running the Backend

### Development Server
```bash
cd backend
python -m uvicorn app.main:app --reload
```

Or:
```bash
python app/main.py
```

Server will start at: `http://localhost:8000`

### Access API Documentation
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

### Health Check
```bash
curl http://localhost:8000/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "Sellory backend running",
  "environment": "development"
}
```

## Architecture Overview

### Directory Structure
```
backend/
├── app/
│   ├── main.py           # FastAPI application
│   ├── config.py         # Settings management
│   ├── database.py       # SQLAlchemy setup
│   ├── models/           # ORM models (User, Store, Product, Order)
│   ├── routes/           # API endpoints
│   ├── schemas/          # Pydantic validation schemas
│   ├── services/         # Business logic
│   ├── auth/             # JWT & password handling
│   └── utils/            # Helper functions
├── alembic/              # Database migrations
├── requirements.txt      # Python dependencies
├── .env                  # Environment variables
└── .gitignore           # Git ignore rules
```

### Data Flow
```
Frontend Request
    ↓
FastAPI Routes (/api/*)
    ↓
Service Layer (Business Logic)
    ↓
SQLAlchemy ORM Models
    ↓
PostgreSQL / Supabase Database
```

## Key Components

### 1. **Config Module** (`app/config.py`)
- Pydantic Settings for environment variable management
- Loads from `.env` file
- Settings validation and type checking

### 2. **Database** (`app/database.py`)
- SQLAlchemy engine and session factory
- PostgreSQL connection configuration
- Supabase compatibility
- Dependency injection for database sessions

### 3. **Authentication** (`app/auth/`)
- **jwt_handler.py**: Token creation and verification
- **password.py**: Bcrypt password hashing and validation
- **dependencies.py**: FastAPI dependency for protected routes

### 4. **Main App** (`app/main.py`)
- FastAPI application initialization
- CORS middleware configuration
- Health check endpoint
- Ready for route registration

## Future Integration - Authentication Routes

When implementing auth routes, use:

```python
from fastapi import APIRouter, Depends, HTTPException, status
from app.auth import get_current_user, hash_password, create_access_token

router = APIRouter()

@router.post("/register")
async def register(credentials: UserSchema, db = Depends(get_db)):
    # Hash password
    hashed = hash_password(credentials.password)
    # Save user to database
    # Return success message

@router.post("/login")
async def login(credentials: UserSchema, db = Depends(get_db)):
    # Find user
    # Verify password
    user = authenticate_user(db, credentials.email, credentials.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Create token
    access_token = create_access_token(data={"sub": str(user.id)})
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me")
async def get_current_user_info(current_user = Depends(get_current_user)):
    return current_user
```

## Database Models - UUID + Timestamps

All models follow this pattern:
```python
from sqlalchemy import Column, String, DateTime
from sqlalchemy.dialects.postgresql import UUID
import uuid
from datetime import datetime
from app.database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    email = Column(String, unique=True)
    password_hash = Column(String)
```

## Environment Variables Reference

| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| DATABASE_URL | str | - | PostgreSQL connection URL |
| SUPABASE_URL | str | None | Supabase project URL (optional) |
| SUPABASE_KEY | str | None | Supabase API key (optional) |
| JWT_SECRET | str | - | Secret key for JWT signing |
| JWT_ALGORITHM | str | HS256 | JWT algorithm |
| ACCESS_TOKEN_EXPIRE_MINUTES | int | 30 | Token expiration time |
| DEBUG | bool | False | Debug mode |
| ENV | str | development | Environment name |

## Production Considerations

1. **CORS**: Update `allow_origins` from `["*"]` to specific domains
2. **JWT_SECRET**: Use a strong, randomly generated secret
3. **DEBUG**: Set to `False` in production
4. **Database**: Use connection pooling for production databases
5. **Error Handling**: Implement comprehensive error handlers
6. **Logging**: Add structured logging
7. **Rate Limiting**: Consider adding rate limiting
8. **HTTPS**: Always use HTTPS in production

## Scalability Features

### Designed for SaaS:
- ✅ Multi-store/multi-tenant ready
- ✅ UUID primary keys (distributed systems friendly)
- ✅ Timestamp tracking (created_at, updated_at)
- ✅ Modular services architecture
- ✅ Dependency injection for testability
- ✅ Alembic for version-controlled migrations
- ✅ Pydantic for data validation
- ✅ JWT for stateless authentication

### Extensibility:
Future modules can be added:
- `/ai/` - AI features
- `/payments/` - Payment processing
- `/notifications/` - Email/SMS notifications
- `/analytics/` - Business analytics
- `/whatsapp/` - WhatsApp integration
- `/themes/` - Store theming
- `/automation/` - Workflow automation

## Troubleshooting

### Connection Issues
```bash
# Test PostgreSQL connection
psql -U user -d sellory -h localhost
```

### Port Already in Use
```bash
# Change port in main.py or use:
python -m uvicorn app.main:app --port 8001
```

### Import Errors
```bash
# Verify package installation
pip install -e .
```

## Support & Documentation

See the docs/ folder for:
- `AI_AGENT_GUIDE.md` - Architecture guidelines
- `FILE_STRUCTURE.md` - Project structure
- `DATABASE_STRUCTURE.md` - Database schema (when created)
