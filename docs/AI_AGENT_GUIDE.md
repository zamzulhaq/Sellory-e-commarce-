# AI_AGENT_GUIDE.md

# SELLORY AI AGENT GUIDE

This document explains how AI agents should understand and interact with the Sellory codebase.

---

# Core Principle

Sellory uses:

* Frontend as presentation layer
* FastAPI as backend API
* Supabase PostgreSQL as database
* JWT for authentication

AI agents must maintain compatibility with this architecture.

---

# Backend Rules

## Framework

Use:

* FastAPI
* SQLAlchemy ORM
* PostgreSQL-compatible syntax

Do NOT:

* replace FastAPI
* replace Supabase database
* use MongoDB
* use Firebase as main database

---

# Database Rules

Database provider:

* Supabase PostgreSQL

All tables must:

* use UUID primary keys
* use timestamps
* support future multi-store system

Required columns:

* id
* created_at
* updated_at

---

# Authentication Rules

Authentication system:

* JWT access token
* JWT refresh token

Password hashing:

* bcrypt

Do NOT:

* store plain passwords
* use session authentication

---

# File Structure Rules

Backend structure:

backend/app/

* routes/
* models/
* schemas/
* services/
* auth/
* utils/

AI agents must keep separation of concerns.

---

# API Rules

API style:

* REST API

Response format:

{
"success": true,
"message": "Success",
"data": {}
}

---

# Product System Rules

Products belong to:

* one store
* one owner

Future-ready:

* variants
* stock
* categories
* AI descriptions

---

# Order System Rules

Order statuses:

* pending
* paid
* processing
* shipped
* completed
* cancelled

---

# Future AI Modules

Planned AI features:

* AI caption generator
* AI SEO product description
* AI analytics
* AI recommendation
* AI customer support

AI agents should preserve compatibility for future AI services.

---

# Frontend Rules

Frontend communicates ONLY through API.

Do NOT:

* connect frontend directly to database
* expose Supabase secret keys

---

# Security Rules

Never expose:

* service role key
* database credentials
* JWT secret

Always use:

* environment variables
* validation schemas
* secure password hashing

---

# Coding Philosophy

Code must be:

* scalable
* readable
* modular
* production-ready
* maintainable
