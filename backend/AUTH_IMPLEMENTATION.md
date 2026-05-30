# Sellory Authentication System Implementation Guide

## Overview

The Sellory authentication system is a production-ready implementation using:
- **FastAPI** for HTTP API
- **SQLAlchemy ORM** for database abstraction
- **PostgreSQL/Supabase** for data storage
- **JWT** for stateless authentication
- **bcrypt** for password hashing
- **Pydantic** for data validation

---

## Architecture & Components

### 1. Database Models

#### User Model (`app/models/user.py`)
Stores user account information with security considerations.

```
Table: users
├── id (UUID, Primary Key)
├── email (String, Unique, Indexed)
├── password_hash (String)
├── full_name (String)
├── is_active (Boolean)
├── created_at (DateTime)
├── updated_at (DateTime)
└── Relationship: store (1-to-1 with Store)
```

#### Store Model (`app/models/store.py`)
Automatically created for each user. Supports multi-store future expansion.

```
Table: stores
├── id (UUID, Primary Key)
├── user_id (UUID, Foreign Key → users.id)
├── store_name (String)
├── slug (String, Unique, Indexed)
├── created_at (DateTime)
├── updated_at (DateTime)
└── Relationship: owner (1-to-1 with User)
```

**Relationship Constraint:**
- 1 User → 1 Default Store (via unique constraint on user_id)
- Store deleted when User deleted (CASCADE)
- Store slug must be globally unique

### 2. Authentication Schemas (`app/schemas/user_schema.py`)

**RegisterRequest**
```json
{
  "email": "user@example.com",
  "password": "securepass123",
  "full_name": "John Doe"
}
```

**LoginRequest**
```json
{
  "email": "user@example.com",
  "password": "securepass123"
}
```

**UserResponse**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "full_name": "John Doe",
  "is_active": true,
  "created_at": "2026-05-30T10:00:00"
}
```

**LoginResponse**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "token_type": "bearer",
    "user": { ... UserResponse ... }
  }
}
```

### 3. Authentication Service (`app/services/auth_service.py`)

Core business logic for authentication operations.

#### Key Methods

**`register_user(db, user_data)`**
- Validates email uniqueness
- Hashes password with bcrypt
- Creates User record
- Creates default Store
- Generates JWT token

**`login_user(db, login_data)`**
- Finds user by email
- Verifies password
- Checks account active status
- Generates JWT token

**`get_user_by_id(db, user_id)`**
- Retrieves user by UUID
- Raises 404 if not found

**Helper Methods**
- `validate_email()` - Email format validation
- `generate_slug()` - URL-friendly slug from email
- `email_exists()` - Check email uniqueness
- `generate_unique_slug()` - Ensure slug uniqueness

### 4. Authentication Routes (`app/routes/auth.py`)

Three main endpoints (v1):

#### POST `/api/v1/auth/register`
Register new user and create default store.

**Request:**
```bash
curl -X POST http://localhost:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securepass123",
    "full_name": "John Doe"
  }'
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "token_type": "bearer",
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "email": "user@example.com",
      "full_name": "John Doe",
      "is_active": true,
      "created_at": "2026-05-30T10:00:00"
    }
  }
}
```

**Errors:**
- `409 Conflict` - Email already registered
- `422 Validation Error` - Invalid data

#### POST `/api/v1/auth/login`
Authenticate user and get JWT token.

**Request:**
```bash
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securepass123"
  }'
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "token_type": "bearer",
    "user": { ... }
  }
}
```

**Errors:**
- `401 Unauthorized` - Invalid credentials or inactive account
- `403 Forbidden` - Account is inactive

#### GET `/api/v1/auth/me`
Get current authenticated user profile (requires token).

**Request:**
```bash
curl -X GET http://localhost:8000/api/v1/auth/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response (200):**
```json
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

**Errors:**
- `401 Unauthorized` - Missing or invalid token
- `404 Not Found` - User not found

---

## Authentication Flow Diagrams

### Registration Flow

```
┌─────────────┐
│   Frontend  │
│  /register  │
└──────┬──────┘
       │ POST {email, password, full_name}
       ▼
┌─────────────────────────┐
│  POST /api/v1/auth/     │
│      register           │
└──────┬──────────────────┘
       │
       ▼
┌──────────────────────────────┐
│ AuthService.register_user()  │
│                              │
│ 1. Check email uniqueness    │◄──┐
│ 2. Hash password (bcrypt)    │   │
│ 3. Create User record        │   │ Database
│ 4. Create Store record       │   │
│ 5. Commit transaction        │   │
└──────┬───────────────────────┘   │
       │                           │
       ▼                           │
┌──────────────────────────────┐   │
│ create_access_token()        │   │
│ JWT encode with user_id      │   │
└──────┬───────────────────────┘   │
       │                           │
       ▼                        ───┘
┌──────────────────────────────┐
│  Return 201 + Token + User   │
└──────────────────────────────┘
```

### Login Flow

```
┌─────────────┐
│   Frontend  │
│   /login    │
└──────┬──────┘
       │ POST {email, password}
       ▼
┌──────────────────────┐
│  POST /api/v1/auth/  │
│       login          │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────────────┐
│ AuthService.login_user()     │
│                              │
│ 1. Query user by email       │◄──┐
│ 2. Verify password (bcrypt)  │   │
│ 3. Check is_active           │   │ Database
│ 4. Create JWT token          │   │
└──────┬───────────────────────┘   │
       │                           │
       ▼                        ───┘
┌──────────────────────────────┐
│  Return 200 + Token + User   │
└──────────────────────────────┘
```

### Get Profile Flow (/me)

```
┌─────────────┐
│   Frontend  │
│  GET /me    │
│  + Token    │
└──────┬──────┘
       │
       ▼
┌──────────────────────────┐
│  GET /api/v1/auth/me     │
│  Authorization: Bearer   │
└──────┬───────────────────┘
       │
       ▼
┌────────────────────────────────┐
│ get_current_user() dependency  │
│                                │
│ 1. Extract token from header   │
│ 2. verify_token() JWT decode   │
│ 3. Extract user_id from token  │
│ 4. Return {user_id, payload}   │
└──────┬───────────────────────┘
       │
       ▼
┌──────────────────────────────┐
│ AuthService.get_user_by_id() │
│ Query user from database     │◄──┐
└──────┬───────────────────────┘   │
       │                           │
       ▼                        ───┘ Database
┌──────────────────────────────┐
│  Return 200 + User Data      │
└──────────────────────────────┘
```

---

## JWT Authentication Flow

### Token Generation

```python
# During login/register
payload = {
    "sub": "550e8400-e29b-41d4-a716-446655440000",  # user_id
    "exp": 1234567890,  # expiration (30 min from now)
    "iat": 1234567890   # issued at
}

token = jwt.encode(
    payload,
    JWT_SECRET="your-secret-key",
    algorithm="HS256"
)
# Result: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Token Verification (on protected routes)

```python
# Request comes with Authorization header:
# Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Dependency decodes token
payload = jwt.decode(
    token,
    JWT_SECRET="your-secret-key",
    algorithms=["HS256"]
)

# If valid:
user_id = payload.get("sub")  # "550e8400-e29b-41d4-a716-446655440000"

# If invalid or expired:
# HTTPException 401 Unauthorized
```

---

## Password Hashing Flow

### Hashing (During Registration)

```python
plain_password = "securepass123"

# bcrypt generates random salt and hashes
hashed = bcrypt.hash(plain_password)
# Result: $2b$12$R9h7cIPz0gi.URNN3kh2OPST9EBhzVZ9...

# Store in database
user.password_hash = hashed
```

### Verification (During Login)

```python
plain_password = "securepass123"  # User input
stored_hash = "$2b$12$R9h7cIPz0gi.URNN3kh2OPST9EBhzVZ9..."  # From DB

# bcrypt verifies password against hash
is_valid = bcrypt.verify(plain_password, stored_hash)
# Result: True or False

if not is_valid:
    raise HTTPException(401, "Invalid credentials")
```

**Why bcrypt?**
- Random salt per password (no two hashes the same)
- Computationally expensive (slow brute-force attacks)
- Industry standard for password hashing

---

## Database Setup

### 1. Create Tables (Using Alembic)

```bash
# Initialize Alembic (if not already done)
alembic init .

# Create first migration
alembic revision --autogenerate -m "Add users and stores tables"

# Apply migration
alembic upgrade head
```

### 2. Verify Tables

```bash
# Connect to PostgreSQL
psql -U user -d sellory

# List tables
\dt

# Show users table
\d users

# Show stores table
\d stores
```

### 3. Manual Table Creation (Alternative)

If Alembic isn't set up:

```sql
-- Create users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE INDEX idx_users_email ON users(email);

-- Create stores table
CREATE TABLE stores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE,
    store_name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_stores_user_id ON stores(user_id);
CREATE INDEX idx_stores_slug ON stores(slug);
```

---

## Testing the Authentication System

### 1. Start Backend Server

```bash
cd backend

# Install dependencies (if not done)
pip install -r requirements.txt

# Run server with reload
python -m uvicorn app.main:app --reload

# Server should be at http://localhost:8000
```

### 2. Register a User

```bash
curl -X POST http://localhost:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securepass123",
    "full_name": "John Doe"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "token_type": "bearer",
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "email": "john@example.com",
      "full_name": "John Doe",
      "is_active": true,
      "created_at": "2026-05-30T10:00:00"
    }
  }
}
```

**Copy the `access_token` for next requests.**

### 3. Get Current User Profile

```bash
curl -X GET http://localhost:8000/api/v1/auth/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### 4. Login

```bash
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securepass123"
  }'
```

### 5. Using Swagger UI

Go to `http://localhost:8000/docs` for interactive API testing:

1. Click "Try it out" on any endpoint
2. Fill in required fields
3. Click "Execute"
4. See response and curl command

---

## Security Best Practices

### ✅ Implemented

- **No plain passwords**: Bcrypt hashing with random salts
- **JWT tokens**: Stateless, expiring tokens (30 min default)
- **Unique emails**: Database constraint prevents duplicates
- **Account status**: Users can be deactivated
- **HTTPException status codes**: Proper HTTP semantics
- **Type validation**: Pydantic schemas enforce data types
- **HTTPS ready**: FastAPI supports HTTPS in production

### ⚠️ Production Considerations

1. **Change JWT_SECRET**
   ```bash
   # Generate a secure secret
   python -c "import secrets; print(secrets.token_urlsafe(32))"
   ```
   Update `.env`:
   ```
   JWT_SECRET=your-generated-secret-here
   ```

2. **Restrict CORS**
   In `app/main.py`:
   ```python
   app.add_middleware(
       CORSMiddleware,
       allow_origins=["https://yourdomain.com"],  # Specific domains
       allow_credentials=True,
       allow_methods=["GET", "POST"],
       allow_headers=["*"],
   )
   ```

3. **Use HTTPS**
   - Enable SSL/TLS in production
   - Use environment-specific settings

4. **Token Expiration**
   - Default: 30 minutes
   - Consider shorter for sensitive operations
   - Implement refresh tokens for longer sessions

5. **Rate Limiting**
   Consider adding rate limiting for:
   - `/register` (prevent spam)
   - `/login` (prevent brute force)

6. **Input Validation**
   - Email format validated
   - Password minimum 8 characters
   - Full name 2-255 characters
   - Consider additional rules per business requirements

---

## Architecture Scalability

### 1. Separation of Concerns

```
Routes (HTTP Layer)
  ↓
Services (Business Logic)
  ↓
Models (Data Layer)
  ↓
Database
```

**Benefits:**
- Easy to test each layer independently
- Business logic reusable across endpoints
- Database changes don't affect routes
- Service methods can be called from other services

### 2. Modular Structure

```
app/
├── models/          # User, Store models
├── routes/          # API endpoints
├── schemas/         # Pydantic validation
├── services/        # Business logic
├── auth/            # JWT, password utilities
└── utils/           # Helper functions
```

**Benefits:**
- Clear organization
- Easy to add new modules (products, orders, etc.)
- No circular imports
- Team collaboration friendly

### 3. Database Relationships

```
users (1) ──────── (1) stores

One user has exactly one default store.
Can be extended to (1) ──── (many) for multi-store.
```

**Future Multi-Store Implementation:**
```python
class User(Base):
    stores = relationship("Store", back_populates="owner")  # (1) to (many)

class Store(Base):
    owner = relationship("User", back_populates="stores")
```

### 4. Service Reusability

Auth methods can be called from other services:

```python
# In order_service.py
from app.services.auth_service import AuthService

def get_user_orders(user_id: str, db: Session):
    user = AuthService.get_user_by_id(db, user_id)
    # Now you have validated user
    orders = db.query(Order).filter(Order.user_id == user.id).all()
    return orders
```

### 5. Dependency Injection

Protected routes use dependency injection:

```python
@app.get("/api/v1/profile")
async def get_profile(
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # current_user automatically extracted and validated
    # db automatically provided and cleaned up
    user = AuthService.get_user_by_id(db, current_user["user_id"])
    return user
```

**Benefits:**
- Testable (mock dependencies)
- Reusable (used in multiple routes)
- Clear dependencies
- Automatic cleanup (db connection closed)

---

## Common Tasks

### Creating Protected Routes

```python
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.auth.dependencies import get_current_user

router = APIRouter()

@router.get("/api/v1/protected")
async def protected_route(
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user_id = current_user["user_id"]
    # Access database and return data
    return {"user_id": user_id}
```

### Getting User's Store

```python
from app.models import Store

# In a service method
def get_user_store(db: Session, user_id: str):
    store = db.query(Store).filter(Store.user_id == user_id).first()
    if not store:
        raise HTTPException(404, "Store not found")
    return store
```

### Checking User Permissions

```python
# In a service method
def has_access_to_store(db: Session, user_id: str, store_id: str) -> bool:
    store = db.query(Store).filter(
        Store.id == store_id,
        Store.user_id == user_id
    ).first()
    return store is not None
```

---

## Summary

**Implemented:**
✅ User registration with email validation
✅ Password hashing with bcrypt
✅ JWT token generation and validation
✅ User login with credentials verification
✅ Get user profile (protected route)
✅ Automatic default store creation
✅ User-store one-to-one relationship
✅ UUID primary keys with timestamps
✅ Pydantic data validation
✅ Proper HTTP status codes
✅ Modular architecture

**Next Steps:**
1. Set up database migrations with Alembic
2. Create products routes and models
3. Create orders routes and models
4. Add refresh token functionality
5. Implement role-based access control (RBAC)
6. Add email verification
7. Add password reset functionality
