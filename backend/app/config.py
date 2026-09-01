"""
Configuración centralizada. Lee todo desde variables de entorno (.env).
Nunca pongas keys directamente aquí.
"""
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # Base de datos (Railway te da esta URL directo en su dashboard)
    database_url: str

    # LLM - Groq (gratis, sin tarjeta). Si luego quieren cambiar de proveedor,
    # solo agregan su variable aquí y ajustan llm_service.py
    groq_api_key: str = ""

    # CORS - dominios permitidos a llamar el backend
    allowed_origins: str = "http://localhost:3000"

    # Email (para el formulario de contacto)
    gmail_user: str = ""
    gmail_app_password: str = ""

    class Config:
        env_file = ".env"

    @property
    def allowed_origins_list(self) -> list[str]:
        return [origin.strip() for origin in self.allowed_origins.split(",")]


settings = Settings()
