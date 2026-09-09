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
| `CHANGELOG.md` | cd6f367a711f | 68 | CHANGELOG de spec — Top Trumps Aves de Colombia |
| `METRICS.md` | 285e8c1cb7f1 | 56 | METRICS — aporte y disciplina de las skills |
| `adr/ADR-001-stack.md` | 197361ab4dd6 | 69 | ADR-001: Selección de stack técnico para Top Trumps Aves de Colombia |
| `api-contract.yaml` | a649d3bdf513 | 441 | openapi: 3.0.3 |
| `architectural-principles.yaml` | 4470fd905987 | 19 | Principios Arquitectónicos — Top Trumps Aves de Colombia |
| `architecture-proposal.md` | e942faa33dcd | 53 | Propuesta de arquitectura — Top Trumps Aves de Colombia |
| `architecture.md` | 80521beddd73 | 54 | Arquitectura de software — Top Trumps Aves de Colombia |
| `authority-matrix.yaml` | ea249b7b2f7f | 70 | Matriz de autoridad — Top Trumps Aves de Colombia |
| `backlog.md` | a856deae07cd | 55 | Backlog — Top Trumps Aves de Colombia |
| `business-rules.md` | 930e252159df | 106 | Reglas de negocio — Top Trumps Aves de Colombia |
| `cost-assumptions.yaml` | 2b31019111f6 | 45 | Supuestos de costos — Top Trumps Aves de Colombia |
| `cost-estimation.md` | 9ad56453aaff | 64 | Estimación de costos — Top Trumps Aves de Colombia |
| `data-governance.md` | a38981f3625d | 48 | Gobierno de datos — Top Trumps Aves de Colombia |
| `data-model.md` | c2e87884c66c | 86 | Modelo de datos — Top Trumps Aves de Colombia |
| `dataset-enrichment.md` | 0b9205742948 | 123 | Propuesta — Enriquecimiento de baraja con topbirds_dataset (Sprint 16) |
| `design-system.md` | c4f05e8f041f | 60 | Design System — Top Trumps Aves de Colombia |
| `diagrams/contenedores.ir.json` | a50f696a09a6 | 78 | { |
| `diagrams/despliegue.ir.json` | 08566244892e | 67 | { |
| `diagrams/flujo-datos.ir.json` | 730dbe587009 | 80 | { |
| `diagrams/pipeline-cicd.md` | 01351e15dc2a | 57 | Pipeline CI/CD (derivado de .github/workflows/) |
| `diagrams/secuencia-ronda.ir.json` | ab36d73a84d6 | 31 | { |
| `epics.md` | 2ac87fddfdb1 | 54 | Épicas — Top Trumps Aves de Colombia |
| `glossary.md` | d2f10ce59bfe | 51 | Glosario — Top Trumps Aves de Colombia |
| `impact-report.md` | e0c5c24512a0 | 37 | Impact Report — Sprint 15 (primera medición post-lanzamiento demo) |
| `pipeline-state.md` | 250df7b257c2 | 83 | Fase actual |
| `portal/registry.json` | 5c42a71515bf | 684 | { |
| `qa-report.md` | d845f334af1e | 105 | QA Report — Sprint 11: E2E formal y GATE 2 |
| `reports/sprint-10-review.md` | bff01bd5e7c8 | 76 | Sprint 10 — Integración frontend-backend y pruebas E2E |
| `reports/sprint-11-review.md` | 88ee6d05e471 | 86 | Sprint 11 — QA E2E formal y GATE 2 |
| `reports/sprint-12-review.md` | 8981f3a49d93 | 118 | Sprint 12 — SAST/SCA/DAST y GATE 2.5 |
| `reports/sprint-13-review.md` | e3646f693452 | 109 | Sprint 13 — Pipeline CI/CD e infraestructura demo |
| `reports/sprint-5-review.md` | d9b33fe32023 | 53 | Sprint 5 — Backend base TDD (modelos y /health) |
| `reports/sprint-6-review.md` | 36436aac002f | 58 | Sprint 6 — Backend TDD: lógica completa del juego y endpoints de partida |
| `reports/sprint-7-review.md` | 82b32bcafe69 | 55 | Sprint 7 — Backend TDD: SQLite seed y persistencia de datos |
| `reports/sprint-8-review.md` | ef7e4538c235 | 59 | Sprint 8 — Frontend TDD: design system y componentes base |
| `reports/sprint-9-review.md` | 2be81e5df8f6 | 59 | Sprint 9 — Frontend TDD: pantallas y flujo de juego |
| `reports/sprint-review-14.md` | a5f2b6180e74 | 125 | Sprint Review — Sprint 14 |
| `reports/sprint-review-17.md` | 6354af59aab8 | 141 | Sprint Review — Sprint 17 |
| `roles.md` | 7c5e7bc04b30 | 26 | Catálogo de roles — Top Trumps Aves de Colombia |
| `security-requirements.md` | 4892e2b8761b | 44 | Requisitos de seguridad — Top Trumps Aves de Colombia |
| `security-scan-report.md` | b3ebc028f6fb | 167 | Informe de escaneos de seguridad — Sprint 12 |
| `slo.md` | 2bc8154eb876 | 45 | SLOs y Error Budgets |
| `team-roster.yaml` | 263ca7c135ee | 6 | Roster del equipo — Top Trumps Aves de Colombia |
| `tech-radar.yaml` | 914c6393dc9c | 28 | Tech Radar — Top Trumps Aves de Colombia |
| `technical-stories.md` | 28273285edd2 | 51 | Historias técnicas — Top Trumps Aves de Colombia |
| `test-plan.md` | 2ec8de824e56 | 65 | Plan de pruebas — Top Trumps Aves de Colombia |
| `threat-model.md` | 88bbaa2526ea | 42 | Threat model — Top Trumps Aves de Colombia |
| `tokens.json` | 7b47df7b8e19 | 55 | { |
| `user-stories.md` | 1f4b0a9bb9c2 | 485 | Historias de usuario — Top Trumps Aves de Colombia |
| `ux-flows.md` | cc3d60bf659d | 46 | Flujos de usuario — Top Trumps Aves de Colombia |
| `ux/screen-inventory.md` | 633d1d5aa7dc | 55 | Inventario de pantallas — Top Trumps Aves de Colombia |
| `vision.md` | 1886a64466f8 | 40 | Visión de producto — Top Trumps Aves de Colombia |

Memorias: 7 en `spec/memory/entries/` (buscar con `mem.py search --brief`).
Recibos: 48 en `spec/receipts/` (ver `receipt.py status`).
