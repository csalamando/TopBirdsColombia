---
id: MEM-20260908-004
type: decision
project: TopBirdsColombia
created: 2026-09-08T16:17:24
session: 
tags: [s17,hu-10,hu-17,rn-10,rn-11,rn-12,rn-14,tdd,thumbnails,pillow]
links: [SPEC/CHANGELOG.MD:2026-09-08(3); SPEC/USER-STORIES.MD:HU-10..HU-17; SPEC/BUSINESS-RULES.MD:RN-10..RN-12,RN-14]
supersedes: []
---
# S17: implementacion HU-10..HU-17 dinamicas de juego

**What**: Mini-delta contrato (Ave.estacionalidad, RondaResult.combo_orden/combo_bonus) con recibo architect; scripts/build_thumbnails.py (Pillow) genera 76 thumbnails webp a src/frontend/public/cards/; build_baraja.py v2 emite barajas.json 1.1.0 con variantes_imagen, UICN (NE->null), orden, endemismo, es_dimorfica, estacionalidad y altitud_max_msnm; backend: VarianteImagen, Ave/Game enriquecidos, RN-10 bono macho/hembra (turno jugador, 1x/partida, acierto gana ronda, fallo vale normal, apuesta no aplicable se ignora silenciosamente), RN-11 altitud_max_msnm jugable, RN-12 combo (+1 carta del perdedor, racha rota por empate/cambio de ganador), migracion 002 idempotente (duplicate column name tolerado); frontend: Card (badge dimorfica + toggle macho/hembra, sello UICN, badge boreal), Game (bono-box, altitud 1x, mensajes bono/combo, expedicion acumulada en ref), Result (Tu expedicion por region / Tu recorrido por Colombia), pantalla Ornitologo (quiz 5 preguntas, 4 opciones, credito fotografo) con entrada en Home.

**Why**: Aterrizar las dinamicas especificadas en S16/S17 sobre el dataset enriquecido (303 especies)

**Where**: spec/api-contract.yaml; scripts/build_thumbnails.py; scripts/build_baraja.py; src/backend/app (models|schemas|barajas|repository|database|migrations/002|routers/partidas); src/frontend/src (Card|Game|Result|Ornitologo|Home|App|types|services/api|mocks/handlers)

**Key details**: -

**Learned**: PowerShell 5.1: git add con un pathspec inexistente aborta todo el staging; UICN 'NE' del dataset viola el enum del contrato (normalizar a null en build); tests RTL: desmontar el primer render antes de queryBy* negativos (screen consulta todo el body); 7 de 52 cartas quedan sin thumbnail por imagen fuente ausente (frontend ya maneja placeholder)
