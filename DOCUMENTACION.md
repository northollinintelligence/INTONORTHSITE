# Documentación de NORTH OLLIN

> Este archivo se actualiza automáticamente con cada cambio subido a `main`.
> Última actualización: 2026-09-23 06:13

## Resumen general del proyecto

El proyecto es una página web donde los usuarios pueden conversar con un asistente virtual alimentado por la IA de Groq.  
El **frontend** (Next.js) muestra la interfaz: la barra de navegación, las secciones de servicios, contactos y, lo más importante, la ventana de chat donde el visitante escribe sus preguntas.  
Cuando el usuario envía un mensaje, el frontend lo envía a través de una llamada HTTP al **backend** (FastAPI).  
El backend recibe el texto, lo guarda opcionalmente en la base de **Postgres** (para registrar historiales o datos de clientes) y lo pasa al **servicio LLM** que se comunica con la API de Groq para obtener la respuesta de la IA.  
La respuesta generada vuelve al backend, que la devuelve al frontend, y allí se muestra al usuario en la misma ventana de chat.  
Los archivos de configuración (`.env.example`, `config.py`) contienen las claves de acceso a la base de datos y a la API de Groq, mientras que los módulos `rate_limit` evitan abusos de uso.  
En resumen, el flujo es: visitante escribe → frontend → API FastAPI → IA Groq → respuesta → backend → frontend → visitante ve la respuesta, todo conectado de forma transparente.

---

## Historial de cambios

### 2026-09-23 06:13 — Diego51602

**Commit:** `8f00050` — prueba 2

- **Archivo modificado:** `backend/scripts/documentar_cambios.py`  
- **Qué se cambió:**  
  - En la función `preguntar_groq`, dentro del cuerpo del `json` que se envía a la API, la clave `model` pasó de `"llama-3.3-70b-versatile"` a `"openai/gpt-oss-120b"`.  
- **Por qué se hizo (según el mensaje del commit “prueba 2”):**  
  - Parece una prueba o experimento (indicado por “prueba 2”) para usar otro modelo de lenguaje.  
  - Cambiar a `openai/gpt-oss-120b` probablemente busca evaluar el comportamiento, rendimiento o coste de ese modelo en lugar del anterior `llama-3.3-70b-versatile`.  

En resumen, el único ajuste es la sustitución del modelo de IA que se consulta, lo que afectará la respuesta que el script recibe de la API. No se modificaron otras partes del código.

---

