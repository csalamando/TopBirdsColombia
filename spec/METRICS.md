# METRICS — aporte y disciplina de las skills

Generado: 2026-09-08T20:39:21 — activaciones: 53, recibos: 47.
Digest informativo: NO se inyecta en paquetes de contexto; consultar bajo demanda
(el orquestador lo genera en Fase 8 y guarda las señales como memoria `learning`).

## 1. Aporte por skill

| Skill | Activaciones | Artefactos | Gates 1er intento | Tokens |
|---|---|---|---|---|
| backend-dev | 2 | 3 | 100% | - |
| business-analyst | 6 | 4 | 100% | 907 est. |
| cloud-engineer | 3 | 1 | 100% | - |
| cloud-pricing | 2 | 2 | 100% | 669 est. |
| data-engineer | 5 | 2 | 100% | - |
| devops-engineer | 2 | 2 | 100% | - |
| diagrams | 1 | 0 | - | - |
| enterprise-architect | 2 | 2 | 100% | 365 est. |
| frontend-dev | 2 | 3 | 100% | - |
| frontend-dev-tdd | 1 | 0 | - | - |
| orchestrator | 4 | 3 | 100% | - |
| product-analyst | 2 | 1 | 100% | - |
| product-owner | 5 | 3 | 75% | 1,198 est. |
| qa-automation | 1 | 3 | 100% | - |
| security-engineer | 2 | 3 | 100% | 547 est. |
| software-architect | 5 | 8 | 100% | 2,134 est. |
| solution-architect | 2 | 2 | 100% | 1,351 est. |
| sre | 2 | 1 | 100% | - |
| ux-designer | 4 | 4 | 100% | 817 est. |

## 2. Cobertura: trabajo a traves de las skills o freestyle?

Cruza fases con recibos emitidos contra las activaciones registradas.

| Fase | Roles esperados | Activados | Artefactos con recibo | Diagnostico |
|---|---|---|---|---|
| 0 | product-owner, business-analyst, solution-architect, cloud-pricing | cloud-pricing, product-owner, solution-architect | cloud-pricing, product-owner, solution-architect | OK |
| 1 | business-analyst | business-analyst, product-owner | business-analyst | adorno: product-owner se activo sin producir |
| 2 | ux-designer, software-architect, security-engineer | data-engineer, enterprise-architect, security-engineer, software-architect, ux-designer | data-engineer, enterprise-architect, security-engineer, software-architect, ux-designer | OK |
| 3 | software-architect | orchestrator, software-architect | orchestrator | adorno: software-architect se activo sin producir |
| 4 | backend-dev, frontend-dev | backend-dev, frontend-dev, frontend-dev-tdd | backend-dev, frontend-dev | adorno: frontend-dev-tdd se activo sin producir |
| 5 | qa-automation | - | - | sin actividad |
| 6 | devops-engineer, cloud-engineer | cloud-engineer, devops-engineer, orchestrator | cloud-engineer, devops-engineer | OK |
| 7 | sre, product-analyst | product-analyst, product-owner, sre | product-analyst, sre | adorno: product-owner se activo sin producir |
| 8 | - | diagrams, orchestrator | - | OK |
| ? | - | backend-dev, business-analyst, cloud-engineer, cloud-pricing, data-engineer, devops-engineer, enterprise-architect, frontend-dev, orchestrator, product-analyst, product-owner, qa-automation, security-engineer, software-architect, solution-architect, sre, ux-designer | qa-automation | adorno: backend-dev, business-analyst, cloud-engineer, cloud-pricing, data-engineer, devops-engineer, enterprise-architect, frontend-dev, product-analyst, product-owner, security-engineer, software-architect, solution-architect, sre, ux-designer se activo sin producir |
| -1 | devops-engineer | - | - | sin actividad |

## 3. Senales

- **product-owner**: 1 rechazo(s) de gate — revisar su SKILL.md/plantillas o el gate que falla.
- **diagrams**: se activo 1 vez/veces pero no tiene artefactos con recibo — verificar que este entregando en `spec/` y no trabajando fuera de la spec.
- **frontend-dev-tdd**: se activo 1 vez/veces pero no tiene artefactos con recibo — verificar que este entregando en `spec/` y no trabajando fuera de la spec.
