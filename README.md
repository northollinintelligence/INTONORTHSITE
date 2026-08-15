# North Ollin - Backend

## Levantar en local

```bash
python -m venv venv
source venv/bin/activate   # en Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env       # y llena los valores reales
uvicorn app.main:app --reload
```

Abre http://localhost:8000 — debe responder `{"status": "ok"}`.
Docs automáticos de la API: http://localhost:8000/docs

## Dar de alta un cliente/negocio nuevo

El chatbot es multi-cliente: un mismo backend atiende a varios negocios sin
mezclar su información. Para agregar uno nuevo, mándale un POST a `/clients`
(puedes hacerlo desde /docs directo en el navegador) con:

```json
{
  "name": "Nombre del negocio",
  "industry": "Rubro, ej. restaurante",
  "domain": "dominio-del-cliente.com",
  "business_info": "Descripción del negocio, servicios, horarios, precios, etc.",
  "tone": "amable y profesional"
}
```

Te regresa un `id` — ese `id` es el `client_id` que el widget de chat de ese
negocio debe mandar en cada mensaje a `/chat`.

## Deploy en Railway

1. Conecta este repo desde el dashboard de Railway.
2. Agrega las variables de entorno del `.env.example` en Settings → Variables.
3. Railway detecta FastAPI automático, pero si pide start command usa:
   `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
