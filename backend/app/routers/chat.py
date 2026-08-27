from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session

from app.core.rate_limit import limiter
from app.database import get_db
from app.models.client import Client
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.llm_service import get_chat_response

router = APIRouter(prefix="/chat", tags=["chat"])


@router.post("", response_model=ChatResponse)
@limiter.limit("10/minute")  # ajusta según su tráfico esperado
async def chat(request: Request, body: ChatRequest, db: Session = Depends(get_db)):
    business_client = db.query(Client).filter(Client.id == body.client_id).first()
    if not business_client:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")

    reply = get_chat_response(body.message, business_client)
    return ChatResponse(reply=reply)
