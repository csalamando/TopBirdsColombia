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

## Despliegue de demostración

1. Construir el frontend: `cd src/frontend && npm run build`
2. El backend monta automáticamente `src/frontend/dist` en `/` si existe.
3. Ejecutar el backend y servir la aplicación completa desde `http://localhost:8000`.
