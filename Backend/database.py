import dns.resolver
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic_settings import BaseSettings

# Ensure reliable DNS SRV resolution for MongoDB Atlas on Windows
try:
    resolver = dns.resolver.Resolver(configure=True)
    resolver.nameservers = ['8.8.8.8', '1.1.1.1'] + resolver.nameservers
    dns.resolver.default_resolver = resolver
except Exception:
    pass

class Settings(BaseSettings):
    mongodb_uri: str
    database_name: str = "portfolio_db"
    frontend_url: str = "http://localhost:5173"
    jwt_secret: str = "damsarani_super_secret_portfolio_jwt_key_2026"
    jwt_algorithm: str = "HS256"
    jwt_expires_minutes: int = 1440
    admin_username: str = "admin"
    admin_password_hash: str = ""

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()

# Motor Async MongoDB Client with Connection Pooling
client = AsyncIOMotorClient(
    settings.mongodb_uri,
    maxPoolSize=50,
    minPoolSize=10,
    serverSelectionTimeoutMS=5000,
)

db = client[settings.database_name]

async def ping_database():
    """
    Test MongoDB Atlas connection asynchronously.
    """
    try:
        await client.admin.command('ping')
        return {"status": "connected", "database": settings.database_name}
    except Exception as e:
        return {"status": "error", "message": str(e)}