from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_url: str
    groq_api_key: str
    allowed_origins: str
    gmail_user: str = ""
    gmail_app_password: str = ""

    class Config:
        env_file = ".env"

    @property
    def allowed_origins_list(self):
        return [origin.strip() for origin in self.allowed_origins.split(",")]

settings = Settings()