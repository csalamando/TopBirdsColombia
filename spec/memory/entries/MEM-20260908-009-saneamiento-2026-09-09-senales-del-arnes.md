---
id: MEM-20260908-009
type: learning
project: scripts
created: 2026-09-08T22:09:27
session: 
tags: [saneamiento,harness,portal,sprint-reviews,leccion]
links: []
supersedes: []
---
# Saneamiento 2026-09-09: senales del arnes desactualizadas y fix de conteo de sprints

**What**: El portal mostraba 'Sprints completados: 5' y el usuario lo leyo como desactualizado ('8/20 sprints'); la causa era doble: (1) parse_reviews de harness_graph solo contaba la convencion sprint-review-NN.md, ignorando los reviews narrativos sprint-N-review.md (S5-S13), y (2) 'fase actual: 6' del portal NO es un bug: es la macro-fase del arnes (6 = Release & Operacion, cubre fases finas 6-8), derivada de gates con recibo vigente, no de pipeline-state.md. El '8/20' es HU cerradas con evidencia test+codigo (12 brechas son artefacto de nomenclatura).

**Why**: Cerrar sprint sin actualizar backlog.md y pipeline-state.md deja el portal contradictorio con la realidad; ademas una migracion de convencion de nombres (sprint-N-review.md -> sprint-review-NN.md) rompio el conteo sin invalidar recibos.

**Where**: harness_graph.py derive_project: nuevo helper sprint_review_sprints() cuenta ambas convenciones para contadores.sprints y loops_count 4->4; parse_reviews sigue estricto para tendencias. self_test.py: cobertura de la convencion narrativa.

**Key details**: -

**Learned**: Al cerrar sprint: actualizar backlog + pipeline-state ANTES de regenerar el portal, y verificar los KPIs visibles del portal (sprints, fase, HU). Ante dos convenciones de nombres de un mismo artefacto, el derivador debe aceptar ambas o el conteo miente. pipeline-state.md 'Fase actual' ahora aclara macro-fase vs fase fina para no contradecir el portal.
