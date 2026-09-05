# Estado del pipeline SDLC â€” Top Trumps Aves de Colombia

| Artefacto | Fase | Rol dueÃ±o | Estado | Gate pendiente | Notas |
|---|---|---|---|---|---|
| repo / estructura | -1 | devops-engineer | Completado | â€” | Setup inicial |
| detect_stack.py | -1 | devops-engineer | Completado | â€” | NingÃºn stack aÃºn; se fijarÃ¡ en Sprint 2 |
| spec/estructura | -1 | orchestrator | Completado | â€” | Autoridad, roster, tech-radar, principios, Ã­ndice code_intel |
| vision.md | 0 | product-owner | Completado | GATE 0 | Recibo vigente |
| epics.md | 0 | product-owner | Completado | GATE 0 | Recibo vigente |
| backlog.md | 0 | product-owner | Completado | GATE 0 | Recibo vigente |
| architecture-proposal.md | 0 | solution-architect | Completado | GATE 0 | Recibo vigente; OpciÃ³n A recomendada |
| technical-stories.md | 0 | solution-architect | Completado | GATE 0 | Recibo vigente |
| cost-estimation.md | 0 | cloud-pricing | Completado | GATE 0 | Recibo vigente |
| cost-assumptions.yaml | 0 | cloud-pricing | Completado | GATE 0 | Recibo vigente |

| user-stories.md | 1 | business-analyst | Completado | GATE 1 | Recibo vigente; 8 historias con Gherkin |
| roles.md | 1 | business-analyst | Completado | GATE 1 | Recibo vigente; ROL-01 a ROL-04 |
| business-rules.md | 1 | business-analyst | Completado | GATE 1 | Recibo vigente; 9 reglas de negocio |
| glossary.md | 1 | business-analyst | Completado | GATE 1 | Recibo vigente |

| ux-flows.md | 2 | ux-designer | Completado | GATE 1 | Recibo vigente |
| design-system.md | 2 | ux-designer | Completado | GATE 1 | Recibo vigente |
| tokens.json | 2 | ux-designer | Completado | GATE 1 | Recibo vigente |
| ux/screen-inventory.md | 2 | ux-designer | Completado | GATE 1 | Inventario PANT-01 a PANT-04 |
| architecture.md | 2 | software-architect | Completado | GATE 1 | Recibo vigente |
| api-contract.yaml | 2 | software-architect | Completado | GATE 1 | Recibo vigente |
| data-model.md | 2 | software-architect | Completado | GATE 1 | Recibo vigente |
| test-plan.md | 2 | software-architect | Completado | GATE 1 | Recibo vigente |
| adr/ADR-001-stack.md | 2 | software-architect | Completado | GATE 1 | Firmado (ARCH-001.json) |
| threat-model.md | 2 | security-engineer | Completado | GATE 1 | Recibo vigente |
| security-requirements.md | 2 | security-engineer | Completado | GATE 1 | Recibo vigente |
| data-governance.md | 2 | data-engineer | Completado | GATE 1 | Recibo vigente |
| tech-radar.yaml | 2 | enterprise-architect | Completado | GATE 1 | Recibo vigente |
| architectural-principles.yaml | 2 | enterprise-architect | Completado | GATE 1 | Recibo vigente |

| reports/sprint-5-review.md | 4 | backend-dev | Aprobado | SPRINT-5 | Backend base TDD |
| reports/sprint-6-review.md | 4 | backend-dev | Aprobado | SPRINT-6 | Endpoints de aves y partida |
| reports/sprint-7-review.md | 4 | backend-dev | Aprobado | SPRINT-7 | SQLite seed y persistencia |
|| reports/sprint-8-review.md | 4 | frontend-dev | Aprobado | SPRINT-8 | Frontend design system |
|| reports/sprint-9-review.md | 4 | frontend-dev | Aprobado | SPRINT-9 | Frontend pantallas y flujo |
||| reports/sprint-10-review.md | 4 | frontend-dev | Aprobado | SPRINT-10 | IntegraciÃ³n frontend-backend y E2E |
|||| reports/sprint-11-review.md | 4 | qa-automation | Aprobado | SPRINT-11 | QA E2E formal y GATE 2 |
|||| qa-report.md | 5 | qa-automation | Completado | GATE 2 | Resumen de pruebas E2E, cobertura y veredicto |
||||| reports/sprint-12-review.md | 5 | qa-automation | Aprobado | SPRINT-12 | SAST/SCA/DAST y GATE 2.5 |
||||| security-scan-report.md | 5 | security-engineer | Completado | GATE 2.5 | Hallazgos SAST/SCA/DAST y riesgos aceptados |
||||| reports/sprint-13-review.md | 6 | devops-engineer | Aprobado | SPRINT-13 | Pipeline CI/CD e infraestructura demo |
||||| security-requirements.md | 2 | security-engineer | Completado | GATE 1 | Requisitos SR-03/SR-04/SR-05 cumplidos |

## Fase actual
6 (Entrega / OperaciÃ³n) â€” Sprint 13 completado: pipeline CI/CD, Docker, Render y cierre de requisitos de seguridad

## Riesgo y routing
- Routing orgÃ¡nico: **Discovery â†’ Full-pipeline** (nueva iniciativa, objetivo demostrar arnÃ©s).
- Risk Tier: **Tier 3** confirmado (aplicaciÃ³n de entretenimiento sin PII, pagos ni datos crÃ­ticos).
- Stack aprobado internamente: FastAPI + React SPA + SQLite + GitHub Pages (ADR-001 firmado).

## Notas de sesiÃ³n
- Iniciativa: construir "Top Trumps Aves de Colombia" para demostrar el arnÃ©s SDLC en 15 sprints.
- 7 recibos GATE-0 vigentes; 20 recibos GATE-1 vigentes (roles, user-stories, UX, arquitectura, seguridad, datos, EA, pipeline-state).
- `spec/INDEX.md` regenerado: 28 artefactos.
- ADR-001 firmado por software-architect (ARCH-001.json vigente).
- **GATE 1 aprobado por usuario el 2026-09-02T12:19:59Z** â€” se autoriza Fase 4 (Build / TDD).
- Sprint 5 completado y aprobado (backend base TDD).
- Sprint 6 completado: 34 tests, 95% cobertura, contract testing sin violaciones.
- **Sprint 6 aprobado por usuario el 2026-09-02T16:58:22Z** â€” se autoriza Sprint 7.
- Sprint 7 completado: 39 tests, 95.24% cobertura, SQLite + seed condicional funcionando.
- Sprint 8 completado: 22 tests, 95.45% cobertura, build Vite exitoso.
- **Sprint 8 aprobado por usuario el 2026-09-02T17:29:55Z** â€” se autoriza Sprint 9.
- Sprint 9 completado: 40 tests, 83.67% statements / 81.66% branches / 78.57% functions / 84.82% lines, build Vite exitoso.
- **Sprint 9 aprobado por usuario el 2026-09-02T18:25:55Z** â€” se autoriza Sprint 10.
- Sprint 10 completado: integraciÃ³n frontend-backend, contract testing con Schemathesis, smoke E2E con Playwright verde, README y guÃ­a de API.
- **Sprint 10 aprobado por usuario el 2026-09-02T18:25:55Z** â€” se autoriza Sprint 11.
- **GATE 2 aprobado** â€” Suite E2E formal: 10 escenarios y 60 steps verdes; backend 45 tests con 94.74 % cobertura; frontend 40 tests y build exitoso.
|- **GATE 2.5 aprobado** â€” SAST backend sin hallazgos; SAST frontend con 3 advertencias aceptadas; SCA backend con 10 vulnerabilidades aceptadas por incompatibilidad de dependencias; SCA frontend limpio; DAST con Schemathesis verde (6 operaciones, 82/82 checks).
|- Dependencias actualizadas: `fastapi==0.115.0`, `uvicorn[standard]==0.30.6`, `pydantic==2.9.2`, `click==8.3.3`.
|- **Sprint 13 completado** â€” Pipeline CI/CD en GitHub Actions (`ci.yml`), Dockerfile multi-stage verificado localmente, blueprint `infra/render.yaml`, headers de seguridad y rate limiting implementados, `spec/security-requirements.md` actualizado.
|- Docker local: imagen `topbirds:latest` construye y responde `/health` correctamente.
|- Pipeline CI cubre: SAST backend/frontend, tests, build, E2E, SCA backend/frontend y DAST.
- PrÃ³ximo paso: **Sprint 14** (despliegue a producciÃ³n/demo).
- **Cambio de spec (supersedes) 2026-09-05**: plataforma de despliegue backend Render -> Railway. `infra/render.yaml` retirado (queda en historial git); nuevo config-as-code `railway.toml` en raÃ­z (Dockerfile `src/backend/Dockerfile`, health check `/health`, dominio `*.up.railway.app`). Actualizados `README.md`, `spec/cost-estimation.md` (gate GATE-0 re-pasado, recibo re-emitido) y `spec/cost-assumptions.yaml`. Impacto downstream segÃºn spec_diff_impact: `diagrams`. Stack ADR-001 sin cambios.
- **Sprint 14 (preparaciÃ³n) 2026-09-05**: diagrama de despliegue aceptado con recibo GATE-3 (`spec/receipts/despliegue.drawio.receipt.json`, rol cloud-engineer, aprobaciÃ³n del usuario). **MigraciÃ³n a Railway IaC**: `railway.toml` deprecado por Railway (Railpack lo ignorÃ³ â†’ deploys fallidos); migrado a `.railway/railway.ts` + SDK `railway` en `package.json`; config aplicada al proyecto `incredible-perception` (env vars + health check) vÃ­a `railway config apply`. Diagrama regenerado desde `.railway/railway.ts`, recibo GATE-3 re-emitido. Segunda correccion: Dockerfile canonico movido a la raiz (Railpack seguia fallando al no haber builder Docker configurado en el servicio; Railway auto-detecta el Dockerfile raiz). Imagen validada localmente (`docker build -t topbirds:latest .` + `/health` ok). **Pendiente para GATE 3 completo**: validaciÃ³n de staging post-deploy (health check + smoke) y prueba de rollback (re-deploy de commit anterior).

