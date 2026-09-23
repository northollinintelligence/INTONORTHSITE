# Documentación de NORTH OLLIN

> Este archivo se actualiza automáticamente con cada cambio subido a `main`.
> Última actualización: 2026-09-23 06:26

## Resumen general del proyecto

# Documentación Técnica – Visión General del Proyecto  

> **Objetivo:** Que cualquier desarrollador nuevo (y también una persona sin conocimientos técnicos) entienda rápidamente qué hace el sistema, cómo está construido y qué aspectos hay que vigilar al trabajar con él.

---

## **Qué hace el sistema**

North Ollin es una pequeña aplicación web que permite a los visitantes de un sitio corporativo conversar con un **chat‑bot inteligente**.  
El bot recibe la pregunta del usuario, la envía a la API de Groq (modelos Llama / GPT‑OSS) y devuelve la respuesta generada.  
Todo el proceso está protegido con **rate‑limiting** (para evitar abusos) y con **CORS** (solo dominios autorizados pueden usar la API).

---

## **Arquitectura (flujo de una conversación)**  

A continuación se describe paso a paso lo que ocurre cuando un visitante escribe en el chat y recibe la respuesta, indicando los archivos y funciones reales que intervienen.

| Paso | Qué ocurre | Código / Archivo involucrado |
|------|------------|------------------------------|
| **1️⃣  Navegador → Frontend** | El usuario escribe un mensaje en el componente de chat. | `app/components/ChatSection.tsx` (React + TypeScript). |
| **2️⃣  Frontend → Backend** | El componente llama al endpoint **POST `/chat`** con `client_id` y `message`. | En el cliente se usa `fetch`/`axios` (ver código de `ChatSection.tsx`). |
| **3️⃣  Middleware de CORS** | FastAPI verifica que el origen del request (p.ej. `http://localhost:3000` o el dominio de producción) esté permitido. | Configuración en `backend/app/main.py` → `CORSMiddleware` con `settings.allowed_origins_list`. |
| **4️⃣  Rate‑Limiting** | Antes de ejecutar la lógica del endpoint, **slowapi** comprueba que el cliente no haya superado el límite de 10 peticiones por minuto. | Decorador `@limiter.limit("10/minute")` en `backend/app/routers/chat.py`. |
| **5️⃣  Validación y Dependencias** | FastAPI valida el cuerpo del request contra el **schema** `ChatRequest`. | `backend/app/schemas/chat.py`. |
| **6️⃣  Acceso a la BD** | Se abre una sesión con PostgreSQL y se busca el registro del cliente (`Client`) cuyo `id` coincide con `client_id`. | `backend/app/database.py` → `get_db()`; consulta en `backend/app/routers/chat.py`. |
| **7️⃣  Llamada al modelo LLM** | Si el cliente existe, se llama al servicio que envía el mensaje a la API de Groq y recibe la respuesta. | `backend/app/services/llm_service.py` → función `get_chat_response(message, client)`. |
| **8️⃣  Respuesta al Frontend** | El endpoint devuelve un objeto `ChatResponse` con la respuesta del modelo. | `backend/app/schemas/chat.py` (modelo de salida) y `backend/app/routers/chat.py`. |
| **9️⃣  Render en UI** | El frontend recibe el JSON, actualiza el estado del componente y muestra la respuesta al usuario. | `ChatSection.tsx` vuelve a renderizar la conversación. |

> **Resumen visual**  

```
[Browser] --(POST /chat)--> [FastAPI] --(CORS, RateLimit)--> [DB] (Client) 
      |                                            |
      +--------------------> [LLM Service] <------+
                     (Groq API)
      |
   JSON response
      |
[Browser UI] (ChatSection) → muestra mensaje
```

---

## **Componentes principales**

| Área | Archivo / Módulo | Responsabilidad |
|------|------------------|-----------------|
| **Configuración** | `backend/app/config.py` | Lee variables de entorno (`.env`) usando **pydantic Settings** (DB URL, clave de Groq, dominios CORS, credenciales de email). |
| **Entrada de la API** | `backend/app/main.py` | Crea la aplicación FastAPI, registra middleware (CORS, rate‑limit), incluye routers y crea tablas con `Base.metadata.create_all`. |
| **Rate‑Limiting** | `backend/app/core/rate_limit.py` | Instancia de **slowapi Limiter** que se usa como decorador en los endpoints. |
| **Base de datos** | `backend/app/database.py` | Configura el motor SQLAlchemy, la sesión (`SessionLocal`) y la función de dependencia `get_db`. |
| **Modelos ORM** | `backend/app/models/client.py` | Define la tabla `client` (id, nombre, etc.) con SQLAlchemy. |
| **Schemas (DTO)** | `backend/app/schemas/chat.py` | Define los *pydantic* models `ChatRequest` y `ChatResponse` (validación de entrada y salida). |
| **Routers** | `backend/app/routers/chat.py` <br> `backend/app/routers/clients.py` | Endpoints REST. `chat.py` contiene la lógica del chat; `clients.py` gestiona CRUD de clientes. |
| **Servicio LLM** | `backend/app/services/llm_service.py` | Envía la petición a la API de Groq y devuelve el texto generado. |
| **Frontend – Layout** | `app/layout.tsx` | Layout global de Next.js (incluye `Navbar`, `globals.css`). |
| **Frontend – Componentes UI** | `app/components/*.tsx` (Card, Navbar, ServicesSection, ContactSection, ChatSection) | UI estática y dinámica; `ChatSection` es la que interactúa con el backend. |
| **Estilos** | `app/globals.css`, `tailwind.config.js` (implícito) | Estilos con **Tailwind CSS**. |
| **Scripts de CI** | `.github/workflows/documentar.yml` | Workflow de GitHub Actions

---

## Historial de cambios

### 2026-09-23 06:26 — Diego51602

**Commit:** `3125d47` — Merge branch 'Diego' of https://github.com/northollinintelligence/INTONORTHSITE into Diego

## Archivos modificados
- `DOCUMENTACION.md`

## Qué cambió, archivo por archivo
### `DOCUMENTACION.md`
- **Referencia del diff:** `@@ -1,34 +1,180 @@`
- **Líneas afectadas:** aproximadamente de la **línea 2** hasta la **línea 180** (todo el bloque añadido después del encabezado).
- **Antes:**  
  ```markdown
  # Documentación de NORTH OLLIN
  ```
  (el archivo contenía únicamente el encabezado; el resto del contenido no existía).

- **Ahora:**  
  ```markdown
  # Documentación de NORTH OLLIN
  
  > Este archivo se actualiza automáticamente con cada cambio subido a `main`.
  > Última actualización: 2026-09-23 06:22
  
  ## Resumen general del proyecto
  
  ## 📄 Resumen del proyecto  
  
  ### **Qué hace el sistema**  
  Una página web permite a los visitantes conversar con un **chat‑bot inteligente** que responde usando modelos de lenguaje (Llama / GPT‑OSS) a través de la API de **Groq**.  
  El backend guarda información de los clientes (empresa que usa el chat) en una base de datos **PostgreSQL** y controla cuántas peticiones pueden hacerse por minuto.
  
  ---
  
  ## **Arquitectura (cómo están conectadas las partes)**  
  
  1. **Usuario → Frontend (Next.js)**  
     * El visitante escribe un mensaje en el componente `ChatSection.tsx` (ubicado en `app/components/ChatSection.tsx`).  
     * Ese componente llama a la API del backend mediante **fetch** a la ruta **`/chat`** (POST) del servidor FastAPI.
  
  2. **Frontend → Backend (FastAPI)**  
     * La petición llega a `backend/app/main.py`, donde el **FastAPI** está creado y configurado.  
     * El middleware **CORS** (`CORSMiddleware`) verifica que el origen de la petición esté dentro de `settings.allowed_origins` (definido en `backend/app/config.py`).  
     * El **rate limiter** (`slowapi`) intercepta la llamada; la regla `@limiter.limit("10/minute")` (en `backend/app/routers/chat.py`) permite como máximo 10 peticiones por minuto por cliente.
  
  3. **Router de chat** (`backend/app/routers/chat.py`)  
     * La función `chat` recibe el cuerpo de la petición (`ChatRequest` definido en `backend/app/schemas/chat.py`).  
     * Usa la dependencia `get_db` (`backend/app/database.py`) para abrir una sesión con PostgreSQL.  
     * Busca el cliente en la tabla `Client` (`backend/app/models/client.py`). Si no existe, devuelve **404**.
  
  4. **Servicio LLM** (`backend/app/services/llm_service.py`)  
     * Con el mensaje del usuario y los datos del cliente, llama a `get_chat_response`.  
     * Dentro de este archivo se construye la solicitud HTTP a la API de **Groq** usando la clave `groq_api_key` del archivo de configuración.  
     * La respuesta del modelo (texto) se devuelve al router.
  
  5. **Respuesta al Frontend**  
     * El router empaqueta la respuesta en `ChatResponse` (`backend/app/schemas/chat.py`) y la envía de vuelta al cliente HTTP.  
     * En el navegador, `ChatSection.tsx` recibe el JSON `{ reply: "..." }` y lo muestra en la conversación.
  
  6. **Persistencia**  
     * La tabla `Client` se crea automáticamente al iniciar la aplicación gracias a `Base.metadata.create_all(bind=engine)` en `backend/app/main.py`.  
     * Cada vez que se necesite información del cliente (por ejemplo, nombre de la empresa o configuración de prompt), se lee de PostgreSQL mediante **SQLAlchemy**.
  
  **Orden de ejecución resumido**
  
  ```text
  Usuario → UI (ChatSection.tsx) → fetch POST /chat
     ↓
  FastAPI (backend/app/main.py) → CORS → RateLimiter
     ↓
  router.chat (backend/app/routers/chat.py)
     ↓
  DB Session (backend/app/database.py) → SELECT client
     ↓
  llm_service.get_chat_response (backend/app/services/llm_service.py)
     ↓
  Llamada a Groq API → respuesta del modelo
     ↓
  router devuelve ChatResponse → UI muestra respuesta
  ```
  
  ---
  
  ## **Componentes principales**  
  
  | Área | Archivo / Módulo | Responsabilidad |
  |------|------------------|-----------------|
  | **Frontend** | `app/components/ChatSection.tsx` | UI del chat, envía peticiones al backend. |
  | | `app/components/Navbar.tsx`, `Card.tsx`, etc. | Layout y secciones estáticas. |
  | | `next.config.ts`, `tailwind.config.js` | Configuración de Next.js y Tailwind CSS. |
  | **Backend – API** | `backend/app/main.py` | Crea la aplicación FastAPI, configura CORS, rate limiting y registra routers. |
  | | `backend/app/config.py` | Lee variables de entorno (`.env`) y expone `settings`. |
  | | `backend/app/routers/chat.py` | Endpoint `/chat` que recibe mensajes y devuelve respuestas. |
  | | `backend/app/routers/clients.py` | CRUD básico de clientes (no mostrado pero presente). |
  | **Backend – Persistencia** | `backend/app/database

---

### 2026-09-23 06:22 — Diego51602

**Commit:** `8ac9ff5` — Merge branch 'Diego' of https://github.com/northollinintelligence/INTONORTHSITE into Diego

## Archivos modificados
- `DOCUMENTACION.md` (archivo nuevo)

## Qué cambió, archivo por archivo
### `DOCUMENTACION.md`
- **Referencia del diff:** `@@ -0,0 +1,34 @@`
- **Antes:** *no existía el archivo* (línea eliminada / inexistente).  
- **Ahora:** línea nueva con todo el contenido del archivo:

```markdown
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
```

## Por qué se hizo
Se añadió `DOCUMENTACION.md` para disponer de una referencia centralizada y siempre actualizada del proyecto.  
El archivo contiene:
- Un encabezado y metadatos de actualización automática.  
- Un resumen del flujo completo (frontend → backend → IA Groq).  
- Un historial de cambios que, a modo de ejemplo, documenta una modificación previa en `backend/scripts/documentar_cambios.py`.  

Probablemente el objetivo es facilitar la incorporación de nuevos desarrolladores y proporcionar una base para la generación automática de documentación a partir de los commits.

## Impacto
- **Ámbito:** únicamente documental.  
- **Sistema afectado:** no afecta la lógica de la aplicación, ni el frontend, ni el backend, ni la IA.  
- **Consecuencia:** mejora la claridad y la mantenibilidad del proyecto al ofrecer una guía de arquitectura y un registro de cambios visible para todo el equipo.

## Quién lo hizo
- **Autor del commit:** Diego51602.

---

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

