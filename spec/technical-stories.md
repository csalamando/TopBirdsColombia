# Historias técnicas — Top Trumps Aves de Colombia

## TS-01 Configurar proyecto y test runners
- **Tipo**: enabler
- **Origen**: Fase -1 (setup), requisito para TDD estricto.
- **Descripción**: Como devops-engineer, quiero tener el repositorio configurado con pytest para backend, Vitest para frontend y Playwright para E2E.
- **Criterio de aceptación**: `detect_stack.py` reporta los tres runners; pipeline CI vacío creado.
- **Costo de NO hacerlo**: Fase 4 no puede ejecutar TDD estricto; gates 2 y 2.5 bloquean.

## TS-02 Contrato OpenAPI base
- **Tipo**: enabler
- **Origen**: Fase 2 (software-architect).
- **Descripción**: Como software-architect, quiero definir el contrato OpenAPI para endpoints de partida, cartas y baraja.
- **Criterio de aceptación**: `spec/api-contract.yaml` validado y con recibo GATE-1.
- **Costo de NO hacerlo**: Frontend y backend no pueden trabajar en paralelo; contract testing no es posible.

## TS-03 Modelo de datos y seed de aves
- **Tipo**: enabler
- **Origen**: Fase 2-4 (data-engineer + backend-dev).
- **Descripción**: Como data-engineer, quiero un esquema SQLite versionado y scripts de seed con ≥50 aves de fuentes abiertas.
- **Criterio de aceptación**: migraciones ejecutables; datos anonimizados (no aplica PII); seed idempotente.
- **Costo de NO hacerlo**: El juego no tiene contenido real.

## TS-04 Diseño system y tokens consumibles
- **Tipo**: enabler
- **Origen**: Fase 2 (ux-designer).
- **Descripción**: Como ux-designer, quiero entregar `spec/tokens.json` y `spec/design-system.md` consumibles por el frontend.
- **Criterio de aceptación**: tokens validados por gate; componentes base implementan loading/empty/error.
- **Costo de NO hacerlo**: inconsistencia visual; retrabajo de frontend.

## TS-05 Pipeline CI/CD
- **Tipo**: enabler
- **Origen**: Fase 6 (devops-engineer).
- **Descripción**: Como devops-engineer, quiero un pipeline que corra lint → unit → contract → E2E → build → deploy.
- **Criterio de aceptación**: pipeline verde en demo; rollback documentado.
- **Costo de NO hacerlo**: entrega manual, riesgo de defectos en producción.

## TS-06 Seguridad base
- **Tipo**: nfr
- **Origen**: Fase 2 (security-engineer).
- **Descripción**: Como security-engineer, quiero un threat model y requisitos de seguridad que garanticen cero datos sensibles.
- **Criterio de aceptación**: `spec/threat-model.md` y `spec/security-requirements.md` con recibo GATE-1; DAST sin vulns críticas/alta.
- **Costo de NO hacerlo**: riesgo de filtrar datos o exponer APIs.

## TS-07 Observabilidad mínima
- **Tipo**: nfr
- **Origen**: Fase 7 (sre).
- **Descripción**: Como sre, quiero logs estructurados y una métrica de disponibilidad básica para la demo.
- **Criterio de aceptación**: logs configurados; SLO ≥95% uptime demo.
- **Costo de NO hacerlo**: imposible medir salud del sistema.
