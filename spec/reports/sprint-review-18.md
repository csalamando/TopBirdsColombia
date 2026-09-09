# Sprint Review — Sprint 18

Generado: 2026-09-08 | Periodo (recibos): 2026-09-08 → 2026-09-08
Cifras acumuladas al cierre del sprint (los recibos no llevan etiqueta de sprint);
la tendencia de la seccion 5 compara estos snapshots entre sprints.

<!-- KPIs para tendencia (no borrar, los lee sprint_review.py) -->
<!-- Artefactos aprobados: 47 -->
<!-- Gates al primer intento: 100% -->
<!-- Roles en freestyle: 0 -->
<!-- Tokens totales: 7,988 -->

## 1. Resumen ejecutivo

- Artefactos aprobados (recibos vigentes): **47**
- Gates al primer intento: **100%** (48 intentos / 47 recibos)
- Trabajo rehecho (recibos invalidados/revocados): **0**
- Activaciones de skills: **62** | Roles en freestyle: **0**
- Tokens: 0 reportados + 7,988 estimados (cobertura medida: **0%** de los recibos)
- Memorias learning acumuladas: **5**

## 2. Avance del proyecto

| Gate | Artefactos vigentes | Rehechos |
|---|---|---|
| FASE-2 | 1 | 0 |
| FASE-7 | 2 | 0 |
| GATE 1 | 4 | 0 |
| GATE 3 | 1 | 0 |
| GATE-0 | 6 | 0 |
| GATE-1 | 19 | 0 |
| GATE-2 | 1 | 0 |
| GATE-2.5 | 1 | 0 |
| GATE-3 | 1 | 0 |
| SPRINT-10 | 1 | 0 |
| SPRINT-11 | 1 | 0 |
| SPRINT-12 | 1 | 0 |
| SPRINT-13 | 2 | 0 |
| SPRINT-17 | 1 | 0 |
| SPRINT-5 | 1 | 0 |
| SPRINT-6 | 1 | 0 |
| SPRINT-7 | 1 | 0 |
| SPRINT-8 | 1 | 0 |
| SPRINT-9 | 1 | 0 |

> Recibos rehechos = aprobaciones que se invalidaron o revocaron (cambio de spec,
> trabajo devuelto por un gate). Un numero creciente indica gates debiles o
> change-requests frecuentes — revisar causas en la retro.

## 3. Desempeno del arnes (metricas de skills)


Generado: 2026-09-08T21:38:31 — activaciones: 62, recibos: 47.
Digest informativo: NO se inyecta en paquetes de contexto; consultar bajo demanda
(el orquestador lo genera en Fase 8 y guarda las señales como memoria `learning`).

## 1. Aporte por skill

| Skill | Activaciones | Artefactos | Gates 1er intento | Tokens |
|---|---|---|---|---|
| backend-dev | 2 | 3 | 100% | - |
| backend-dev-tdd | 1 | 0 | - | - |
| business-analyst | 7 | 4 | 100% | 907 est. |
| cloud-engineer | 3 | 1 | 100% | - |
| cloud-pricing | 2 | 2 | 100% | 669 est. |
| data-engineer | 6 | 2 | 100% | - |
| devops-engineer | 2 | 2 | 100% | - |
| diagrams | 1 | 0 | - | - |
| enterprise-architect | 2 | 2 | 100% | 365 est. |
| frontend-dev | 2 | 3 | 100% | - |
| frontend-dev-tdd | 2 | 0 | - | - |
| orchestrator | 5 | 3 | 100% | - |
| product-analyst | 2 | 1 | 100% | - |
| product-owner | 7 | 3 | 75% | 1,198 est. |
| qa-automation | 1 | 3 | 100% | - |
| security-engineer | 2 | 3 | 100% | 547 est. |
| software-architect | 6 | 8 | 100% | 2,134 est. |
| solution-architect | 2 | 2 | 100% | 1,351 est. |
| sre | 2 | 1 | 100% | - |
| ux-designer | 5 | 4 | 100% | 817 est. |

## 2. Cobertura: trabajo a traves de las skills o freestyle?

Cruza fases con recibos emitidos contra las activaciones registradas.

| Fase | Roles esperados | Activados | Artefactos con recibo | Diagnostico |
|---|---|---|---|---|
| 0 | product-owner, business-analyst, solution-architect, cloud-pricing | cloud-pricing, product-owner, solution-architect | cloud-pricing, product-owner, solution-architect | OK |
| 1 | business-analyst | business-analyst, product-owner | business-analyst | adorno: product-owner se activo sin producir |
| 2 | ux-designer, software-architect, security-engineer | data-engineer, enterprise-architect, security-engineer, software-architect, ux-designer | data-engineer, enterprise-architect, security-engineer, software-architect, ux-designer | OK |
| 3 | software-architect | orchestrator, software-architect | orchestrator | adorno: software-architect se activo sin producir |
| 4 | backend-dev, frontend-dev | backend-dev, backend-dev-tdd, frontend-dev, frontend-dev-tdd | backend-dev, frontend-dev | adorno: backend-dev-tdd, frontend-dev-tdd se activo sin producir |
| 5 | qa-automation | - | - | sin actividad |
| 6 | devops-engineer, cloud-engineer | cloud-engineer, devops-engineer, orchestrator | cloud-engineer, devops-engineer | OK |
| 7 | sre, product-analyst | product-analyst, product-owner, sre | product-analyst, sre | adorno: product-owner se activo sin producir |
| 8 | - | diagrams, orchestrator | - | OK |
| ? | - | backend-dev, business-analyst, cloud-engineer, cloud-pricing, data-engineer, devops-engineer, enterprise-architect, frontend-dev, orchestrator, product-analyst, product-owner, qa-automation, security-engineer, software-architect, solution-architect, sre, ux-designer | qa-automation | adorno: backend-dev, business-analyst, cloud-engineer, cloud-pricing, data-engineer, devops-engineer, enterprise-architect, frontend-dev, product-analyst, product-owner, security-engineer, software-architect, solution-architect, sre, ux-designer se activo sin producir |
| -1 | devops-engineer | - | - | sin actividad |

## 3. Senales

- **product-owner**: 1 rechazo(s) de gate — revisar su SKILL.md/plantillas o el gate que falla.
- **diagrams**: se activo 1 vez/veces pero no tiene artefactos con recibo — verificar que este entregando en `spec/` y no trabajando fuera de la spec.
- **frontend-dev-tdd**: se activo 2 vez/veces pero no tiene artefactos con recibo — verificar que este entregando en `spec/` y no trabajando fuera de la spec.
- **backend-dev-tdd**: se activo 1 vez/veces pero no tiene artefactos con recibo — verificar que este entregando en `spec/` y no trabajando fuera de la spec.

## 4. Tiempos del pipeline (lead time por gate)

| Gate | Primer recibo | Ultimo recibo | Recibos | Span |
|---|---|---|---|---|
| FASE-2 | 2026-09-08 | 2026-09-08 | 1 | 0:00:00 |
| FASE-7 | 2026-09-08 | 2026-09-08 | 2 | 0:00:00 |
| GATE 1 | 2026-09-08 | 2026-09-08 | 4 | 0:00:00 |
| GATE 3 | 2026-09-08 | 2026-09-08 | 1 | 0:00:00 |
| GATE-0 | 2026-09-08 | 2026-09-08 | 6 | 0:00:04 |
| GATE-1 | 2026-09-08 | 2026-09-08 | 19 | 10:55:18 |
| GATE-2 | 2026-09-08 | 2026-09-08 | 1 | 0:00:00 |
| GATE-2.5 | 2026-09-08 | 2026-09-08 | 1 | 0:00:00 |
| GATE-3 | 2026-09-08 | 2026-09-08 | 1 | 0:00:00 |
| SPRINT-10 | 2026-09-08 | 2026-09-08 | 1 | 0:00:00 |
| SPRINT-11 | 2026-09-08 | 2026-09-08 | 1 | 0:00:00 |
| SPRINT-12 | 2026-09-08 | 2026-09-08 | 1 | 0:00:00 |
| SPRINT-13 | 2026-09-08 | 2026-09-08 | 2 | 0:00:01 |
| SPRINT-17 | 2026-09-08 | 2026-09-08 | 1 | 0:00:00 |
| SPRINT-5 | 2026-09-08 | 2026-09-08 | 1 | 0:00:00 |
| SPRINT-6 | 2026-09-08 | 2026-09-08 | 1 | 0:00:00 |
| SPRINT-7 | 2026-09-08 | 2026-09-08 | 1 | 0:00:00 |
| SPRINT-8 | 2026-09-08 | 2026-09-08 | 1 | 0:00:00 |
| SPRINT-9 | 2026-09-08 | 2026-09-08 | 1 | 0:00:00 |

## 5. Tendencia vs sprint anterior

Comparativa con `sprint-review-17.md`:

| KPI | Sprint anterior | Este sprint |
|---|---|---|
| Artefactos aprobados | 42 | 47 |
| Gates al primer intento | 100% | 100% |
| Roles en freestyle | 0 | 0 |
| Tokens totales | 8,992 | 7,988 |

## 6. Aprendizajes y acciones

- Memorias `learning` guardadas este sprint: revisar con `mem.py search learning --brief`.
- Acciones propuestas (derivadas de la seccion 3 — senales):
  - Skills con rechazos repetidos → ajustar su SKILL.md/plantillas o el gate que falla.
  - Costo por artefacto alto → aplicar contexto minimo (INDEX.md, code_intel, mem --brief).
  - Freestyle detectado → reforzar `skill_metrics.py use` antes de activar cada rol.
- Impacto de negocio: ver `spec/impact-report.md` (product-analyst), si aplica.
