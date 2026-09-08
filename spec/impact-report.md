# Impact Report — Sprint 15 (primera medición post-lanzamiento demo)

Fecha: 2026-09-08 | Período medido: lanzamiento demo (Sprint 14, 2026-09-01 → 2026-09-08) | Ref: `spec/vision.md` §Métricas de éxito por épica

## Resultados vs metas (ref: vision.md)

| Métrica (épica) | Línea base | Meta | Resultado | Veredicto |
|---|---|---|---|---|
| E1 Juego jugable: historias MVP verificadas E2E | 0 | 100% HU MVP E2E | 10/10 escenarios, 60 steps, todos verdes (GATE 2, `spec/qa-report.md`) | ✅ Cumple |
| E2 Datos de aves: aves cargadas con atribución | 0 | ≥50 aves | **6 aves** en producción (`src/backend/app/seed.py`); dataset nuevo WIP con 303 aves y 452 imágenes en `topbirds_dataset/` (sin versionar) | ❌ No cumple |
| E3 Experiencia visual: prototipo aprobado antes de implementar frontend | 0 | Prototipo aprobado por negocio | Inventario PANT + flujos UX con recibo vigente (GATE 1, `spec/ux/`) | ✅ Cumple |
| E4 Calidad técnica: cobertura ≥70%, cero vulns críticas/alta | 0 | ≥70% y 0 críticas/altas | Cobertura backend 94.74%, 40/40 tests frontend, 0 vulns críticas/altas (GATE 2.5, `spec/security-scan-report.md`) | ✅ Cumple |
| E5 Entrega demo: app desplegada en entorno accesible | 0 | Demo accesible | API desplegada en Railway con health check; GATE 3 aprobado con diagrama de despliegue derivado y recibo vigente | ✅ Cumple |

**Balance: 4/5 metas cumplidas.** El objetivo principal del proyecto (demostrar el arnés SDD+TDD+RDD en 15 sprints con pipeline gobernado) también se cumple: 39 artefactos con recibo vigente, 100% gates al primer intento (Sprint Review 14).

## Análisis

- **E2 es la brecha real.** La meta de ≥50 aves no se cumple en producción (6 aves sembradas). El trabajo de datos avanzó **por fuera del pipeline**: `topbirds_dataset/` (303 aves de iNaturalist, licencias cc0/cc-by, 452 imágenes descargadas) existe solo en el working tree, sin versionar, sin recibo y con solo 6 cartas procesadas a formato de juego (`aves_colombia_cards.json`).
- **Calidad del dato pendiente de verificar**: revisar codificación UTF-8 del dataset procesado (se observaron caracteres corruptos tipo `FrugÃ­voro`) y completar la atribución por carta antes de cargar.
- **Adopción/uso no medible**: no hay analítica de uso instrumentada (no hay eventos de producto). Para un demo de arnés es aceptable, pero cualquier decisión de producto sobre el juego (qué atributos eligen los jugadores, dónde abandonan) hoy sería opinión, no dato.
- Embudos y segmentos: no aplica aún — sin tráfico real medido.

## Hipótesis y recomendaciones

| Hallazgo | Hipótesis | Recomendación al backlog |
|---|---|---|
| E2 no cumple: 6/50 aves | El dataset completo se construyó fuera del arnés (sin historia, sin TDD, sin gobierno de datos) y la carga a producción nunca entró al backlog como item ejecutable | **Sprint 16 · Must have**: item "Cargar baraja ≥50 aves desde `topbirds_dataset`" (EP-02, TDD contra `spec/api-contract.yaml`, validación de `data-governance.md`, con atribución iNaturalist por carta). Primero versionar el dataset |
| Dataset fuera de Git | Captura de datos hecha como script ad-hoc en sesión previa, fuera del pipeline | Versionar `topbirds_dataset/` (o su salida procesada en `src/backend/app/data/`) bajo gobierno del Data Engineer; decidir si las imágenes (452) van al repo o a storage externo |
| Codificación sospechosa en cartas | Export del JSON procesado sin normalizar a UTF-8 | Verificar/ corregir encoding antes del seed; agregar validación de encoding al script de carga |
| Sin analítica de uso | Instrumentación nunca se planeó en Fase 1-2 | **Sprint 16+ · Should have**: eventos mínimos (partida iniciada, ronda jugada, partida completada, consulta de ave) — sin PII, acorde a `spec/security-requirements.md` SR-01 |
| SLOs definidos sin probe externo | No se configuró monitor gratuito | Acción inmediata (sin costo): UptimeRobot sobre `/health` — quedó registrado en `spec/slo.md` §Deuda técnica |

## Entrega al PO

Este reporte es insumo para repriorizar `spec/backlog.md`: E2 pasa a ser el cuello de botella del MVP (una única métrica Must have en rojo). Sugerencia de orden Sprint 16: (1) gobierno + carga del dataset de aves, (2) seed real ≥50, (3) re-verificación E2E de HU-06 con baraja real, (4) instrumentación analítica mínima si queda capacidad.
