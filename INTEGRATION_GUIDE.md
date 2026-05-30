# 🚀 SELLORY FRONTEND + BACKEND INTEGRATION - QUICK START

## 📋 Pre-requisites

✅ Backend FastAPI running (port 8000)
✅ PostgreSQL/Supabase connected
✅ Frontend files ready (HTML/JS)

---

## 🎯 Quick Start - 5 Steps

### Step 1: Start Backend Server
```bash
cd backend
python -m uvicorn app.main:app --reload
```

**Output:**
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete
```

### Step 2: Verify Backend is Running
```bash
# Terminal baru, test health endpoint
curl http://127.0.0.1:8000/api/health

# Response:
# {"success": true, "message": "Sellory backend running"}
```

### Step 3: Open Frontend in Browser
```
http://localhost/index.html
```
atau
```
file:///c:/Users/arisb/Documents/template%20ecommarce/BATIK/index.html
```

### Step 4: Test Register Flow
1. Click **"Mulai Gratis"** button
2. Fill in: Name, Email, Password
3. Click **"Daftar Sekarang"**
4. Should see dashboard with welcome message

### Step 5: Test Login Flow
1. Logout dari dashboard
2. Click **"Masuk"**
3. Enter email & password
4. Click **"Masuk"**
5. Should see dashboard

---

## 🔍 Troubleshooting

### Issue 1: Backend Connection Error
**Error:** `Failed to fetch` / `Network error`

**Solution:**
- ✅ Check backend running: `http://127.0.0.1:8000/docs`
- ✅ Check API_BASE_URL di `assets/js/auth.js`
- ✅ Browser console untuk error messages

### Issue 2: CORS Error
**Error:** `Access to XMLHttpRequest blocked by CORS`

**Backend sudah configure CORS, pastikan:**
- FastAPI app punya CORS middleware
- allow_origins include `*` atau frontend URL

### Issue 3: Token Not Saving
**Problem:** Login works tapi token tidak tersimpan

**Debug:**
```javascript
// Di browser console
localStorage.getItem('sellory_auth_token')
// Harus return token string, bukan null
```

### Issue 4: Auto Logout
**Problem:** Dashboard meminta login terus

**Possible causes:**
- Token expired (30 min)
- Backend JWT_SECRET berbeda saat sign
- User tidak ada di database

**Fix:**
- Login ulang
- Check backend logs
- Verify database user exists

---

## 📊 Testing Flows

### ✅ Test 1: Full Register Flow
```
Landing page
  ↓ Click "Mulai Gratis"
  ↓ 
Register page
  ↓ Fill form
  ↓
Submit
  ↓
Check browser console:
  → POST /api/v1/auth/register
  → Status 201
  → Response contains access_token
  ↓
Check localStorage:
  → sellory_auth_token = "eyJ..."
  → sellory_user = {...}
  ↓
Redirect to dashboard
  ↓
Dashboard shows user info
```

### ✅ Test 2: Full Login Flow
```
Landing page
  ↓ Click "Masuk"
  ↓
Login page
  ↓ Fill email & password
  ↓
Submit
  ↓
Check browser console:
  → POST /api/v1/auth/login
  → Status 200
  ↓
Redirect to dashboard
  ↓
Dashboard shows user info
```

### ✅ Test 3: Protected Dashboard
```
Direct URL: /pages/dashboard/
  ↓
Without token in localStorage
  ↓
Should redirect to login
  ↓
After login, can access dashboard
```

### ✅ Test 4: Logout
```
Dashboard
  ↓ Click "Logout"
  ↓
Confirm dialog
  ↓
Check localStorage:
  → sellory_auth_token = null
  → sellory_user = null
  ↓
Redirect to landing page
```

### ✅ Test 5: Token in API Call
```
Dashboard loads
  ↓
GET /api/v1/auth/me
  ↓
Headers include:
  Authorization: Bearer eyJ...
  ↓
Backend verifies token
  ↓
Returns user data
```

---

## 🔧 Development Tips

### 1. View API Requests
**Browser DevTools → Network tab**
```
Filter: Fetch/XHR
Look for: auth/register, auth/login, auth/me
Check Request Headers: Authorization: Bearer token
Check Response: Status code, body
```

### 2. Check localStorage
**Browser Console:**
```javascript
// View all stored data
console.table(localStorage);

// View specific token
console.log(localStorage.getItem('sellory_auth_token'));

// View user data
console.log(JSON.parse(localStorage.getItem('sellory_user')));

// Clear all (logout simulation)
localStorage.clear();
```

### 3. Test API Directly (cURL)
```bash
# Register
curl -X POST http://127.0.0.1:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "full_name": "Test User"
  }'

# Login
curl -X POST http://127.0.0.1:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'

# Get Profile (with token)
curl -X GET http://127.0.0.1:8000/api/v1/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 4. Modify auth.js for Testing
```javascript
// Add console logs di auth.js untuk debug
async register(email, password, fullName) {
  console.log('Registering:', email);
  // ... rest of code
  console.log('Response:', data);
  return data;
}
```

---

## 📂 File Structure Overview

```
BATIK/
├── index.html                          # Landing page (updated)
├── style.css                           # Existing styles
├── script.js                           # Updated with auth nav
│
├── pages/
│   ├── login/
│   │   └── index.html                 # ✅ NEW
│   ├── register/
│   │   └── index.html                 # ✅ NEW
│   └── dashboard/
│       └── index.html                 # ✅ NEW
│
├── assets/
│   └── js/
│       └── auth.js                    # ✅ NEW - Auth module
│
└── backend/
    ├── app/
    │   ├── models/
    │   │   ├── user.py               # User model
    │   │   └── store.py              # Store model
    │   ├── routes/
    │   │   └── auth.py               # Auth endpoints
    │   ├── schemas/
    │   │   └── user_schema.py        # Pydantic schemas
    │   ├── services/
    │   │   └── auth_service.py       # Auth business logic
    │   └── main.py                    # FastAPI app
    └── requirements.txt
```

---

## 🎯 API Endpoints Checklist

- ✅ `POST /api/v1/auth/register` - Create user account
- ✅ `POST /api/v1/auth/login` - Authenticate user
- ✅ `GET /api/v1/auth/me` - Get user profile (protected)

---

## 📊 Data Flow Diagram

```
┌─────────────────────────────────┐
│    1. User on Landing Page      │
│    Clicks "Masuk" or "Mulai"   │
└────────────┬────────────────────┘
             │
             ↓
┌─────────────────────────────────┐
│    2. Frontend Page Load        │
│    login.html OR register.html  │
│    Loads auth.js module         │
└────────────┬────────────────────┘
             │
             ↓
┌─────────────────────────────────┐
│    3. User Submits Form         │
│    Email, Password, (Name)      │
└────────────┬────────────────────┘
             │
             ↓
┌─────────────────────────────────┐
│    4. JavaScript fetch()        │
│    POST /api/v1/auth/register   │
│    or POST /api/v1/auth/login   │
└────────────┬────────────────────┘
             │
             ↓
┌─────────────────────────────────┐
│    5. Backend Processing        │
│    FastAPI routes receive data  │
│    Validate input               │
│    Hash password                │
│    Query/Create database        │
│    Generate JWT token           │
└────────────┬────────────────────┘
             │
             ↓
┌─────────────────────────────────┐
│    6. Response to Frontend      │
│    200 or 201 Status            │
│    With access_token            │
│    With user data               │
└────────────┬────────────────────┘
             │
             ↓
┌─────────────────────────────────┐
│    7. Save to localStorage      │
│    sellory_auth_token = token   │
│    sellory_user = user_data     │
└────────────┬────────────────────┘
             │
             ↓
┌─────────────────────────────────┐
│    8. Redirect to Dashboard     │
│    window.location.href = '/... │
└────────────┬────────────────────┘
             │
             ↓
┌─────────────────────────────────┐
│    9. Dashboard Load            │
│    Require auth check           │
│    Load user info               │
│    Display welcome message      │
└─────────────────────────────────┘
```

---

## ✨ Features Summary

### Frontend
✅ Login page dengan form validation
✅ Register page dengan password validation
✅ Protected dashboard dengan user info
✅ Auth module untuk JWT management
✅ localStorage untuk token storage
✅ Responsive design
✅ Premium SaaS style
✅ Error handling & user feedback
✅ Loading states
✅ Auto logout on invalid token

### Backend Integration
✅ POST /api/v1/auth/register
✅ POST /api/v1/auth/login
✅ GET /api/v1/auth/me (protected)
✅ JWT token generation
✅ Password hashing
✅ Email validation
✅ Database user management

### Security
✅ JWT tokens (30 min expiry)
✅ Password hashing (bcrypt)
✅ Token verification
✅ Protected routes
✅ Email uniqueness
✅ Account status checking

---

## 🎉 Success Criteria

### ✅ All Working If:
1. Can register new user
2. Can login with credentials
3. Dashboard shows user info
4. Token saved in localStorage
5. Can logout successfully
6. Protected pages redirect to login
7. API calls include Bearer token
8. No console errors

---

## 📞 Quick Reference

**Backend URL:** `http://127.0.0.1:8000`
**Frontend URL:** `http://localhost` or `file://...`
**API Prefix:** `/api/v1/auth`
**Token Storage:** `localStorage['sellory_auth_token']`

---

## 🚀 Next Steps

1. ✅ Test all authentication flows
2. ✅ Verify database has users
3. ✅ Check token in localStorage
4. ⏭️ Create products module
5. ⏭️ Create orders module
6. ⏭️ Add email verification
7. ⏭️ Add password reset

---

**Frontend + Backend integration COMPLETE!** 🎉

Sellory authentication system is fully functional and ready to test.
