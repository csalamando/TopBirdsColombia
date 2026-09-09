---
id: MEM-20260908-008
type: learning
project: TopBirdsColombia
created: 2026-09-08T21:08:43
session: SES-20260908-205209
tags: [s18,imagenes,rn-19,rn-20,spec-delta,tdd]
links: [SPEC/CHANGELOG.MD]
supersedes: []
---
# S18-DE-03/UX-03: imágenes originales restauradas y barajas con imagen (spec delta antes de código)

**What**: Change-request S18: se restauró la calidad original de las imágenes (76 webp eliminados, 76 JPG originales copiados sin pérdida, RN-19 supersedes S17-DE-01) y el selector de baraja pasó de radio buttons a tarjetas con imagen representativa (BarajaInfo.imagen_url, RN-20).

**Why**: El usuario reportó que las thumbnails webp destruían la calidad de imagen, vital para el juego, y que las barajas debían mostrar imagen representativa.

**Where**: scripts/build_card_images.py, scripts/build_baraja.py (v1.2.0), src/backend/app/barajas.py, schemas.py, src/frontend/src/screens/Home.tsx, types.ts, mocks/handlers.ts

**Key details**: -

**Learned**: Esta vez el delta de spec (HU-20, RN-19/20, CHANGELOG) se escribió ANTES de implementar: cero freestyle. El costo de corregir el pipeline de imágenes fue mayor que el de haber decidido calidad original desde S17; conviene validar decisiones de compresión con el usuario antes de industrializarlas.
