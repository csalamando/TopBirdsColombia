# syntax=docker/dockerfile:1

# Top Birds Colombia — imagen de despliegue (CANÓNICA, contexto = raíz del repo).
# Railway la detecta en la raíz y compila con el builder Docker.
# Incluye el build del frontend (Vite) y el runtime del backend (FastAPI + SQLite).

# --- Stage 1: build del frontend ---
FROM node:20-slim AS frontend-builder
WORKDIR /app/frontend
COPY src/frontend/package*.json ./
RUN npm ci
COPY src/frontend .
RUN npm run build

# --- Stage 2: runtime Python ---
FROM python:3.11-slim
WORKDIR /app/backend

# Dependencias del sistema necesarias para compilar extensiones si es requerido
RUN apt-get update && \
    apt-get install -y --no-install-recommends gcc libsqlite3-dev && \
    rm -rf /var/lib/apt/lists/*

# Instalar dependencias Python (runtime + test/contract)
COPY src/backend/requirements.txt /tmp/requirements.txt
RUN pip install --no-cache-dir -r /tmp/requirements.txt

# Copiar backend
COPY src/backend /app/backend

# Copiar el frontend ya construido desde el stage anterior
COPY --from=frontend-builder /app/frontend/dist /app/frontend/dist

ENV PYTHONPATH=/app/backend
ENV DATABASE_URL=/app/data/topbirds.db
ENV CORS_ORIGINS=https://topbirds-colombia.up.railway.app,http://localhost:8000
ENV PORT=8000

EXPOSE 8000

CMD ["python", "-m", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
