# Sprint 12 — SAST/SCA/DAST y GATE 2.5

## Rol

`sdlc-security-engineer`, `sdlc-qa-automation`, `sdlc-backend-dev-tdd`, `sdlc-frontend-dev-tdd`

## Objetivo

Cerrar el **GATE 2.5 de seguridad** ejecutando análisis estático (SAST), composición de dependencias (SCA) y pruebas dinámicas (DAST) sobre backend, frontend y contrato API, documentando los hallazgos y los riesgos aceptados.

## Entregables

| Entregable | Ubicación | Estado |
|---|---|---|
| Configuración SAST backend con Bandit | `src/backend/requirements.txt` | Completado |
| Fix de `B311` en selección de atributo IA | `src/backend/app/routers/partidas.py` | Completado |
| Configuración SAST frontend con ESLint + eslint-plugin-security | `src/frontend/eslint.config.js`, `src/frontend/package.json` | Completado |
| Actualización de dependencias backend | `src/backend/requirements.txt` | Completado |
| Escaneo SCA backend con pip-audit | `spec/security-scan-report.md` | Completado |
| Escaneo SCA frontend con npm audit | `spec/security-scan-report.md` | Completado |
| Escaneo DAST con Schemathesis | `spec/security-scan-report.md` | Completado |
| Informe de escaneos de seguridad | `spec/security-scan-report.md` | Completado |
| Actualización del estado de pipeline | `spec/pipeline-state.md` | Completado |

## Cambios técnicos principales

- **Backend**: `random.choice` reemplazado por `secrets.choice` en `src/backend/app/routers/partidas.py`.
- **Backend**: actualización controlada de dependencias:
  - `fastapi==0.115.0`
  - `uvicorn[standard]==0.30.6`
  - `pydantic==2.9.2`
  - `click==8.3.3`
  - `pytest==8.3.5`
  - `pytest-cov==4.1.0`
  - `httpx==0.26.0`
  - `schemathesis==3.25.3`
- **Frontend**: instalación de `eslint`, `@typescript-eslint/parser` y `eslint-plugin-security` con configuración flat en `src/frontend/eslint.config.js`.

## Validación

### SAST backend

```powershell
& "D:\AI Projects\TopBirdsColombia\.venv\Scripts\bandit" -r "D:\AI Projects\TopBirdsColombia\src\backend\app"
```

- **Resultado**: `No issues identified.`

### SAST frontend

```powershell
cd "D:\AI Projects\TopBirdsColombia\src\frontend"
npx eslint .
```

- **Resultado**: 3 advertencias `security/detect-object-injection` aceptadas por bajo riesgo.

### SCA backend

```powershell
& "D:\AI Projects\TopBirdsColombia\.venv\Scripts\python" -m pip_audit --format markdown --desc on -r "D:\AI Projects\TopBirdsColombia\src\backend\requirements.txt"
```

- **Resultado**: 10 vulnerabilidades conocidas (9 en `starlette`, 1 en `pytest`).
- **Decisión**: riesgos aceptados y documentados en `spec/security-scan-report.md` por incompatibilidad de versiones y bajo impacto en el demo.

### SCA frontend

```powershell
cd "D:\AI Projects\TopBirdsColombia\src\frontend"
npm audit --json
```

- **Resultado**: 0 vulnerabilidades.

```powershell
cd "D:\AI Projects\TopBirdsColombia\tests\e2e"
npm audit --json
```

- **Resultado**: 0 vulnerabilidades.

### DAST

```powershell
& "D:\AI Projects\TopBirdsColombia\.venv\Scripts\schemathesis" run http://127.0.0.1:8000/openapi.json --base-url http://127.0.0.1:8000 --checks all --hypothesis-max-examples=20 --experimental=openapi-3.1
```

- **Operaciones recopiladas**: 6
- **Checks**: 82/82 pasados en cada categoría
- **Resultado**: `6 passed in 0.99s`

### Tests de regresión

```powershell
& "D:\AI Projects\TopBirdsColombia\.venv\Scripts\python" -m pytest "D:\AI Projects\TopBirdsColombia\src\backend" --cov=app --cov-report=term-missing --cov-fail-under=70
```

- **45 tests pasados**.
- **Cobertura: 94.74 %**.

## Notas técnicas

- Bandit no reportó issues tras el cambio de `random.choice` a `secrets.choice`.
- ESLint detectó object-injection en índices de mapas controlados; se mantienen advertencias por ser falsos positivos de bajo riesgo.
- pip-audit encontró vulnerabilidades en `starlette 0.38.6` y `pytest 8.3.5` que no pueden remediarse sin romper `fastapi==0.115.0` y `schemathesis==3.25.3` respectivamente.
- npm audit está limpio en frontend y en el paquete de pruebas E2E.
- Schemathesis validó que la API no genera errores 5xx, respuestas fuera del contrato ni esquemas inconsistentes.

## Deuda técnica

- Actualizar `starlette` y `pytest` cuando FastAPI y schemathesis lo permitan.
- Implementar headers de seguridad, HTTPS y rate limiting en el despliegue (Sprint 13).

## Próximo paso

Sprint 13 — Pipeline CI/CD e infraestructura demo.
