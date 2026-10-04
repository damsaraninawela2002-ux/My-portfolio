from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from database import settings, ping_database
from routes import projects, auth, contact

app = FastAPI(
    title="Portfolio API",
    description="FastAPI Backend for Full-Stack Portfolio with MongoDB via Motor, Connection Pooling, and JWT Auth",
    version="1.0.0"
)

# CORS locked strictly to frontend origin from .env (never "*")
allowed_origins = [settings.frontend_url.rstrip("/")]
if "localhost" in settings.frontend_url:
    allowed_origins.append(settings.frontend_url.replace("localhost", "127.0.0.1").rstrip("/"))

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"],
)

# Include Routers
app.include_router(projects.router, prefix="/api", tags=["Projects"])
app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])
app.include_router(contact.router, prefix="/api", tags=["Contact"])

@app.get("/")
def read_root():
    return {
        "message": "Portfolio FastAPI Backend is running!",
        "docs_url": "/docs",
        "health_check": "/api/health"
    }

@app.get("/api/health")
async def health_check():
    """
    Health check verifying API responsiveness and async MongoDB connectivity.
    """
    db_status = await ping_database()
    if db_status["status"] != "connected":
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database is unavailable",
        )

    return {
        "status": "healthy",
        "database": db_status
    }