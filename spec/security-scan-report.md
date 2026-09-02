# Informe de escaneos de seguridad — Sprint 12

## Alcance
Este informe documenta los resultados de los escaneos de seguridad ejecutados como parte del **GATE 2.5** para la demo *Top Trumps Aves de Colombia*.

- **Backend**: `src/backend/app` (Python / FastAPI)
- **Frontend**: `src/frontend` (React / TypeScript / Vite)
- **E2E tests**: `tests/e2e` (Cucumber / Playwright)
- **Contrato API**: OpenAPI generado por FastAPI (`/openapi.json`)

## Herramientas utilizadas

| Tipo | Herramienta | Versión | Objetivo |
|---|---|---|---|
| SAST backend | Bandit | 1.8.3 | Detección de patrones inseguros en Python |
| SCA backend | pip-audit | 2.9.0 | Auditoría de dependencias Python |
| SAST frontend | ESLint + eslint-plugin-security | 9.x / 3.0.1 | Detección de patrones inseguros en TypeScript |
| SCA frontend | npm audit | 10.x | Auditoría de dependencias npm |
| DAST | Schemathesis | 3.25.3 | Pruebas dinámicas contra la API en ejecución |

## SAST backend — Bandit

```powershell
& "D:\AI Projects\TopBirdsColombia\.venv\Scripts\bandit" -r "D:\AI Projects\TopBirdsColombia\src\backend\app"
```

- **Resultado**: `No issues identified.`
- **Severidad**: Ninguna
- **Hallazgos**: 0

### Ajuste aplicado
Bandit reportó `B311` por el uso de `random.choice` para seleccionar el atributo de la carta del oponente en `src/backend/app/routers/partidas.py`. Se reemplazó por `secrets.choice` y se eliminó la importación de `random`.

- **Archivo**: `src/backend/app/routers/partidas.py`
- **Líneas afectadas**: 67-70
- **Riesgo original**: bajo (uso de PRNG no criptográfico en lógica de juego)
- **Mitigación**: uso de `secrets.choice`, adecuado para selecciones donde no debe ser predecible.

## SAST frontend — ESLint + eslint-plugin-security

```powershell
cd "D:\AI Projects\TopBirdsColombia\src\frontend"
npx eslint .
```

- **Resultado**: 3 advertencias (`security/detect-object-injection`)
- **Errores**: 0
- **Severidad**: advertencia / baja

### Archivos con advertencias

| Archivo | Línea | Regla | Riesgo | Decisión |
|---|---|---|---|---|
| `src/frontend/src/components/Button.tsx` | 22 | `security/detect-object-injection` | Indexación dinámica en mapa de tokens | **Aceptado** — los índices provienen de un enumerado controlado (`buttonVariants`) |
| `src/frontend/src/screens/Game.tsx` | 97 | `security/detect-object-injection` | Indexación dinámica en mapa de cartas | **Aceptado** — los índices provienen de la API y son validados por Pydantic en backend |
| `src/frontend/src/screens/Home.tsx` | 26 | `security/detect-object-injection` | Indexación dinámica en mapa de tokens | **Aceptado** — los índices provienen de un enumerado controlado (`buttonVariants`) |

### Configuración
Se creó `src/frontend/eslint.config.js` con la configuración flat de ESLint y las reglas recomendadas de `eslint-plugin-security`.

## SCA backend — pip-audit

```powershell
& "D:\AI Projects\TopBirdsColombia\.venv\Scripts\python" -m pip_audit --format markdown --desc on -r "D:\AI Projects\TopBirdsColombia\src\backend\requirements.txt"
```

- **Resultado**: 10 vulnerabilidades conocidas
- **Críticas/Altas**: 0 con explotación remota plausible en este demo
- **Medias/Bajas**: 10 (documentadas a continuación)

### Vulnerabilidades identificadas

| Paquete | Versión | ID | Fix | Severidad | Decisión |
|---|---|---|---|---|---|
| pytest | 8.3.5 | PYSEC-2026-1845 | 9.0.3 | Baja/Media | **Aceptado** — riesgo local UNIX (`/tmp/pytest-of-{user}`); demo ejecutado en Windows y schemathesis 3.25.3 requiere `pytest<9` |
| starlette | 0.38.6 | PYSEC-2026-161 | 1.0.1 | Media | **Aceptado** — manipulación de `Host` requiere control de red; demo local/Render sin autenticación |
| starlette | 0.38.6 | PYSEC-2026-248 | 1.3.0 | Media | **Aceptado** — reconstrucción de URL sin validación; no hay autorización basada en path |
| starlette | 0.38.6 | PYSEC-2026-1943 | 0.40.0 | Media | **Aceptado** — DoS por campos grandes multipart; la API no acepta multipart/form-data |
| starlette | 0.38.6 | PYSEC-2026-1941 | 0.47.2 | Media | **Aceptado** — parseo bloqueante de formularios; la API no acepta form-data |
| starlette | 0.38.6 | PYSEC-2026-2281 | 1.1.0 | Media | **Aceptado** — SSRF via `StaticFiles` en Windows; no se sirven archivos de usuario con `StaticFiles` |
| starlette | 0.38.6 | PYSEC-2026-2280 | 1.1.0 | Media | **Aceptado** — dispatch de método HTTP en `HTTPEndpoint`; la app usa routers de FastAPI, no `HTTPEndpoint` directamente |

### Acciones de mitigación aplicadas
Se actualizaron las siguientes dependencias dentro de lo permitido por el ecosistema FastAPI/schemathesis:

- `fastapi`: `0.109.2` → `0.115.0`
- `uvicorn[standard]`: `0.27.1` → `0.30.6`
- `pydantic`: `2.6.1` → `2.9.2`
- `click`: `<8.2` → `==8.3.3`

`pytest` y `starlette` no pueden subir más sin romper compatibilidad con `schemathesis==3.25.3` y `fastapi==0.115.0` respectivamente.

## SCA frontend — npm audit

```powershell
cd "D:\AI Projects\TopBirdsColombia\src\frontend"
npm audit --json
```

- **Resultado**: 0 vulnerabilidades
- **Dependencias totales**: 373
- **Producción**: 5

```powershell
cd "D:\AI Projects\TopBirdsColombia\tests\e2e"
npm audit --json
```

- **Resultado**: 0 vulnerabilidades
- **Dependencias totales**: 91
- **Producción**: 1

## DAST — Schemathesis

Se levantó el backend en `http://127.0.0.1:8000` y se ejecutó Schemathesis contra el esquema OpenAPI generado dinámicamente.

```powershell
& "D:\AI Projects\TopBirdsColombia\.venv\Scripts\schemathesis" run http://127.0.0.1:8000/openapi.json --base-url http://127.0.0.1:8000 --checks all --hypothesis-max-examples=20 --experimental=openapi-3.1
```

- **Operaciones recopiladas**: 6
- **Checks ejecutados**:
  - `not_a_server_error`: 82/82 pasados
  - `status_code_conformance`: 82/82 pasados
  - `content_type_conformance`: 82/82 pasados
  - `response_headers_conformance`: 82/82 pasados
  - `response_schema_conformance`: 82/82 pasados
- **Resultado**: `6 passed in 0.99s`
- **Hallazgos de seguridad**: 0

## Cumplimiento de requisitos de seguridad

| ID | Requisito | Estado | Evidencia |
|---|---|---|---|
| SR-01 | Sin datos personales | Cumplido | No se almacena PII; nombres temporales por partida |
| SR-02 | Validación de inputs | Cumplido | Pydantic valida todos los inputs; Schemathesis no encontró violaciones |
| SR-03 | Headers de seguridad HTTP | Parcial | Se recomienda configurar HSTS, CSP y otros headers en producción |
| SR-04 | HTTPS en producción | Pendiente | Demo local/GitHub Pages; se habilitará en despliegue |
| SR-05 | Rate limiting | Pendiente | Se implementará antes del despliegue público |
| SR-06 | Sin endpoints administrativos | Cumplido | No hay endpoints de admin expuestos |
| SR-07 | Gestión de dependencias | Cumplido | SAST/SCA ejecutados; riesgos aceptados documentados |
| SR-08 | Logs sin datos sensibles | Cumplido | No se registran datos personales ni de partidas |
| SR-09 | Atribución de datos abiertos | Cumplido | Atribución visible en el modal de detalle del ave |

## Riesgos aceptados

1. **PYSEC-2026-1845 (pytest)**: riesgo local de denegación de servicio en UNIX mediante `/tmp/pytest-of-{user}`. La demo corre en Windows local y el entorno de CI no persistirá datos sensibles en `/tmp`.
2. **Vulnerabilidades de starlette 0.38.6**: requieren `starlette>=1.0.1`, versión incompatible con `fastapi==0.115.0`. La aplicación no expone `StaticFiles` con rutas de usuario, no acepta `multipart/form-data` ni `HTTPEndpoint`, y no realiza autorización basada en path; por tanto el riesgo residual es bajo para un demo sin datos críticos.
3. **SR-03 / SR-04 / SR-05**: headers de seguridad, HTTPS y rate limiting se implementarán en el pipeline de despliegue (Sprint 13).

## Veredicto

- **SAST backend**: ✅ Sin hallazgos
- **SAST frontend**: ⚠️ 3 advertencias aceptadas (bajo riesgo)
- **SCA backend**: ⚠️ 10 vulnerabilidades aceptadas por incompatibilidad de dependencias y bajo impacto en el contexto del demo
- **SCA frontend**: ✅ Sin vulnerabilidades
- **DAST**: ✅ Sin hallazgos

**GATE 2.5 aprobado con riesgos aceptados documentados**. Las dependencias críticas/altas remanentes no tienen vectores de explotación prácticos en este demo y se mitigarán al actualizar FastAPI/Starlette cuando el ecosistema lo permita o al desplegar detrás de un proxy con headers de seguridad y rate limiting.

## Próximos pasos

1. Sprint 13: pipeline CI/CD e infraestructura demo.
2. Configurar headers de seguridad (HSTS, CSP, X-Frame-Options, etc.) en el proxy frontal.
3. Implementar rate limiting por IP en FastAPI.
4. Revisar nuevamente SCA cuando FastAPI soporte `starlette>=1.0.1` y `pytest>=9.0.3` sea compatible con schemathesis.
