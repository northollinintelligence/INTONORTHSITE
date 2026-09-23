import requests
from app.config import settings

GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"

def build_system_prompt(business_client) -> str:
    return f"""Eres el asistente virtual de {business_client.name}, un negocio del rubro de {business_client.industry}.

Información del negocio:
{business_client.business_info}

Responde de forma breve y en un tono {business_client.tone}.
Si no sabes algo, dilo honestamente y sugiere que contacten directo al negocio.
Solo usa la información de este negocio, nunca menciones ni compares con otros clientes o negocios."""

def get_chat_response(user_message: str, business_client) -> str:
    system_prompt = build_system_prompt(business_client)
    
    headers = {
        "Authorization": f"Bearer {settings.groq_api_key}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "model":"llama-3.1-8b-instant",
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_message}
        ],
        "temperature": 0.7,
        "max_tokens": 500
    }
    
    response = requests.post(GROQ_API_URL, headers=headers, json=payload, timeout=30)
    
    # Si hay error, muestra el detalle COMPLETO
    if response.status_code != 200:
        return f"Error {response.status_code}: {response.text}"
    
    result = response.json()
    return result["choices"][0]["message"]["content"]