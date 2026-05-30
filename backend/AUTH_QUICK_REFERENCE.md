# Sellory Authentication System - Quick Reference

## Files Created

### 1. Database Models
- **`app/models/user.py`** - User account model
  - UUID primary key
  - Email (unique, indexed)
  - Password hash (bcrypt)
  - Full name
  - Active status
  - Timestamps
  - Relationship to Store

- **`app/models/store.py`** - Store model
  - UUID primary key
  - User ID (foreign key, one per user)
  - Store name
  - Unique slug (indexed)
  - Timestamps

### 2. Schemas (Pydantic Validation)
- **`app/schemas/user_schema.py`** - Request/response models
  - `RegisterRequest` - Registration form
  - `LoginRequest` - Login credentials
  - `UserResponse` - User data response
  - `AuthResponse` - Generic auth response
  - `TokenResponse` - Token + user data
  - `LoginResponse` - Login response

### 3. Services (Business Logic)
- **`app/services/auth_service.py`** - Core authentication logic
  - `register_user()` - Create user + store
  - `login_user()` - Authenticate user
  - `get_user_by_id()` - Retrieve user
  - Email validation
  - Slug generation and uniqueness
  - Email uniqueness validation

### 4. Routes (API Endpoints)
- **`app/routes/auth.py`** - Authentication endpoints
  - `POST /api/v1/auth/register` - Register new user
  - `POST /api/v1/auth/login` - Login user
  - `GET /api/v1/auth/me` - Get current user (protected)

### 5. Module Exports
- **Updated `app/models/__init__.py`** - Export User, Store
- **Updated `app/schemas/__init__.py`** - Export all schemas
- **Updated `app/services/__init__.py`** - Export AuthService
- **Updated `app/routes/__init__.py`** - Import auth router

### 6. Application Entry Point
- **Updated `app/main.py`** - Register auth router

### 7. Documentation
- **`AUTH_IMPLEMENTATION.md`** - Comprehensive guide

---

## Quick API Reference

### Register User
```bash
POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepass123",
  "full_name": "John Doe"
}

Response (201):
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "access_token": "eyJ...",
    "token_type": "bearer",
    "user": { id, email, full_name, is_active, created_at }
  }
}
```

### Login
```bash
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepass123"
}

Response (200):
{
  "success": true,
  "message": "Login successful",
  "data": {
    "access_token": "eyJ...",
    "token_type": "bearer",
    "user": { ... }
  }
}
```

### Get Profile
```bash
GET /api/v1/auth/me
Authorization: Bearer eyJ...

Response (200):
{
  "success": true,
  "message": "User profile retrieved",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "full_name": "John Doe",
    "is_active": true,
    "created_at": "2026-05-30T10:00:00"
  }
}
```

---

## Authentication Flow

### Registration Flow
```
Frontend
  ↓
POST /api/v1/auth/register
  ↓
AuthService.register_user()
  ├─ Check email uniqueness
  ├─ Hash password (bcrypt)
  ├─ Create User record
  ├─ Generate slug
  ├─ Create Store record
  └─ Commit transaction
  ↓
create_access_token()
  ├─ Encode user_id in JWT
  └─ Sign with JWT_SECRET
  ↓
Return Token + User (201)
```

### Login Flow
```
Frontend
  ↓
POST /api/v1/auth/login
  ↓
AuthService.login_user()
  ├─ Find user by email
  ├─ Verify password (bcrypt)
  ├─ Check is_active
  └─ Create JWT token
  ↓
Return Token + User (200)
```

### Protected Route Flow
```
Frontend (with token)
  ↓
GET /api/v1/auth/me (Authorization: Bearer token)
  ↓
get_current_user() dependency
  ├─ Extract token from header
  ├─ Decode JWT
  ├─ Extract user_id
  └─ Validate token
  ↓
Route handler receives user_id
  ↓
Return User Data (200)
```

---

## Database Relationship

```
┌─────────────────────────────┐
│         users table         │
├─────────────────────────────┤
│ id (UUID, PK)               │
│ email (VARCHAR, UNIQUE)     │
│ password_hash (VARCHAR)     │
│ full_name (VARCHAR)         │
│ is_active (BOOLEAN)         │
│ created_at (TIMESTAMP)      │
│ updated_at (TIMESTAMP)      │
└─────────────────────────────┘
         ▲       │
         │       │ 1-to-1
         │       ▼
┌─────────────────────────────┐
│        stores table         │
├─────────────────────────────┤
│ id (UUID, PK)               │
│ user_id (UUID, FK, UNIQUE)  │
│ store_name (VARCHAR)        │
│ slug (VARCHAR, UNIQUE)      │
│ created_at (TIMESTAMP)      │
│ updated_at (TIMESTAMP)      │
└─────────────────────────────┘

One user → One default store
Store deleted when user deleted (CASCADE)
```

---

## Password Security

### Hashing (Registration)
```
Plain: "securepass123"
          ↓
    bcrypt.hash()
          ↓
Hashed: "$2b$12$R9h7cIPz0gi.URNN3kh2OPST9EBhzVZ9..."
          ↓
    Store in database
```

### Verification (Login)
```
User Input: "securepass123"
Stored Hash: "$2b$12$R9h7cIPz0gi.URNN3kh2OPST9EBhzVZ9..."
          ↓
    bcrypt.verify()
          ↓
    Match? → True or False
```

---

## JWT Token Structure

```
Header.Payload.Signature

Header:
{
  "alg": "HS256",
  "typ": "JWT"
}

Payload:
{
  "sub": "550e8400-e29b-41d4-a716-446655440000",  // user_id
  "exp": 1234567890,  // expiration (now + 30 min)
  "iat": 1234567890   // issued at
}

Signature:
HMACSHA256(header + payload, JWT_SECRET)
```

---

## Protected Route Pattern

To create a protected route that requires authentication:

```python
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.auth.dependencies import get_current_user

router = APIRouter()

@router.get("/protected")
async def protected_endpoint(
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user_id = current_user["user_id"]
    # Use user_id to access user's data
    return {"message": f"Hello user {user_id}"}
```

---

## Scalability Features

✅ **Modular Architecture**
- Separation of routes, services, models
- Easy to add new modules

✅ **UUID Primary Keys**
- Distributed system friendly
- No ID conflicts across regions

✅ **Timestamps**
- Audit trails (created_at, updated_at)
- Easy to track data lifecycle

✅ **Dependency Injection**
- Testable code
- Reusable dependencies
- Auto cleanup

✅ **Service Layer**
- Business logic reusable across routes
- Easy to test
- Can call from other services

✅ **Pydantic Validation**
- Type safe
- Auto documentation
- Reject invalid data early

✅ **JWT Authentication**
- Stateless (scale horizontally)
- No session storage needed
- Works with multiple servers

✅ **One-to-One User-Store**
- Can extend to one-to-many for multi-store
- Clean relationship design

---

## Setup & Testing

### 1. Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 2. Configure .env
```
DATABASE_URL=postgresql://user:password@localhost:5432/sellory
JWT_SECRET=your-secure-secret-key-here
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
DEBUG=True
ENV=development
```

### 3. Create Database Tables
```bash
# Using Alembic (recommended)
alembic revision --autogenerate -m "Add users and stores"
alembic upgrade head

# Or use SQL directly (see AUTH_IMPLEMENTATION.md)
```

### 4. Run Server
```bash
python -m uvicorn app.main:app --reload
```

Server at: `http://localhost:8000`

### 5. Test Endpoints
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

### 6. API Testing (curl)
```bash
# Register
curl -X POST http://localhost:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "pass123456", "full_name": "Test User"}'

# Login
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "pass123456"}'

# Get Profile (replace TOKEN with actual token)
curl -X GET http://localhost:8000/api/v1/auth/me \
  -H "Authorization: Bearer TOKEN"
```

---

## Architecture Compliance

✅ Uses FastAPI
✅ Uses SQLAlchemy ORM
✅ Uses PostgreSQL (Supabase compatible)
✅ JWT authentication
✅ Bcrypt password hashing
✅ UUID primary keys
✅ Timestamps (created_at, updated_at)
✅ Modular structure
✅ Separation of concerns
✅ No duplicate auth systems
✅ Reuses existing foundation
✅ Scalable SaaS architecture

---

## What's Next

1. ✅ Authentication system complete
2. ⏭️ Products module (models, schemas, routes, services)
3. ⏭️ Orders module
4. ⏭️ Store customization endpoints
5. ⏭️ Refresh tokens
6. ⏭️ Role-based access control
7. ⏭️ Email verification
8. ⏭️ Password reset

---

## File Structure

```
backend/
├── app/
│   ├── models/
│   │   ├── __init__.py          ✅ Updated
│   │   ├── user.py              ✅ Created
│   │   └── store.py             ✅ Created
│   ├── routes/
│   │   ├── __init__.py          ✅ Updated
│   │   └── auth.py              ✅ Created
│   ├── schemas/
│   │   ├── __init__.py          ✅ Updated
│   │   └── user_schema.py       ✅ Created
│   ├── services/
│   │   ├── __init__.py          ✅ Updated
│   │   └── auth_service.py      ✅ Created
│   ├── auth/
│   │   ├── __init__.py          ✅ Existing
│   │   ├── jwt_handler.py       ✅ Existing
│   │   ├── password.py          ✅ Existing
│   │   └── dependencies.py      ✅ Existing
│   ├── main.py                  ✅ Updated
│   ├── config.py                ✅ Existing
│   ├── database.py              ✅ Existing
│   └── __init__.py              ✅ Existing
├── AUTH_IMPLEMENTATION.md       ✅ Created
└── SETUP.md                     ✅ Existing
```

---

## Support

See `AUTH_IMPLEMENTATION.md` for comprehensive documentation including:
- Detailed flow diagrams
- Database schema details
- Security best practices
- Common tasks
- Troubleshooting
