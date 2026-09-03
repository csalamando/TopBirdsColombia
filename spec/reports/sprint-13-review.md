# Sprint 13 — Pipeline CI/CD e infraestructura demo

## Rol

`sdlc-devops-engineer`, `sdlc-security-engineer`, `sdlc-backend-dev-tdd`, `sdlc-frontend-dev-tdd`

## Objetivo

Construir la infraestructura de entrega continua y demo de *Top Trumps Aves de Colombia*: pipeline de GitHub Actions, empaquetado Docker y configuración de despliegue, al tiempo que se cierran los requisitos de seguridad pendientes para exposición pública.

## Entregables

| Entregable | Ubicación | Estado |
|---|---|---|
| Pipeline CI/CD con GitHub Actions | `.github/workflows/ci.yml` | Completado |
| Dockerfile multi-stage backend + frontend | `src/backend/Dockerfile` | Completado |
| Docker ignore file | `src/backend/.dockerignore` | Completado |
| Configuración de despliegue Render | `infra/render.yaml` | Completado |
| Middleware de headers de seguridad | `src/backend/app/security.py` | Completado |
| Rate limiting en endpoints de partida/ronda | `src/backend/app/routers/partidas.py` | Completado |
| Dependencias de seguridad y dev | `src/backend/requirements.txt`, `src/backend/requirements-dev.txt` | Completado |
| Documentación de CI/CD y Docker | `README.md` | Completado |
| Actualización de requisitos de seguridad | `spec/security-requirements.md` | Completado |
| Informe de Sprint 13 | `spec/reports/sprint-13-review.md` | Completado |
| Actualización de pipeline-state y backlog | `spec/pipeline-state.md`, `spec/backlog.md` | Completado |

## Cambios técnicos principales

- **CI/CD**: `.github/workflows/ci.yml` con jobs para backend lint (`bandit`), backend tests (`pytest`), frontend lint (`oxlint` + `eslint-plugin-security`), frontend tests (`vitest`), frontend build (`vite`), E2E (`cucumber-js`), SCA backend (`pip-audit`), SCA frontend (`npm audit`) y DAST (`schemathesis`).
- **Docker**: Dockerfile multi-stage que construye el frontend con Node 20 y corre el backend con Python 3.11 slim, sirviendo el SPA estático desde `/app/frontend/dist`.
- **Infra**: `infra/render.yaml` blueprint para desplegar el contenedor en Render con health check en `/health`.
- **Seguridad**:
  - Middleware `SecurityHeadersMiddleware` añade `HSTS`, `CSP`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `X-XSS-Protection` y `Permissions-Policy`.
  - `slowapi` aplica rate limiting `30/min` en `POST /partidas` y `60/min` en `POST /partidas/{id}/rondas`.
  - Se desactiva automáticamente con `TESTING=1` para no afectar tests unitarios.
- **Documentación**: `README.md` actualizado con badge de CI, instrucciones de Docker local y guía de despliegue en Render.

## Validación

### Backend tests

```powershell
& "D:\AI Projects\TopBirdsColombia\.venv\Scripts\python" -m pytest "D:\AI Projects\TopBirdsColombia\src\backend" --cov=app --cov-report=term-missing --cov-fail-under=70
```

- **45 tests pasados**.
- **Cobertura: 94.66 %**.

### Frontend tests y build

```powershell
cd "D:\AI Projects\TopBirdsColombia\src\frontend"
npm test
npm run build
```

- **40 tests pasados**.
- Build exitoso (`dist/` generado).

### E2E

```powershell
cd "D:\AI Projects\TopBirdsColombia\tests\e2e"
npx cucumber-js
```

- **10 escenarios pasados**, **60 steps pasados**.

### SAST

```powershell
python -m bandit -r src/backend/app
```

- `No issues identified.`

### SCA

- `pip-audit`: 8 vulnerabilidades conocidas aceptadas en `pytest` y `starlette` (mismas que en Sprint 12, documentadas en `spec/security-scan-report.md`).
- `npm audit` en `src/frontend`: 0 vulnerabilidades.
- `npm audit` en `tests/e2e`: 0 vulnerabilidades.

### DAST

```powershell
schemathesis run http://127.0.0.1:8000/openapi.json --base-url http://127.0.0.1:8000 --checks all --hypothesis-max-examples=20 --experimental=openapi-3.1
```

- **6 operaciones recopiladas**, **82/82 checks pasados**.

### Docker local

```powershell
docker build -f src/backend/Dockerfile -t topbirds:latest .
docker run -d --name topbirds-test -p 8000:8000 -e CORS_ORIGINS=http://localhost:8000 topbirds:latest
```

- Imagen construida exitosamente.
- Health check `GET /health` responde `{"status":"ok"}`.

## Deuda técnica

- El deploy real en Render/Railway requiere crear la cuenta y conectar el repositorio; la configuración (`infra/render.yaml`) está lista.
- El pipeline de GitHub Actions no se puede ejecutar localmente; la primera ejecución remota puede requerir ajustes menores (timings, versiones de Playwright, etc.).

## Próximo paso

Sprint 14 — Despliegue a producción/demo.
