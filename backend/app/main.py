"""
Sellory Backend - Main Application
FastAPI application with CORS, health check, and route registration.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.models import User, Store  # Import models for SQLAlchemy
from app.routes import auth

# Initialize FastAPI app
app = FastAPI(
    title="Sellory Backend",
    description="Sellory SaaS e-commerce platform API",
    version="1.0.0"
)

# CORS Middleware Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # TODO: Restrict to frontend domains in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Health Check Endpoint
@app.get(f"{settings.api_prefix}/health")
async def health_check():
    """
    Health check endpoint.
    Returns application status.
    """
    return {
        "success": True,
        "message": "Sellory backend running",
        "environment": settings.env
    }


# Root endpoint
@app.get("/")
async def root():
    """Root endpoint returning welcome message."""
    return {
        "success": True,
        "message": "Welcome to Sellory Backend API",
        "docs": "/docs",
        "health": f"{settings.api_prefix}/health"
    }


# Register routes
app.include_router(auth.router, prefix=f"{settings.api_prefix}/auth", tags=["authentication"])

# TODO: Register additional routes when created
# from app.routes import products, stores, orders
# app.include_router(products.router, prefix=f"{settings.api_prefix}/products", tags=["products"])
# app.include_router(stores.router, prefix=f"{settings.api_prefix}/stores", tags=["stores"])
# app.include_router(orders.router, prefix=f"{settings.api_prefix}/orders", tags=["orders"])


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.debug
    )
