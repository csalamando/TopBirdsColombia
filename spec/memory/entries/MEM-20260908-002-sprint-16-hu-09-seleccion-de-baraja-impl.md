---
id: MEM-20260908-002
type: decision
project: TopBirdsColombia
created: 2026-09-08T15:31:43
session: 
tags: [sprint-16,hu-09,baraja,dataset]
links: [SPEC/USER-STORIES.MD,SPEC/DATASET-ENRICHMENT.MD,SPEC/BACKLOG.MD]
supersedes: []
---
# Sprint 16: HU-09 seleccion de baraja implementada

**What**: HU-09 (seleccion de baraja al iniciar partida) implementada con TDD: docs -> test red -> feat green, orden verificado. Baraja de 52 cartas generada por scripts/build_baraja.py desde el dataset enriquecido del usuario (13 amenazadas UICN, prioriza 146 dimorficas, balance por region, rareza x2) en src/backend/app/data/barajas.json versionado. Backend: GET /barajas y POST /partidas con baraja (aleatoria|completa|region); validacion en schema pydantic porque schemathesis exige 422 con shape HTTPValidationError. Frontend: selector en Home con Aleatoria por defecto, Colombia completa y Expedicion por region con conteo; estados de carga y error. Backlog: S16-BE-04 y S16-DE-02 completados. Suites verdes: pytest 95.5% cov, vitest 45/45, build OK; portal regenerado; dev SQLite reseteada para reseed de 52 cartas.

**Why**: Sprint 16 reanudado tras enriquecimiento del dataset (303 especies, atributos completos); E2 de vision.md (>=50 aves) queda resuelto con baraja real y atribucion legal por carta.

**Where**: scripts/build_baraja.py; src/backend/app/barajas.py; src/backend/app/data/barajas.json; src/backend/app/routers/partidas.py; src/frontend/src/screens/Home.tsx

**Key details**: -

**Learned**: -
