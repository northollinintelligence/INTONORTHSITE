from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded

from app.config import settings
from app.core.rate_limit import limiter
from app.database import Base, engine
from app.routers import chat, clients

app = FastAPI(title="North Ollin API")

# Crea las tablas en la BD si no existen (en producción real usarían
# migraciones con Alembic, pero para arrancar esto basta)
Base.metadata.create_all(bind=engine)

# Rate limiting global
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# CORS: solo el dominio de North Ollin puede llamar este backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins_list,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

app.include_router(chat.router)
app.include_router(clients.router)


@app.get("/")
def health_check():
    return {"status": "ok", "service": "North Ollin API"}
