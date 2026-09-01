"""
Rate limiting por IP para que nadie abuse del chatbot y dispare el costo del LLM.
"""
from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)
