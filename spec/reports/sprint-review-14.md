# Sprint Review — Sprint 14

Generado: 2026-09-04 | Periodo (recibos): 2026-09-01 → 2026-09-04
Cifras acumuladas al cierre del sprint (los recibos no llevan etiqueta de sprint);
la tendencia de la seccion 5 compara estos snapshots entre sprints.

<!-- KPIs para tendencia (no borrar, los lee sprint_review.py) -->
<!-- Artefactos aprobados: 39 -->
<!-- Gates al primer intento: 100% -->
<!-- Roles en freestyle: 4 -->
<!-- Tokens totales: 12,283 -->

## 1. Resumen ejecutivo

- Artefactos aprobados (recibos vigentes): **39**
- Gates al primer intento: **100%** (40 intentos / 39 recibos)
- Trabajo rehecho (recibos invalidados/revocados): **0**
- Activaciones de skills: **11** | Roles en freestyle: **4** (backend-dev, frontend-dev, orchestrator, qa-automation)
- Tokens: 0 reportados + 12,283 estimados (cobertura medida: **0%** de los recibos)
- Memorias learning acumuladas: **0**

## 2. Avance del proyecto

| Gate | Artefactos vigentes | Rehechos |
|---|---|---|
| GATE-0 | 6 | 0 |
| GATE-1 | 19 | 0 |
| GATE-2 | 1 | 0 |
| GATE-2.5 | 1 | 0 |
| GATE-3 | 1 | 0 |
| SPRINT-10 | 1 | 0 |
| SPRINT-11 | 1 | 0 |
| SPRINT-12 | 1 | 0 |
| SPRINT-13 | 3 | 0 |
| SPRINT-5 | 1 | 0 |
| SPRINT-6 | 1 | 0 |
| SPRINT-7 | 1 | 0 |
| SPRINT-8 | 1 | 0 |
| SPRINT-9 | 1 | 0 |

> Recibos rehechos = aprobaciones que se invalidaron o revocaron (cambio de spec,
> trabajo devuelto por un gate). Un numero creciente indica gates debiles o
> change-requests frecuentes — revisar causas en la retro.

## 3. Desempeno del arnes (metricas de skills)


Generado: 2026-09-04T22:37:50 — activaciones: 11, recibos: 39.
Digest informativo: NO se inyecta en paquetes de contexto; consultar bajo demanda
(el orquestador lo genera en Fase 8 y guarda las señales como memoria `learning`).

## 1. Aporte por skill

| Skill | Activaciones | Artefactos | Gates 1er intento | Tokens |
|---|---|---|---|---|
| backend-dev | 0 | 3 | 100% | - |
| business-analyst | 1 | 4 | 100% | 2,777 est. |
| cloud-engineer | 1 | 1 | 100% | 492 est. |
| cloud-pricing | 1 | 2 | 100% | 669 est. |
| data-engineer | 1 | 1 | 100% | 460 est. |
| devops-engineer | 1 | 1 | 100% | - |
| enterprise-architect | 1 | 2 | 100% | 365 est. |
| frontend-dev | 0 | 3 | 100% | - |
| orchestrator | 0 | 2 | 100% | - |
| product-owner | 1 | 3 | 75% | 1,198 est. |
| qa-automation | 0 | 3 | 100% | - |
| security-engineer | 1 | 3 | 100% | 547 est. |
| software-architect | 1 | 5 | 100% | 2,675 est. |
| solution-architect | 1 | 2 | 100% | 1,351 est. |
| ux-designer | 1 | 4 | 100% | 1,749 est. |

## 2. Cobertura: trabajo a traves de las skills o freestyle?

Cruza fases con recibos emitidos contra las activaciones registradas.

| Fase | Roles esperados | Activados | Artefactos con recibo | Diagnostico |
|---|---|---|---|---|
| 0 | product-owner, business-analyst, solution-architect, cloud-pricing | cloud-pricing, product-owner, solution-architect | cloud-pricing, product-owner, solution-architect | OK |
| 1 | business-analyst | business-analyst | business-analyst | OK |
| 2 | ux-designer, software-architect, security-engineer | data-engineer, enterprise-architect, security-engineer, software-architect, ux-designer | data-engineer, enterprise-architect, security-engineer, software-architect, ux-designer | OK |
| 3 | software-architect | - | - | sin actividad |
| 4 | backend-dev, frontend-dev | - | - | sin actividad |
| 5 | qa-automation | - | - | sin actividad |
| 6 | devops-engineer, cloud-engineer | cloud-engineer, devops-engineer | cloud-engineer, devops-engineer | OK |
| 7 | sre, product-analyst | - | - | sin actividad |
| ? | - | - | backend-dev, frontend-dev, orchestrator, qa-automation | FREESTYLE: backend-dev, frontend-dev, orchestrator, qa-automation produjo sin activarse |
| -1 | devops-engineer | - | - | sin actividad |

## 3. Senales

- **DISCIPLINA**: 4 rol(es) produjeron artefactos sin registrar activacion — el agente esta trabajando sin pasar por la skill. Reforzar en el orquestador: `skill_metrics.py use` ANTES de activar cada rol.
- **product-owner**: 1 rechazo(s) de gate — revisar su SKILL.md/plantillas o el gate que falla.

## 4. Tiempos del pipeline (lead time por gate)

| Gate | Primer recibo | Ultimo recibo | Recibos | Span |
|---|---|---|---|---|
| GATE-0 | 2026-09-01 | 2026-09-04 | 6 | 3 days, 1:07:48 |
| GATE-1 | 2026-09-02 | 2026-09-04 | 19 | 2 days, 15:23:46 |
| GATE-2 | 2026-09-02 | 2026-09-02 | 1 | 0:00:00 |
| GATE-2.5 | 2026-09-02 | 2026-09-02 | 1 | 0:00:00 |
| GATE-3 | 2026-09-04 | 2026-09-04 | 1 | 0:00:00 |
| SPRINT-10 | 2026-09-02 | 2026-09-02 | 1 | 0:00:00 |
| SPRINT-11 | 2026-09-02 | 2026-09-02 | 1 | 0:00:00 |
| SPRINT-12 | 2026-09-02 | 2026-09-02 | 1 | 0:00:00 |
| SPRINT-13 | 2026-09-02 | 2026-09-04 | 3 | 2 days, 3:22:47 |
| SPRINT-5 | 2026-09-02 | 2026-09-02 | 1 | 0:00:00 |
| SPRINT-6 | 2026-09-02 | 2026-09-02 | 1 | 0:00:00 |
| SPRINT-7 | 2026-09-02 | 2026-09-02 | 1 | 0:00:00 |
| SPRINT-8 | 2026-09-02 | 2026-09-02 | 1 | 0:00:00 |
| SPRINT-9 | 2026-09-02 | 2026-09-02 | 1 | 0:00:00 |

## 5. Tendencia vs sprint anterior

Primer sprint con review — la tendencia se calcula desde el proximo.

## 6. Aprendizajes y acciones

- Memorias `learning` guardadas este sprint: revisar con `mem.py search learning --brief`.
- Acciones propuestas (derivadas de la seccion 3 — senales):
  - Skills con rechazos repetidos → ajustar su SKILL.md/plantillas o el gate que falla.
  - Costo por artefacto alto → aplicar contexto minimo (INDEX.md, code_intel, mem --brief).
  - Freestyle detectado → reforzar `skill_metrics.py use` antes de activar cada rol.
- Impacto de negocio: ver `spec/impact-report.md` (product-analyst), si aplica.
