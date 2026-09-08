# Sprint Review — Sprint 17

Generado: 2026-09-08 | Periodo (recibos): 2026-09-08 → 2026-09-08
Cifras acumuladas al cierre del sprint (los recibos no llevan etiqueta de sprint);
la tendencia de la seccion 5 compara estos snapshots entre sprints.

<!-- KPIs para tendencia (no borrar, los lee sprint_review.py) -->
<!-- Artefactos aprobados: 42 -->
<!-- Gates al primer intento: 100% -->
<!-- Roles en freestyle: 0 -->
<!-- Tokens totales: 8,992 -->

## 1. Resumen ejecutivo

- Artefactos aprobados (recibos vigentes): **42**
- Gates al primer intento: **100%** (43 intentos / 42 recibos)
- Trabajo rehecho (recibos invalidados/revocados): **0**
- Activaciones de skills: **45** | Roles en freestyle: **0**
- Tokens: 0 reportados + 8,992 estimados (cobertura medida: **0%** de los recibos)
- Memorias learning acumuladas: **2**

## 2. Avance del proyecto

| Gate | Artefactos vigentes | Rehechos |
|---|---|---|
| FASE-1 | 3 | 0 |
| FASE-2 | 3 | 0 |
| FASE-3 | 1 | 0 |
| FASE-7 | 2 | 0 |
| GATE-0 | 6 | 0 |
| GATE-1 | 14 | 0 |
| GATE-2 | 1 | 0 |
| GATE-2.5 | 1 | 0 |
| GATE-3 | 1 | 0 |
| SPRINT-10 | 1 | 0 |
| SPRINT-11 | 1 | 0 |
| SPRINT-12 | 1 | 0 |
| SPRINT-13 | 2 | 0 |
| SPRINT-5 | 1 | 0 |
| SPRINT-6 | 1 | 0 |
| SPRINT-7 | 1 | 0 |
| SPRINT-8 | 1 | 0 |
| SPRINT-9 | 1 | 0 |

> Recibos rehechos = aprobaciones que se invalidaron o revocaron (cambio de spec,
> trabajo devuelto por un gate). Un numero creciente indica gates debiles o
> change-requests frecuentes — revisar causas en la retro.

## 3. Desempeno del arnes (metricas de skills)


Generado: 2026-09-08T18:12:31 — activaciones: 45, recibos: 42.
Digest informativo: NO se inyecta en paquetes de contexto; consultar bajo demanda
(el orquestador lo genera en Fase 8 y guarda las señales como memoria `learning`).

## 1. Aporte por skill

| Skill | Activaciones | Artefactos | Gates 1er intento | Tokens |
|---|---|---|---|---|
| backend-dev | 2 | 3 | 100% | - |
| business-analyst | 5 | 4 | 100% | 907 est. |
| cloud-engineer | 3 | 1 | 100% | - |
| cloud-pricing | 2 | 2 | 100% | 669 est. |
| data-engineer | 5 | 2 | 100% | - |
| devops-engineer | 2 | 1 | 100% | - |
| enterprise-architect | 2 | 2 | 100% | 365 est. |
| frontend-dev | 2 | 3 | 100% | - |
| orchestrator | 2 | 2 | 100% | - |
| product-analyst | 2 | 1 | 100% | - |
| product-owner | 4 | 3 | 75% | 1,198 est. |
| qa-automation | 1 | 3 | 100% | - |
| security-engineer | 2 | 3 | 100% | 547 est. |
| software-architect | 4 | 5 | 100% | 2,675 est. |
| solution-architect | 2 | 2 | 100% | 1,351 est. |
| sre | 2 | 1 | 100% | - |
| ux-designer | 3 | 4 | 100% | 1,280 est. |

## 2. Cobertura: trabajo a traves de las skills o freestyle?

Cruza fases con recibos emitidos contra las activaciones registradas.

| Fase | Roles esperados | Activados | Artefactos con recibo | Diagnostico |
|---|---|---|---|---|
| 0 | product-owner, business-analyst, solution-architect, cloud-pricing | cloud-pricing, product-owner, solution-architect | cloud-pricing, product-owner, solution-architect | OK |
| 1 | business-analyst | business-analyst, product-owner | business-analyst | adorno: product-owner se activo sin producir |
| 2 | ux-designer, software-architect, security-engineer | data-engineer, enterprise-architect, security-engineer, software-architect, ux-designer | data-engineer, enterprise-architect, security-engineer, software-architect, ux-designer | OK |
| 3 | software-architect | - | - | sin actividad |
| 4 | backend-dev, frontend-dev | backend-dev, frontend-dev | backend-dev, frontend-dev | OK |
| 5 | qa-automation | - | - | sin actividad |
| 6 | devops-engineer, cloud-engineer | cloud-engineer, devops-engineer, orchestrator | cloud-engineer, devops-engineer, orchestrator | OK |
| 7 | sre, product-analyst | product-analyst, product-owner, sre | product-analyst, sre | adorno: product-owner se activo sin producir |
| ? | - | backend-dev, business-analyst, cloud-engineer, cloud-pricing, data-engineer, devops-engineer, enterprise-architect, frontend-dev, orchestrator, product-analyst, product-owner, qa-automation, security-engineer, software-architect, solution-architect, sre, ux-designer | qa-automation | adorno: backend-dev, business-analyst, cloud-engineer, cloud-pricing, data-engineer, devops-engineer, enterprise-architect, frontend-dev, product-analyst, product-owner, security-engineer, software-architect, solution-architect, sre, ux-designer se activo sin producir |
| -1 | devops-engineer | - | - | sin actividad |

## 3. Senales

- **product-owner**: 1 rechazo(s) de gate — revisar su SKILL.md/plantillas o el gate que falla.

## 4. Tiempos del pipeline (lead time por gate)

| Gate | Primer recibo | Ultimo recibo | Recibos | Span |
|---|---|---|---|---|
| FASE-1 | 2026-09-08 | 2026-09-08 | 3 | 0:00:01 |
| FASE-2 | 2026-09-08 | 2026-09-08 | 3 | 0:00:01 |
| FASE-3 | 2026-09-08 | 2026-09-08 | 1 | 0:00:00 |
| FASE-7 | 2026-09-08 | 2026-09-08 | 2 | 0:00:00 |
| GATE-0 | 2026-09-08 | 2026-09-08 | 6 | 0:00:04 |
| GATE-1 | 2026-09-08 | 2026-09-08 | 14 | 0:00:05 |
| GATE-2 | 2026-09-08 | 2026-09-08 | 1 | 0:00:00 |
| GATE-2.5 | 2026-09-08 | 2026-09-08 | 1 | 0:00:00 |
| GATE-3 | 2026-09-08 | 2026-09-08 | 1 | 0:00:00 |
| SPRINT-10 | 2026-09-08 | 2026-09-08 | 1 | 0:00:00 |
| SPRINT-11 | 2026-09-08 | 2026-09-08 | 1 | 0:00:00 |
| SPRINT-12 | 2026-09-08 | 2026-09-08 | 1 | 0:00:00 |
| SPRINT-13 | 2026-09-08 | 2026-09-08 | 2 | 0:00:01 |
| SPRINT-5 | 2026-09-08 | 2026-09-08 | 1 | 0:00:00 |
| SPRINT-6 | 2026-09-08 | 2026-09-08 | 1 | 0:00:00 |
| SPRINT-7 | 2026-09-08 | 2026-09-08 | 1 | 0:00:00 |
| SPRINT-8 | 2026-09-08 | 2026-09-08 | 1 | 0:00:00 |
| SPRINT-9 | 2026-09-08 | 2026-09-08 | 1 | 0:00:00 |

## 5. Tendencia vs sprint anterior

Comparativa con `sprint-review-14.md`:

| KPI | Sprint anterior | Este sprint |
|---|---|---|
| Artefactos aprobados | 39 | 42 |
| Gates al primer intento | 100% | 100% |
| Roles en freestyle | 4 | 0 |
| Tokens totales | 12,283 | 8,992 |

## 6. Aprendizajes y acciones

- Memorias `learning` guardadas este sprint: revisar con `mem.py search learning --brief`.
- Acciones propuestas (derivadas de la seccion 3 — senales):
  - Skills con rechazos repetidos → ajustar su SKILL.md/plantillas o el gate que falla.
  - Costo por artefacto alto → aplicar contexto minimo (INDEX.md, code_intel, mem --brief).
  - Freestyle detectado → reforzar `skill_metrics.py use` antes de activar cada rol.
- Impacto de negocio: ver `spec/impact-report.md` (product-analyst), si aplica.
