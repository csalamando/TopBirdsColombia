# Backlog — Top Trumps Aves de Colombia

## Resumen de priorización
Este backlog prioriza los ítems del MVP usando MoSCoW y RICE. La métrica de éxito principal del primer trimestre es completar las historias Must have dentro de los 15 sprints con todos los gates aprobados.

## Sprints asignados
| ID | Ítem | Épica | Prioridad | Sprint | Estado |
|---|---|---|---|---|---|---|
| S1-PO-01 | Definir visión de producto | EP-04 | Must have | 1 | Completado |
| S1-PO-02 | Definir épicas y métricas de éxito | EP-04 | Must have | 1 | Completado |
| S1-PO-03 | Crear backlog priorizado inicial | EP-04 | Must have | 1 | Completado |
| S1-SA-01 | Propuesta de arquitectura con opciones | EP-04 | Must have | 1 | Completado |
| S1-SA-02 | Historias técnicas iniciales | EP-04 | Must have | 1 | Completado |
| S1-CP-01 | Estimación CAPEX/OPEX/TCO | EP-04 | Must have | 1 | Completado |
| S2-BA-01 | Historias de usuario con Gherkin | EP-01 | Must have | 2 | Completado |
| S2-BA-02 | Reglas de negocio del juego | EP-01 | Must have | 2 | Completado |
| S2-BA-03 | Catálogo de roles gobernado | EP-04 | Must have | 2 | Completado |
| S3-UX-01 | Flujos de usuario y prototipo | EP-03 | Must have | 3 | Completado |
| S3-UX-02 | Design system y tokens | EP-03 | Must have | 3 | Completado |
| S3-SA-01 | Arquitectura de componentes y ADR | EP-04 | Must have | 3 | Completado |
| S3-SA-02 | Contrato OpenAPI y modelo de datos | EP-01 | Must have | 3 | Completado |
| S3-SE-01 | Threat model y requisitos de seguridad | EP-04 | Must have | 3 | Completado |
| S3-DE-01 | Gobierno de datos y migraciones | EP-02 | Must have | 3 | Completado |
| S4-SA-01 | Consolidar spec para GATE 1 | EP-04 | Must have | 4 | Completado |
| S5-BE-01 | Modelos de carta y baraja (TDD) | EP-01 | Must have | 5 | Completado |
| S6-BE-02 | Lógica de ronda y partida (TDD) | EP-01 | Must have | 6 | Completado |
| S7-BE-03 | Datos de aves y seed (TDD) | EP-02 | Must have | 7 | Completado |
| S8-FE-01 | Design system y componentes base (TDD) | EP-03 | Must have | 8 | Completado |
| S9-FE-02 | Pantallas y flujo de juego (TDD) | EP-03 | Must have | 9 | Completado |
| S10-TW-01 | Integración, contract testing y docs | EP-04 | Should have | 10 | Completado |
| S11-QA-01 | Tests E2E desde Gherkin | EP-01 | Must have | 11 | Completado |
| S12-SE-02 | SAST/SCA/DAST y GATE 2.5 | EP-04 | Must have | 12 | Completado |
| S13-DO-01 | Pipeline CI/CD e infraestructura demo | EP-05 | Should have | 13 | Completado |
| S14-DO-02 | Despliegue a producción/demo | EP-05 | Should have | 14 | Completado |
| S15-PA-01 | SLOs, impact report y sprint review | EP-04 | Must have | 15 | Completado |
| S16-BE-04 | Cargar baraja ≥50 aves desde topbirds_dataset (TDD, atribución por carta) | EP-02 | Must have | 16 | Completado |
| S16-DE-02 | Versionar topbirds_dataset bajo data-governance (decidir imágenes en repo vs storage) | EP-02 | Must have | 16 | Completado |
| S16-FE-05 | Instrumentación analítica mínima (partida iniciada/ronda/partida completada, sin PII) | EP-04 | Should have | 16 | Pendiente |
| S17-DE-01 | Generar thumbnails webp (~200px) desde topbirds_dataset a src/frontend/public/cards/ y poblar variantes_imagen[].thumbnail_url | EP-02 | Must have | 17 | Completado |
| S17-BE-01 | Extender cartas con datos enriquecidos (variantes, UICN, endemismo, orden, nombres EN, altitud) y bono dimorfismo en rondas (TDD, HU-10/11/14) | EP-01 | Must have | 17 | Completado |
| S17-FE-01 | Carta con toggle macho/hembra, badge dimórfica, sello UICN y badge visitante boreal (TDD, HU-10/12/15) | EP-01 | Must have | 17 | Completado |
| S17-FE-02 | Detalle de ave enriquecido lado a lado con atribución por foto (TDD, PANT-05) | EP-02 | Must have | 17 | Completado |
| S17-FE-03 | Pantalla resumen "Tu expedición" en resultado (TDD, HU-13) | EP-02 | Should have | 17 | Completado |
| S17-BE-02 | Ronda especial de altitud y combo taxonómico (TDD, RN-11/12, HU-14/16) | EP-01 | Should have | 17 | Completado |
| S17-FE-04 | Modo "Ornitólogo" quiz de identificación con 4 opciones (TDD, HU-17) | EP-02 | Should have | 17 | Completado |
| S17-BA-01 | Decisión PO: regla de empate con ave amenazada (RN-15) y modo temporada boreal (RN-13) | EP-01 | Could have | 17 | Pendiente |
| S18-UX-01 | Inputs de nombre y trazabilidad visible de jugadores (TDD, HU-18, RN-17) | EP-01 | Must have | 18 | Completado |
| S18-UX-02 | Presentación visual: imágenes 4:3, panel de resultado con color, copy sin códigos internos, detalle con foto (TDD, HU-19, RN-18) | EP-03 | Must have | 18 | Completado |
| S18-DE-03 | Restaurar imágenes de las cartas en calidad original del dataset (copia sin pérdida JPG, supersedes thumbnails webp de S17-DE-01, TDD, HU-20, RN-19) | EP-02 | Must have | 18 | Completado |
| S18-UX-03 | Selector de baraja con tarjetas e imagen representativa por baraja (TDD, HU-09 esc. 6, RN-20) | EP-03 | Must have | 18 | Completado |
| S19-AR-01 | Revisar fix propuesto al arnés (harness-sdlc, NO aplicado): `sprint_review_sprints()` en `harness_graph.py` — contar ambas convenciones de sprint review (`sprint-N-review.md` narrativos S5-S13 + `sprint-review-NN.md` snapshots) para `contadores.sprints` y `loops_count 4->4`, sin tocar `parse_reviews` (tendencias). Incluye cobertura nueva en `tests/self_test.py` (139 checks OK). Efecto: portal pasa de 5 a 14 "Sprints completados". Diff: working tree de harness-sdlc (sin commit). NOTA: el portal vigente (commit 2bc8b3b) se generó con el patch aplicado; regenerar con arnés 2.20.1 pristino revierte el contador a 5 hasta integrar y versionar el fix (p. ej. v2.20.2). Ver MEM-20260908-009 | EP-04 | Should have | 19 | Pendiente |

## Notas
- El backlog se refinará en cada sprint.
- Las historias técnicas se desglosarán en el Sprint 1.
