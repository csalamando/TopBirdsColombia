# METRICS — aporte y disciplina de las skills

Generado: 2026-09-04T22:38:03 — activaciones: 13, recibos: 39.
Digest informativo: NO se inyecta en paquetes de contexto; consultar bajo demanda
(el orquestador lo genera en Fase 8 y guarda las señales como memoria `learning`).

## 1. Aporte por skill

| Skill | Activaciones | Artefactos | Gates 1er intento | Tokens |
|---|---|---|---|---|
| backend-dev | 0 | 3 | 100% | - |
| business-analyst | 1 | 4 | 100% | 2,777 est. |
| cloud-engineer | 2 | 1 | 100% | 492 est. |
| cloud-pricing | 1 | 2 | 100% | 669 est. |
| data-engineer | 1 | 1 | 100% | 460 est. |
| devops-engineer | 1 | 1 | 100% | - |
| enterprise-architect | 1 | 2 | 100% | 365 est. |
| frontend-dev | 0 | 3 | 100% | - |
| orchestrator | 1 | 2 | 100% | - |
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
| 6 | devops-engineer, cloud-engineer | cloud-engineer, devops-engineer, orchestrator | cloud-engineer, devops-engineer, orchestrator | OK |
| 7 | sre, product-analyst | - | - | sin actividad |
| ? | - | - | backend-dev, frontend-dev, qa-automation | FREESTYLE: backend-dev, frontend-dev, qa-automation produjo sin activarse |
| -1 | devops-engineer | - | - | sin actividad |

## 3. Senales

- **DISCIPLINA**: 3 rol(es) produjeron artefactos sin registrar activacion — el agente esta trabajando sin pasar por la skill. Reforzar en el orquestador: `skill_metrics.py use` ANTES de activar cada rol.
- **product-owner**: 1 rechazo(s) de gate — revisar su SKILL.md/plantillas o el gate que falla.
