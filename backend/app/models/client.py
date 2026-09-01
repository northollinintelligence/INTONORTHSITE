"""
Cada fila de esta tabla es un negocio distinto que usa el chatbot.
Así se guarda la info de cada uno sin que se mezcle entre sí.
"""
from sqlalchemy import Column, Integer, String, Text

from app.database import Base


class Client(Base):
    __tablename__ = "clients"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)          # nombre del negocio
    industry = Column(String(100), nullable=False)        # rubro (ej. "restaurante", "clínica dental")
    domain = Column(String(200), unique=True, index=True)  # dominio desde donde llama, ej. "clientex.com"
    business_info = Column(Text, nullable=False)  # descripción del negocio, servicios, horarios, etc.
    tone = Column(String(200), default="amable y profesional")  # tono de voz deseado
