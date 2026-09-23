import os
import subprocess
import requests
from datetime import datetime

GROQ_API_KEY = os.environ["GROQ_API_KEY_DOC"]
COMMIT_SHA = os.environ["GITHUB_SHA"]
COMMIT_AUTHOR = os.environ.get("COMMIT_AUTHOR", "desconocido")
COMMIT_MESSAGE = os.environ.get("COMMIT_MESSAGE", "")

diff = subprocess.run(
    ["git", "diff", "HEAD~1", "HEAD"], capture_output=True, text=True
).stdout

if not diff.strip():
    print("No hay cambios que documentar.")
    exit(0)

diff_recortado = diff[:12000]


def preguntar_groq(prompt, max_tokens=800):
    response = requests.post(
        "https://api.groq.com/openai/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {GROQ_API_KEY}",
            "Content-Type": "application/json",
        },
        json={
            "model": "llama-3.3-70b-versatile",
            "max_tokens": max_tokens,
            "messages": [{"role": "user", "content": prompt}],
        },
    )
    return response.json()["choices"][0]["message"]["content"]


# 1. Resumen detallado de este cambio en particular
prompt_detalle = f"""Eres un asistente que documenta cambios de código para un equipo no técnico.
Te doy un git diff. Explica en español simple, con el detalle necesario para
entender qué se hizo, qué archivos se tocaron y por qué probablemente se hizo
(basado en el mensaje del commit). Usa viñetas. No inventes nada que no esté en el diff.

Mensaje del commit: {COMMIT_MESSAGE}

Diff:
{diff_recortado}
"""
detalle = preguntar_groq(prompt_detalle)

# 2. Estructura completa del proyecto, para regenerar el resumen general
estructura = subprocess.run(
    ["git", "ls-files"], capture_output=True, text=True
).stdout[:4000]

prompt_resumen = f"""Eres un asistente que explica proyectos de software a personas no técnicas.
Aquí está la lista de archivos de un proyecto (frontend en Next.js, backend en
FastAPI/Python, base de datos Postgres, chatbot con Groq). Escribe un resumen
general de 8-12 líneas explicando: qué hace el programa en general, cómo están
conectadas sus partes (frontend, backend, base de datos, IA), y cómo funciona
el flujo principal (ej. un visitante habla con el chatbot). Lenguaje simple,
sin tecnicismos innecesarios.

Archivos del proyecto:
{estructura}
"""
resumen_general = preguntar_groq(prompt_resumen, max_tokens=600)

# --- Arma el archivo completo ---
fecha = datetime.now().strftime("%Y-%m-%d %H:%M")

encabezado = f"""# Documentación de NORTH OLLIN

> Este archivo se actualiza automáticamente con cada cambio subido a `main`.
> Última actualización: {fecha}

## Resumen general del proyecto

{resumen_general}

---

## Historial de cambios

"""

historial_previo = ""
if os.path.exists("DOCUMENTACION.md"):
    contenido_actual = open("DOCUMENTACION.md", encoding="utf-8").read()
    if "## Historial de cambios" in contenido_actual:
        historial_previo = contenido_actual.split("## Historial de cambios", 1)[1]
        historial_previo = historial_previo.lstrip("\n")

nueva_entrada = f"""### {fecha} — {COMMIT_AUTHOR}

**Commit:** `{COMMIT_SHA[:7]}` — {COMMIT_MESSAGE}

{detalle}

---

"""

contenido_final = encabezado + nueva_entrada + historial_previo

with open("DOCUMENTACION.md", "w", encoding="utf-8") as f:
    f.write(contenido_final)

print("Documentación actualizada.")