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

El backend se despliega en [Railway](https://railway.com). La infraestructura se gestiona como código en `.railway/railway.ts` (Railway IaC): servicio `TopBirdsColombia`, source GitHub, health check `/health` y variables de entorno. El build usa Docker con `src/backend/Dockerfile` (configuración del servicio; el DSL de IaC no expone `dockerfilePath`).

**Requisitos del CLI** (una vez por máquina):

```powershell
npm i -g @railway/cli
npm install   # instala el SDK `railway` (IaC) en la raíz del repo
railway login
```

**Workflow de IaC** (aplicar cambios de `.railway/railway.ts`):

```powershell
railway link -p <proyecto>
railway config plan     # previsualiza cambios
railway config apply    # aplica tras confirmar
```

> Nota Windows: por un bug del SDK (`railway/iac` no encuentra el ejecutable del CLI), exporta antes `$env:_ = "$env:APPDATA\npm\node_modules\@railway\cli\bin\railway.exe"`.

**Despliegue**: con el repo conectado, cada push a `main` dispara el build (Dockerfile). También manual: `railway up --detach -y`.

Variables del servicio (definidas en IaC): `PORT=8000`, `DATABASE_URL=/app/data/topbirds.db`, `CORS_ORIGINS=https://<tu-servicio>.up.railway.app,http://localhost:8000`. Railway asigna el dominio `*.up.railway.app` y ejecuta el health check en `/health`. El frontend (GitHub Pages) debe apuntar a la URL pública del backend vía su configuración de build.

## Headers de seguridad y rate limiting

El backend incluye middleware de headers de seguridad (`HSTS`, `CSP`, `X-Frame-Options`, etc.) y rate limiting en los endpoints de creación de partidas (`30/min`) y rondas (`60/min`). Se desactiva automáticamente cuando `TESTING=1`.
