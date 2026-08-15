from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.client import Client

router = APIRouter(prefix="/clients", tags=["clients"])


class ClientCreate(BaseModel):
    name: str
    industry: str
    domain: str
    business_info: str
    tone: str = "amable y profesional"


@router.post("")
def create_client(body: ClientCreate, db: Session = Depends(get_db)):
    new_client = Client(**body.model_dump())
    db.add(new_client)
    db.commit()
    db.refresh(new_client)
    return new_client


@router.get("")
def list_clients(db: Session = Depends(get_db)):
    return db.query(Client).all()
