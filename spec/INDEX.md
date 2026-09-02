# INDEX — digest de la spec

Lectura de orientacion: este digest resume cada artefacto. Abre solo el que necesites;
antes de consumirlo downstream verifica su recibo (`receipt.py verify`) — el hash aqui
debe coincidir con el recibo ACTIVE.

Como leer este repo (para cualquier agente, con o sin el arnes instalado):
- `spec/` es la fuente de verdad: no improvises artefactos fuera de esta estructura.
- Toda aprobacion es un recibo SHA-256 en `spec/receipts/`; si el hash no coincide,
  el artefacto cambio y el gate debe re-ejecutarse.
- Si existe `.codeintel/index.db`, consulta simbolos (`code_intel.py context/impact/tests`)
  en vez de leer archivos de codigo completos.
- Las memorias explican el POR QUE de las decisiones; busca con `mem.py search --brief`
  y abre solo la relevante con `mem.py get <id>`.

| Artefacto | sha256[:12] | lineas | resumen |
|---|---|---|---|
| `adr/ADR-001-stack.md` | 197361ab4dd6 | 69 | ADR-001: Selección de stack técnico para Top Trumps Aves de Colombia |
| `api-contract.yaml` | cd616549ef64 | 304 | openapi: 3.0.3 |
| `architectural-principles.yaml` | 4470fd905987 | 19 | Principios Arquitectónicos — Top Trumps Aves de Colombia |
| `architecture-proposal.md` | e942faa33dcd | 53 | Propuesta de arquitectura — Top Trumps Aves de Colombia |
| `architecture.md` | 80521beddd73 | 54 | Arquitectura de software — Top Trumps Aves de Colombia |
| `authority-matrix.yaml` | 8ef9c76e59d2 | 62 | Matriz de autoridad — Top Trumps Aves de Colombia |
| `backlog.md` | 54dc670834c0 | 40 | Backlog — Top Trumps Aves de Colombia |
| `business-rules.md` | 6c4b4bdf8673 | 47 | Reglas de negocio — Top Trumps Aves de Colombia |
| `cost-assumptions.yaml` | 922985f19fa1 | 45 | Supuestos de costos — Top Trumps Aves de Colombia |
| `cost-estimation.md` | 0d3071ff7191 | 63 | Estimación de costos — Top Trumps Aves de Colombia |
| `data-governance.md` | 0c85fe903284 | 43 | Gobierno de datos — Top Trumps Aves de Colombia |
| `data-model.md` | c2e87884c66c | 86 | Modelo de datos — Top Trumps Aves de Colombia |
| `design-system.md` | c4f05e8f041f | 60 | Design System — Top Trumps Aves de Colombia |
| `epics.md` | 2ac87fddfdb1 | 54 | Épicas — Top Trumps Aves de Colombia |
| `glossary.md` | d2f10ce59bfe | 51 | Glosario — Top Trumps Aves de Colombia |
| `pipeline-state.md` | c7fb5ce6e450 | 71 | Estado del pipeline SDLC — Top Trumps Aves de Colombia |
| `qa-report.md` | d845f334af1e | 105 | QA Report — Sprint 11: E2E formal y GATE 2 |
| `reports/sprint-10-review.md` | bff01bd5e7c8 | 76 | Sprint 10 — Integración frontend-backend y pruebas E2E |
| `reports/sprint-11-review.md` | 88ee6d05e471 | 86 | Sprint 11 — QA E2E formal y GATE 2 |
| `reports/sprint-5-review.md` | d9b33fe32023 | 53 | Sprint 5 — Backend base TDD (modelos y /health) |
| `reports/sprint-6-review.md` | 36436aac002f | 58 | Sprint 6 — Backend TDD: lógica completa del juego y endpoints de partida |
| `reports/sprint-7-review.md` | 82b32bcafe69 | 55 | Sprint 7 — Backend TDD: SQLite seed y persistencia de datos |
| `reports/sprint-8-review.md` | ef7e4538c235 | 59 | Sprint 8 — Frontend TDD: design system y componentes base |
| `reports/sprint-9-review.md` | 2be81e5df8f6 | 59 | Sprint 9 — Frontend TDD: pantallas y flujo de juego |
| `roles.md` | 7c5e7bc04b30 | 26 | Catálogo de roles — Top Trumps Aves de Colombia |
| `security-requirements.md` | 2f8a74a7b447 | 38 | Requisitos de seguridad — Top Trumps Aves de Colombia |
| `team-roster.yaml` | 263ca7c135ee | 6 | Roster del equipo — Top Trumps Aves de Colombia |
| `tech-radar.yaml` | 914c6393dc9c | 28 | Tech Radar — Top Trumps Aves de Colombia |
| `technical-stories.md` | 28273285edd2 | 51 | Historias técnicas — Top Trumps Aves de Colombia |
| `test-plan.md` | 423b613283b9 | 56 | Plan de pruebas — Top Trumps Aves de Colombia |
| `threat-model.md` | 88bbaa2526ea | 42 | Threat model — Top Trumps Aves de Colombia |
| `tokens.json` | 7b47df7b8e19 | 55 | { |
| `user-stories.md` | 8e1479e9c893 | 145 | Historias de usuario — Top Trumps Aves de Colombia |
| `ux-flows.md` | fd2e3dca6c82 | 43 | Flujos de usuario — Top Trumps Aves de Colombia |
| `ux/screen-inventory.md` | 83affc1cea15 | 39 | Inventario de pantallas — Top Trumps Aves de Colombia |
| `vision.md` | 1886a64466f8 | 40 | Visión de producto — Top Trumps Aves de Colombia |

Memorias: 0 en `spec/memory/entries/` (buscar con `mem.py search --brief`).
Recibos: 36 en `spec/receipts/` (ver `receipt.py status`).
