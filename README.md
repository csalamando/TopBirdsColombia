# Top Trumps Aves de Colombia

Aplicación demo de cartas estilo Top Trumps con aves de Colombia. Construida para demostrar un arnés de desarrollo de software completo (SDD + TDD + RDD) en 15 sprints.

## Stack

- **Backend:** Python 3.11 + FastAPI + Pydantic + SQLite
- **Frontend:** React 19 + TypeScript + Vite + TailwindCSS
- **Testing:** pytest (backend), Vitest + React Testing Library (frontend), Playwright (E2E), Schemathesis (contract)

## Estructura

```
spec/        # Artefactos del SDLC (visión, user-stories, ADRs, recibos, etc.)
src/backend/ # API FastAPI
src/frontend/# React SPA
tests/e2e/   # Pruebas end-to-end con Playwright
```

## Ejecución local

### Requisitos

- Python 3.11+ y un entorno virtual en `.venv`
- Node.js 20+ y npm

### Backend

```powershell
cd src/backend
..\..\.venv\Scripts\python.exe -m uvicorn app.main:app --reload --port 8000
```

### Frontend

En otra terminal:

```powershell
cd src/frontend
npm run dev
```

La aplicación estará en `http://localhost:5173`. El proxy de Vite redirige `/api` al backend (`http://localhost:8000`).

### Pruebas

Backend:

```powershell
cd src/backend
..\..\.venv\Scripts\python.exe -m pytest -q
```

Frontend:

```powershell
cd src/frontend
npm test
npm run test:coverage
npm run build
```

End-to-end:

```powershell
cd tests/e2e
npx playwright test
```

## Pipeline CI/CD

[![CI](https://github.com/csalamando/TopBirdsColombia/actions/workflows/ci.yml/badge.svg)](https://github.com/csalamando/TopBirdsColombia/actions/workflows/ci.yml)

El workflow `.github/workflows/ci.yml` ejecuta en cada push/PR:

- Backend: `bandit`, `pytest` con cobertura ≥ 70 %, `pip-audit`.
- Frontend: `oxlint`, `eslint-plugin-security`, `npm test`, `npm run build`, `npm audit`.
- E2E: levanta backend + frontend y corre `npx cucumber-js`.
- DAST: levanta backend y ejecuta `schemathesis`.

## Docker local

```powershell
cd "D:\AI Projects\TopBirdsColombia"
docker build -f src/backend/Dockerfile -t topbirds:latest .
docker run -p 8000:8000 -e CORS_ORIGINS=http://localhost:8000 topbirds:latest
```

La aplicación estará en `http://localhost:8000`.

## Despliegue de demostración (Railway)

El backend se despliega en [Railway](https://railway.com) usando el config-as-code `railway.toml` (raíz del repo), que apunta a `src/backend/Dockerfile` y define el health check en `/health`.

1. Crear un proyecto en Railway y conectar el repositorio `csalamando/TopBirdsColombia`.
2. Railway detecta `railway.toml` automáticamente; el root directory del servicio es la raíz del repo.
3. Variables de entorno (ya definidas en `railway.toml`, ajustables en el dashboard):
   - `PORT=8000`
   - `DATABASE_URL=/app/data/topbirds.db`
   - `CORS_ORIGINS=https://<tu-servicio>.up.railway.app,http://localhost:8000`
4. Railway ejecuta el health check en `/health` y asigna el dominio `*.up.railway.app`.

El frontend (GitHub Pages) debe apuntar a la URL pública del backend vía su configuración de build.

## Headers de seguridad y rate limiting

El backend incluye middleware de headers de seguridad (`HSTS`, `CSP`, `X-Frame-Options`, etc.) y rate limiting en los endpoints de creación de partidas (`30/min`) y rondas (`60/min`). Se desactiva automáticamente cuando `TESTING=1`.
