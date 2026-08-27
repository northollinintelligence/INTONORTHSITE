"""
Conexión a PostgreSQL. Railway te da el DATABASE_URL en su dashboard,
solo pégalo en tu .env, aquí no se toca nada más.
"""
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

from app.config import settings

engine = create_engine(settings.database_url)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    """Dependency que usa cada endpoint para obtener una sesión de BD."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
