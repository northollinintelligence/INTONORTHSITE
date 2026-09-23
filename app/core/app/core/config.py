import requests
from app.core.config import settings

GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"

def get_chat_response(messages: list, model: str = None):
    if model is None:
        model = settings.modelo_llm
    
    headers = {
        "Authorization": f"Bearer {settings.groq_api_key}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "model": model,
        "messages": messages,
        "temperature": 0.7,
        "max_tokens": 1024
    }
    
    try:
        response = requests.post(GROQ_API_URL, headers=headers, json=payload)
        response.raise_for_status()
        result = response.json()
        return result["choices"][0]["message"]["content"]
    except Exception as e:
        print(f"Error en LLM: {e}")
        return "Lo siento, hubo un error al procesar tu mensaje."