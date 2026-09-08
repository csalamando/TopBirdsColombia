---
id: MEM-20260908-001
type: context
project: TopBirdsColombia
created: 2026-09-08T14:54:00
session: 
tags: []
links: []
supersedes: []
topic_key: sprint16-dataset
---
# Sprint 16 en pausa: usuario enriqueciendo metadata del dataset

**What**: Propuesta aprobada en direccion (spec/dataset-enrichment.md, commit e9a4548): baraja 52 cartas, carta=especie con variantes macho/hembra, thumbnails webp versionados en repo (decision del usuario), detalle educativo con atribucion iNaturalist. El usuario esta enriqueciendo manualmente topbirds_dataset (atributos numericos con fuentes verificables) antes de que se toque codigo.

**Why**: E2 de vision.md sigue en rojo (6/50 aves); el dataset crudo tiene 4/303 especies con atributos completos. La curacion la hace el usuario con fuentes verificables, no aproximaciones.

**Where**: spec/dataset-enrichment.md, topbirds_dataset/, spec/impact-report.md

**Key details**: -

**Learned**: No iniciar implementacion ni curacion de atributos hasta que el usuario confirme el dataset enriquecido. Al retomar: 1) re-ejecutar inventario del dataset, 2) seleccionar 52 especies, 3) TDD backend (variantes, es_dimorfica), 4) thumbnails webp, 5) frontend.
