from pydantic import BaseModel, Field


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=1000)
    client_id: int = Field(..., description="A qué negocio pertenece esta conversación")


class ChatResponse(BaseModel):
    reply: str
