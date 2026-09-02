# Sprint 5 — Backend base TDD (modelos y /health)

## Rol
`sdlc-backend-dev-tdd`

## Objetivo
Iniciar Fase 4 (Build / TDD) con los modelos de dominio y el endpoint de salud del backend FastAPI, siguiendo TDD estricto.

## Entregables

| Entregable | Ubicación | Estado |
|---|---|---|
| Modelo de dominio (Card, Deck, Game, RoundResult) | `src/backend/app/models.py` | Completado |
| Endpoint `/health` | `src/backend/app/routers/health.py` | Completado |
| Aplicación FastAPI | `src/backend/app/main.py` | Completado |
| Tests unitarios TDD | `src/backend/tests/test_models.py` | Completado |
| Test de contrato /health | `src/backend/tests/test_contract.py` | Completado |
| Dependencias y config | `src/backend/requirements.txt`, `src/backend/pytest.ini` | Completado |

## Trazabilidad

- **HU-01** (Iniciar partida contra la IA): modelos de partida y reparto equitativo.
- **HU-02** (Seleccionar atributo): `play_round(atributo)` con validación de turno.
- **HU-03** (Resolver ronda con empate): pila de reserva y acumulación.
- **HU-04** (Determinar ganador): `Game._resolve_end()`.
- **BR-01** a **BR-09**: ejercidos en `tests/test_models.py`.

## Validación

```powershell
cd 'D:\AI Projects\TopBirdsColombia'
.venv\Scripts\python.exe -m pytest src\backend -v
```

Resultado:
- **17 tests pasados** (1 contrato + 15 modelos + 1 health).
- **Cobertura: 93.89%** (umbral 70% alcanzado).
- Contract testing con schemathesis sobre `/health` sin violaciones.

## Notas técnicas

- Se forzó `force_schema_version="30"` en schemathesis porque FastAPI genera OpenAPI 3.1.0 y schemathesis 3.25.3 no lo soporta completamente.
- Se fijó `click<8.2` para compatibilidad con schemathesis 3.25.3.

## Deuda técnica

- Endpoints `/aves`, `/partidas` y `/partidas/{id}/rondas` quedan para Sprint 6/7.
- Persistencia en SQLite y seed de aves queda para Sprint 7.

## Próximo paso

Sprint 6 — Backend TDD: lógica completa del juego y endpoints de partida.
