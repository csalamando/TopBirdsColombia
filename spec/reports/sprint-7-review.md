# Sprint 7 — Backend TDD: SQLite seed y persistencia de datos

## Rol
`sdlc-backend-dev-tdd` + `sdlc-data-engineer`

## Objetivo
Agregar persistencia SQLite para las aves del juego, reemplazar el repositorio en memoria por uno basado en base de datos, mantener migraciones versionadas y un seed condicional.

## Entregables

| Entregable | Ubicación | Estado |
|---|---|---|
| Conexión y migraciones SQLite | `src/backend/app/database.py`, `src/backend/app/migrations/001_initial.sql` | Completado |
| Repositorio de aves con SQLite | `src/backend/app/repository.py` | Completado |
| Inicialización lazy y seed condicional | `src/backend/app/dependencies.py` | Completado |
| Configuración de tests en memoria | `src/backend/tests/conftest.py` | Completado |
| Tests TDD de base de datos | `src/backend/tests/test_database.py` | Completado |

## Trazabilidad

- **HU-01** (Iniciar partida contra la IA): las cartas ahora se cargan desde SQLite.
- **BR-01** (Atributos numéricos): persistencia JSON de atributos con validación en deserialización.
- **BR-06** (Seed inicial): carga condicional de aves si la tabla está vacía.
- **ADR-001**: stack FastAPI + SQLite confirmado.

## Validación

```powershell
cd 'D:\AI Projects\TopBirdsColombia'
.venv\Scripts\python.exe -m pytest src\backend -v
```

Resultado:
- **39 tests pasados** (3 contrato + 15 modelos + 1 health + 8 aves + 7 partidas + 5 base de datos).
- **Cobertura: 95.24%** (umbral 70% alcanzado).
- Contract testing con schemathesis sobre `/health`, `/aves`, `/partidas` y sub-recursos sin violaciones.

## Notas técnicas

- Se usa `sqlite3` del estándar de Python para evitar dependencias extra.
- La ruta de la base de datos es configurable mediante la variable de entorno `DATABASE_URL`; por defecto se usa `data/topbirds.db`.
- Los tests usan `:memory:` mediante `tests/conftest.py` para mantener el aislamiento.
- El seed es idempotente: solo inserta datos si `AveRepository.count() == 0`.
- Se manejó el caso de IDs extremadamente grandes generados por schemathesis, devolviendo `None` y dejando que el router responda `404`.
- `GameRepository` permanece en memoria porque las partidas son volátiles por diseño del MVP.

## Deuda técnica

- Las partidas no se persisten; se mantienen en memoria.
- No se implementó Alembic; las migraciones son scripts SQL ejecutados en orden lexicográfico.

## Próximo paso

Sprint 8 — Frontend TDD: design system y componentes base.
