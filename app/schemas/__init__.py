from pydantic import BaseModel

class ClientCreate(BaseModel):
    name: str
    industry: str
    domain: str
    business_info: str
    tone: str = "profesional"

class ChatRequest(BaseModel):
    message: str
    client_id: int

class ChatResponse(BaseModel):
    reply: str