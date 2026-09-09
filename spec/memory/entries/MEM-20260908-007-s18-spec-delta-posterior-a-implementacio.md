---
id: MEM-20260908-007
type: learning
project: TopBirdsColombia
created: 2026-09-08T20:39:07
session: 
tags: [s18, ux, trazabilidad, freestyle, aprendizaje]
links: []
supersedes: []
---
# S18: spec delta posterior a implementacion (freestyle) y copy sin codigos de trazabilidad

**What**: La mejora UI/UX (HU-18 nicknames, HU-19 presentacion) se implemento antes de especificarla; el delta de spec se regularizo a posteriori con recibos y gates. Ademas se establecio RN-18: ningun texto visible de la UI expone codigos HU-/RN-/PANT-.

**Why**: El usuario detecto codigos RN-10/RN-13 en copy visible y etiquetas genericas Jugador/Oponente en produccion; la trazabilidad debe vivir solo en versionado, no en el usuario final.

**Where**: spec/user-stories.md (HU-18/19), spec/business-rules.md (RN-17/18), spec/ux-flows.md, spec/ux/screen-inventory.md, spec/test-plan.md, src/frontend (Home/Game/Result/Card/Ornitologo/Scoreboard)

**Key details**: -

**Learned**: En sesiones orientadas a resolver un bug o mejora rapida el arnes puede saltarse; conviene abrir siempre con la pregunta '¿esto requiere delta de spec?' antes de tocar codigo. El detector de freestyle del arnes (skill sin activacion registrada) funciona como red de seguridad pero el costo de regularizar a posteriori es mayor que especificar primero.
