# CHANGELOG de spec — Top Trumps Aves de Colombia

Registro de cambios de spec gestionados por el orquestador (relaciones supersedes / conflicts_with).

## 2026-09-08 — Sprint 16: dataset enriquecido y HU-09 selección de baraja

- **Motivo**: la métrica E2 de `spec/vision.md` (≥50 aves) estaba en rojo (6/50). El usuario curó el dataset completo (`topbirds_dataset/aves_colombia_toptrumps_enriquecido.json`, 303 especies con atributos de juego completos) y aprobó la mecánica de selección de baraja por partida (aleatoria temática por defecto / Colombia completa / expedición por región).
- **Artefactos modificados**: `spec/user-stories.md` (HU-09 con 5 escenarios Gherkin), `spec/api-contract.yaml` (`GET /barajas`, campo `baraja` en `CreatePartidaRequest`/`Partida`, 422 documentado en creación de partida), `spec/dataset-enrichment.md` (v2: plan de curación §2.4 marcado obsoleto-ejecutado, dinámicas aprobadas/diferidas), `spec/backlog.md` (S16-BE-04 y S16-DE-02 → Completado). Recibos SHA-256 re-emitidos (business-analyst, software-architect, data-engineer, product-owner).
- **Implementación (TDD, orden test→feat verificado)**: `scripts/build_baraja.py` genera `src/backend/app/data/barajas.json` (52 cartas: 13 amenazadas UICN, prioriza 146 dimórficas, tope 12/región, rareza ×2 a escala 1-10, atribución fotógrafo+licencia por carta; barajas: completa 52, andina 24, caribe 22, pacífico 11, amazonía 19, orinoquía 18). Backend: módulo `app/barajas.py`, `GET /barajas`, `POST /partidas` con `baraja`, validación en schema pydantic (422 `HTTPValidationError`, exigido por Schemathesis). Frontend: selector de baraja en Home con estados de carga/error.
- **Datos**: JSON enriquecido versionado en repo (S16-DE-02); imágenes crudas (147 MB) quedan fuera, thumbnails pendientes. `.gitignore` con excepción para `src/backend/app/data/*.json`.
- **Impacto downstream**: portal regenerado sin drift; memoria `MEM-20260908-002`. Suites verdes (pytest 95.5 % cov, vitest 45/45, build OK).
- **Pendiente Sprint 16**: S16-FE-05 (instrumentación analítica), thumbnails de imágenes, mecánicas diferidas sujetas a PO (ronda bono dimorfismo, toggle macho/hembra).

## 2026-09-05 — Plataforma de despliegue: Render → Railway (supersedes)

- **Relación**: `infra/render.yaml` → `railway.toml` (**supersedes**). Solicitado y aprobado por el usuario.
- **Motivo**: cambio de plataforma de despliegue del backend para Sprint 14.
- **Artefactos modificados**: `railway.toml` (nuevo, config-as-code en raíz del repo), `README.md` (sección de despliegue), `spec/cost-estimation.md` (GATE-0 re-pasado, recibo re-emitido), `spec/cost-assumptions.yaml`, `spec/pipeline-state.md`.
- **Impacto downstream** (spec_diff_impact): `diagrams` → diagrama de despliegue regenerado como `spec/diagrams/despliegue.drawio` desde la nueva fuente (`iac_to_diagram.py --railway`), check sin drift. Recibo GATE-3 pendiente de aprobación humana (rol cloud-engineer).
- **Sin cambios**: ADR-001 (stack FastAPI + React SPA + SQLite + GitHub Pages) y resto de la spec.
- **Nota de costo**: Railway no tiene free tier permanente; 0 USD/mes con crédito trial de $5, luego ~5 USD/mes (Hobby). Render free tier queda como alternativa documentada.

## 2026-09-05 (2) — Migración a Railway IaC: railway.toml → .railway/railway.ts (supersedes)

- **Relación**: `railway.toml` → `.railway/railway.ts` (**supersedes**).
- **Motivo**: Railway deprecó config-as-code (`railway.toml`); el builder Railpack lo ignoró y los deploys fallaron ("could not determine how to build the app"). El config-as-code deja de funcionar el 2026-12-01.
- **Cambios**: nuevo `.railway/railway.ts` (servicio `TopBirdsColombia`, source GitHub, health check `/health`, env vars `PORT`/`DATABASE_URL`/`CORS_ORIGINS`); SDK `railway` en `package.json` (requerido para `railway config plan/apply`); `railway.toml` eliminado por `railway config migrate --apply --delete-files`. El `dockerfilePath` no es expresable en el DSL: queda como configuración del servicio, anotado en el propio `.railway/railway.ts` (`// dockerfile: src/backend/Dockerfile`) para el derivador de diagramas.
- **Impacto downstream**: `diagrams` → regenerado desde `.railway/railway.ts` (`iac_to_diagram.py --railway` ahora soporta TOML y TS); recibo GATE-3 re-emitido.
- **Notas operativas**: workaround Windows — exportar `$env:_` al `railway.exe` nativo antes de `railway config plan/apply` (bug del SDK al verificar la versión del CLI).
