---
id: MEM-20260908-006
type: learning
project: TopBirdsColombia
created: 2026-09-08T18:13:58
session: SES-20260908-181342
tags: [sprint-17,fase-8,learning,harness,metricas]
links: [SPEC/REPORTS/SPRINT-REVIEW-17.MD,SPEC/METRICS.MD]
supersedes: []
topic_key: s17-fase8-senales
---
# S17 cierre: senales del arnes en Fase 8

**What**: Sprint review 17 generado (spec/reports/sprint-review-17.md) con METRICS.md embebido: 45 activaciones, 43 recibos, gates al primer intento 100% salvo product-owner (75%, 1 rechazo). Cobertura por fases OK en 0/2/4/6; fases 3/5/-1 sin actividad registrada en el periodo; product-owner aparece como adorno en fases 1 y 7 (se activo sin producir artefacto con recibo). 5 candidatos FTS de memoria resueltos (2 supersedes, 3 unrelated).

**Why**: Institucionalizar la retroalimentacion de mejora al cerrar el ciclo SDD; las senales accionables deben alimentar el grooming de skills antes del proximo sprint.

**Where**: spec/reports/sprint-review-17.md; spec/METRICS.md; spec/metrics/usage.jsonl

**Key details**: -

**Learned**: Accionables: (1) revisar SKILL.md/gate de product-owner por el rechazo repetido; (2) registrar activaciones con skill_metrics.py use al inicio de cada fase para evitar adorno/falso freestyle en el cruce (receipt.py emit ya auto-registra como respaldo); (3) fases 3/5/-1 sin actividad son de bajo volumen, no brechas; (4) en Windows PowerShell evitar one-liners con comillas anidadas para python -c (cuelgan el shell); (5) sprint_review.py requiere PYTHONUTF8=1 en Windows porque el hijo hereda la consola cp1252.
