# Sprint 6 — Backend TDD: lógica completa del juego y endpoints de partida

## Rol
`sdlc-backend-dev-tdd`

## Objetivo
Completar Fase 4 (Build / TDD) implementando los endpoints de aves y partidas, la lógica de rondas y las reglas de negocio del juego Top Trumps, con cobertura de tests y contract testing.

## Entregables

| Entregable | Ubicación | Estado |
|---|---|---|
| Esquemas de API extendidos | `src/backend/app/schemas.py` | Completado |
| Repositorio en memoria (aves y partidas) | `src/backend/app/repository.py` | Completado |
| Seed inicial de aves | `src/backend/app/seed.py` | Completado |
| Inyección de dependencias | `src/backend/app/dependencies.py` | Completado |
| Endpoints `/aves` y `/aves/{ave_id}` | `src/backend/app/routers/aves.py` | Completado |
| Endpoints `/partidas`, `/partidas/{partida_id}`, `/partidas/{partida_id}/rondas` | `src/backend/app/routers/partidas.py` | Completado |
| Wireado de routers en `main.py` | `src/backend/app/main.py` | Completado |
| Tests unitarios de endpoints y modelos | `src/backend/tests/test_aves.py`, `test_partidas.py`, `test_models.py` | Completado |
| Tests de contrato con schemathesis | `src/backend/tests/test_contract.py` | Completado |

## Trazabilidad

- **HU-01** (Iniciar partida contra la IA): `POST /partidas` con modo `ia` o `hotseat`.
- **HU-02** (Seleccionar atributo): `POST /partidas/{id}/rondas` con validación de atributo.
- **HU-03** (Resolver ronda con empate): pila de reserva en `models.py` y acumulación de cartas.
- **HU-04** (Determinar ganador): `Game._resolve_end()` y campo `ganador_partida` en `RondaResult`.
- **BR-01** a **BR-09**: ejercidos en `tests/test_models.py` y `tests/test_partidas.py`.

## Validación

```powershell
cd 'D:\AI Projects\TopBirdsColombia'
.venv\Scripts\python.exe -m pytest src\backend -v
```

Resultado:
- **34 tests pasados** (3 contrato + 15 modelos + 1 health + 8 aves + 7 partidas).
- **Cobertura: 95%** (umbral 70% alcanzado).
- Contract testing con schemathesis sobre `/health`, `/aves`, `/partidas` y sub-recursos sin violaciones.

## Notas técnicas

- Se documentaron los códigos de estado `404` (recurso no encontrado) y `409` (partida finalizada) en los routers para que schemathesis los considere válidos.
- Se mantiene `force_schema_version="30"` porque FastAPI emite OpenAPI 3.1.0 y schemathesis 3.25.3 requiere OpenAPI 3.0.x.
- El repositorio de partidas es en memoria; la persistencia en SQLite se abordará en Sprint 7.
- Con solo 6 cartas semilla y un atributo fijo, el juego puede entrar en ciclos de empate; los tests validan estado consistente en lugar de forzar terminación en un número fijo de rondas.

## Deuda técnica

- Persistencia en SQLite y seed más amplio quedan para Sprint 7.
- Frontend aún no implementado (Sprint 8 en adelante).

## Próximo paso

Sprint 7 — Backend TDD: SQLite seed y persistencia de datos.
