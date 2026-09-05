# CHANGELOG de spec — Top Trumps Aves de Colombia

Registro de cambios de spec gestionados por el orquestador (relaciones supersedes / conflicts_with).

## 2026-09-05 — Plataforma de despliegue: Render → Railway (supersedes)

- **Relación**: `infra/render.yaml` → `railway.toml` (**supersedes**). Solicitado y aprobado por el usuario.
- **Motivo**: cambio de plataforma de despliegue del backend para Sprint 14.
- **Artefactos modificados**: `railway.toml` (nuevo, config-as-code en raíz del repo), `README.md` (sección de despliegue), `spec/cost-estimation.md` (GATE-0 re-pasado, recibo re-emitido), `spec/cost-assumptions.yaml`, `spec/pipeline-state.md`.
- **Impacto downstream** (spec_diff_impact): `diagrams` → diagrama de despliegue regenerado como `spec/diagrams/despliegue.drawio` desde la nueva fuente (`iac_to_diagram.py --railway`), check sin drift. Recibo GATE-3 pendiente de aprobación humana (rol cloud-engineer).
- **Sin cambios**: ADR-001 (stack FastAPI + React SPA + SQLite + GitHub Pages) y resto de la spec.
- **Nota de costo**: Railway no tiene free tier permanente; 0 USD/mes con crédito trial de $5, luego ~5 USD/mes (Hobby). Render free tier queda como alternativa documentada.
