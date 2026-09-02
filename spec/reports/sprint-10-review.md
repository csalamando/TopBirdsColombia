# Sprint 10 — Integración frontend-backend y pruebas E2E

## Rol
`sdlc-frontend-dev-tdd`, `sdlc-backend-dev-tdd`, `technical-writer`

## Objetivo
Integrar el frontend React con el backend FastAPI, validar el contrato OpenAPI con Schemathesis y ejecutar una prueba end-to-end del flujo completo.

## Entregables

| Entregable | Ubicación | Estado |
|---|---|---|
| CORS y static mount en backend | `src/backend/app/main.py` | Completado |
| Proxy `/api` en Vite | `src/frontend/vite.config.ts` | Completado |
| Contract tests contra OpenAPI spec | `src/backend/tests/test_contract.py` | Completado |
| Suite E2E con Playwright | `tests/e2e/` | Completado |
| README del proyecto | `README.md` | Completado |
| Guía de la API | `docs/api-guide.md` | Completado |
| Ajuste `nullable` en `api-contract.yaml` | `spec/api-contract.yaml` | Completado |

## Trazabilidad

- **HU-01 a HU-04**: El flujo Home → Game → Result ahora consume la API real en lugar de MSW.
- **PANT-01 / PANT-02 / PANT-03**: La navegación entre pantallas funciona contra backend real.
- **api-contract.yaml**: Se ajustaron campos opcionales (`familia`, `habitat`, `dieta`, `atribucion`, `imagen_url`) a `nullable: true` para coincidir con el backend.
- **test-plan.md**: Se cubre contract testing y smoke E2E.

## Validación

Backend:

```powershell
cd 'D:\AI Projects\TopBirdsColombia\src\backend'
..\..\.venv\Scripts\python.exe -m pytest -q
```

- **45 tests pasados** (incluye tests unitarios y contract tests).
- **Cobertura: 94.74%**.

Frontend:

```powershell
cd 'D:\AI Projects\TopBirdsColombia\src\frontend'
npm test
npm run build
```

- **40 tests pasados**.
- Build exitoso (`dist/` generado).

End-to-end:

```powershell
cd 'D:\AI Projects\TopBirdsColombia\tests\e2e'
npx playwright test
```

- **1 smoke test pasado**: crea partida, juega una ronda y verifica el resultado.
- La prueba levanta backend (FastAPI) y frontend (Vite dev) automáticamente.

## Notas técnicas

- El backend detecta `src/frontend/dist` y monta la SPA estática en `/`; si no existe, devuelve el mensaje JSON de salud.
- `CORS_ORIGINS` puede configurarse por variable de entorno; por defecto permite `http://localhost:5173`.
- El proxy de Vite reescribe `/api` para eliminar el prefijo antes de reenviar a `localhost:8000`.
- Se creó un paquete npm independiente en `tests/e2e` para no contaminar las dependencias del frontend.

## Deuda técnica

- El flujo E2E es un smoke test; Sprint 11 expandirá los escenarios Gherkin completos.
- No hay pipeline CI/CD aún; se implementará en Sprint 13.

## Próximo paso

Sprint 11 — QA E2E formal y GATE 2.
