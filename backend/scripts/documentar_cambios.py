import os
import subprocess
import requests
from datetime import datetime

GROQ_API_KEY = os.environ["GROQ_API_KEY"]
COMMIT_SHA = os.environ["GITHUB_SHA"]
COMMIT_AUTHOR = os.environ.get("COMMIT_AUTHOR", "desconocido")
COMMIT_MESSAGE = os.environ.get("COMMIT_MESSAGE", "")

# Diff completo, con más contexto de líneas alrededor de cada cambio
diff = subprocess.run(
    ["git", "diff", "-U10", "HEAD~1", "HEAD"], capture_output=True, text=True
).stdout

if not diff.strip():
    print("No hay cambios que documentar.")
    exit(0)

# Lista de archivos tocados, con líneas agregadas/eliminadas por archivo
stat = subprocess.run(
    ["git", "diff", "--stat", "HEAD~1", "HEAD"], capture_output=True, text=True
).stdout

diff_recortado = diff[:20000]

# Funcion para usar la API de Groq para generar respuestas
def preguntar_groq(prompt, max_tokens=1500):
    response = requests.post(
        "https://api.groq.com/openai/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {GROQ_API_KEY}",
            "Content-Type": "application/json",
        },
        json={
            "model": "openai/gpt-oss-120b",
            "max_tokens": max_tokens,
            "temperature": 0.3,
            "messages": [{"role": "user", "content": prompt}],
        },
    )
    data = response.json()
    if "choices" not in data:
        print("ERROR de Groq, respuesta completa:")
        print(data)
        raise Exception(f"Groq no devolvió 'choices'. Respuesta: {data}")
    return data["choices"][0]["message"]["content"]


# 1. Detalle técnico completo del cambio
prompt_detalle = f"""Eres un ingeniero de software senior documentando un cambio de código
para el historial técnico de un proyecto. Te doy un git diff con contexto extendido
(10 líneas antes/después de cada cambio) y las estadísticas del commit.

Autor del commit: {COMMIT_AUTHOR}
Mensaje del commit: {COMMIT_MESSAGE}

Estadísticas (archivos y líneas modificadas):
{stat}

Diff completo:
{diff_recortado}

Escribe la documentación de este cambio siguiendo EXACTAMENTE esta estructura en Markdown,
sin omitir ninguna sección aunque tengas que inferir el motivo a partir del mensaje del commit
o del propio código:

**Archivos modificados:** lista cada archivo tocado.

**Qué cambió, archivo por archivo:** para cada archivo, indica el número de línea aproximado
(usa las referencias @@ del diff), qué decía el código ANTES (cita la línea o bloque exacto,
en un bloque de código corto) y qué dice AHORA (igual, en bloque de código corto). Si es una
línea agregada nueva (no había nada antes), dilo explícitamente como "línea nueva". Si es una
eliminación, dilo como "línea eliminada".

**Por qué se hizo:** explica la causa probable o confirmada del cambio, en español simple pero
técnicamente preciso — por ejemplo si corrige un error, qué error corregía exactamente y por qué
pasaba.

**Impacto:** qué parte del sistema se ve afectada por este cambio (ej. "afecta las respuestas
del chatbot en producción", "solo afecta el script de documentación, no el sitio").

**Quién lo hizo:** el autor del commit.

No inventes contenido que no esté respaldado por el diff. Si algo no se puede determinar con
certeza (ej. el motivo exacto), dilo como "probablemente" y explica tu razonamiento en vez de
afirmarlo como hecho.
"""
detalle = preguntar_groq(prompt_detalle, max_tokens=1800)

# 2. Resumen general técnico y profundo
estructura = subprocess.run(
    ["git", "ls-files"], capture_output=True, text=True
).stdout[:6000]

# Lee algunos archivos clave para dar contexto real, no solo nombres
archivos_clave = [
    "backend/app/main.py",
    "backend/app/config.py",
    "backend/app/routers/chat.py",
    "backend/app/database.py",
]
contenido_clave = ""
for archivo in archivos_clave:
    if os.path.exists(archivo):
        with open(archivo, encoding="utf-8", errors="ignore") as f:
            contenido_clave += f"\n--- {archivo} ---\n{f.read()[:2000]}\n"

prompt_resumen = f"""Eres un arquitecto de software escribiendo la documentación técnica
general de un proyecto para que cualquier desarrollador nuevo lo entienda rápido, y también
para que una persona no técnica entienda el panorama sin perderse.

El proyecto tiene: frontend en Next.js (React, TypeScript, Tailwind), backend en Python
con FastAPI, base de datos Postgres con SQLAlchemy, un chatbot que usa la API de Groq
(modelos Llama/GPT-OSS), rate limiting con slowapi, y CORS configurado por dominio.

Lista de archivos del repositorio:
{estructura}

Contenido de los archivos clave del backend:
{contenido_clave}

Escribe un resumen siguiendo esta estructura en Markdown:

**Qué hace el sistema:** 2-3 líneas, en español simple, qué problema resuelve.

**Arquitectura (cómo están conectadas las partes):** explica el flujo real: quién llama a quién,
en qué orden, desde que un visitante escribe en el chat hasta que recibe respuesta. Sé preciso
con los nombres de archivos/funciones reales que ves en el contenido de arriba.

**Componentes principales:** una lista de los módulos/archivos más importantes y qué
responsabilidad tiene cada uno.

**Cómo se despliega:** dónde vive cada parte (frontend, backend, base de datos) según lo que
puedas inferir.

**Cosas a tener en cuenta / deuda técnica visible:** si notas algo en el código que valga la
pena señalar (ej. "usa create_all en vez de migraciones versionadas"), menciónalo.

Sé preciso y técnico pero con explicaciones que una persona sin experiencia en programación
también pueda seguir si lee con calma — evita jerga sin explicarla la primera vez que aparece.
"""
resumen_general = preguntar_groq(prompt_resumen, max_tokens=1500)

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