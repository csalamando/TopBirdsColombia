# Propuesta — Enriquecimiento de baraja con topbirds_dataset (Sprint 16)

Estado: **v3 — DINÁMICAS DE JUEGO MAPEADAS A HU-10..HU-17 CON FASEADO S16/S17** | Fecha: 2026-09-08
Autores: Data Engineer + Business Analyst (discovery Sprint 16) | Ref: `spec/impact-report.md` (E2 en rojo), items `S16-BE-04` y `S16-DE-02`

## 0. Cambios respecto a v2 (2026-09-08)

- Se aprueba el mapa completo de dinámicas (dimensión del dataset → mecánica → HU → sprint), incluido el detalle de qué tiene ahora cada carta:

| Dimensión | Datos | Valor lúdico/educativo | HU | Sprint |
|---|---|---|---|---|
| 6 atributos Top Trumps | tamaño, peso, envergadura, velocidad, vida, rareza 1-5 saneada | núcleo del juego, confiable | HU-01..04 (hecho) | hecho |
| Dimorfismo | 146 especies (48%) con foto macho + hembra | mecánica estrella | HU-10, HU-11 | S16 base + S17 regla |
| Conservación UICN | 279 LC · 7 NT · 10 VU · 2 EN · 1 CR | conciencia de conservación real | HU-12 | S16 informativo, S17 mecánica |
| Endemismo | 28 endémicas + 20 casi endémicas | orgullo de biodiversidad | detalle de carta | S17 |
| Geografía | 5 regiones, piso térmico, rango altitudinal [min,max] | barajas temáticas y geografía | HU-09 (hecho), HU-13, HU-14 | S16 un modo, resto S17+ |
| Estacionalidad | 285 residentes, 16 migratorias boreales | nociones de migración | HU-15 | S16 badge, S17 modo temporada |
| Taxonomía | 41 familias, 18 órdenes | combos educativos | HU-16 | S17+ |
| Idiomas | nombre común ES + inglés + científico | modo quiz bilingüe | HU-17 | S17+ |

- Rareza real (dinámica A): la rareza 1-5 saneada ya puntúa alto en amenazadas sin reglas especiales (RN-16).
- Regla diferida explícita: empate con ave amenazada gana la más amenazada queda en RN-15 (sin HU, requiere decisión PO).
- Contrato extendido (`spec/api-contract.yaml`): `Ave` enriquecida (nombre_ingles, orden, UICN, endemismo, es_dimorfica, regiones, variantes_imagen), `VarianteImagen`, `altitud_max_msnm` oculto, bono de dimorfismo en rondas.
- El flujo de selección de baraja (aleatoria por defecto / elegible / completa / por partida) ya está implementado (HU-09); las regiones con <10 cartas quedan excluidas del pool aleatorio.

## 0.1 Cambios respecto a v1 (2026-09-08)

- El **plan de curación (§2.4) queda OBSOLETO — ejecutado**: el usuario curó el dataset completo (`topbirds_dataset/aves_colombia_toptrumps_enriquecido.json`, 303 especies) con atributos de juego completos (tamaño, peso, envergadura, velocidad, esperanza de vida, rareza 1-5), nombre común en español, familia, hábitat, dieta, estado UICN, endemismo y regiones de Colombia.
- **Mecánica aprobada por el PO**: selección de baraja al iniciar partida (aleatoria temática por defecto / Colombia completa / expedición por región) → implementada como **HU-09** (ver `spec/user-stories.md`).
- Mecánicas diferidas (ronda bono dimorfismo, barajas por piso térmico, toggle macho/hembra) quedan como propuestas futuras sujetas a aprobación del PO.
- Pendiente: thumbnails de imágenes (§2.4 paso 1); las imágenes crudas (147 MB) siguen fuera del repo.
- Criterio de rareza: `rareza_indice` 1-5 del dataset enriquecido (re-curado por el usuario); el backend lo escala a 1-10 multiplicando ×2 en `scripts/build_baraja.py`.

## 1. Qué tiene el dataset (inventario real, verificado 2026-09-08)

Fuente: iNaturalist Open Data (observaciones con licencias abiertas).

| Dimensión | Estado | Detalle |
|---|---|---|
| Especies | ✅ 303 | `aves_colombia_full.json` (353 KB) |
| Imágenes | ✅ 449 descargadas, 0 faltantes | 147 MB en `topbirds_dataset/images/` |
| Variantes por sexo | ✅ 146 especies con macho+hembra | el resto con 1 variante; campo `es_principal` marca la imagen principal |
| Atribución por imagen | ✅ completa | fotógrafo, licencia (cc-by 344 / cc0 69 / cc-by-sa 36), `url_observacion` iNaturalist |
| Atributos numéricos de juego | ❌ **solo 4/303 completos** | `tamano_cm`, `peso_g`, `envergadura_cm`, `velocidad_kmh`, `esperanza_vida_anos` están en `null` en 299 especies |
| Cartas ya curadas | 🟡 6/303 | `aves_colombia_cards.json` — atributos completos, nombres en español, atribución |
| Nombre común | ❌ 300/303 en inglés | p. ej. "Saffron Finch" → "Chiguire azafranado" |
| Familia taxonómica | ❌ vacía en 303/303 | derivable de taxonomía |
| Rareza (`rareza_indice`) | ⚠️ sospechosa | 96 especies en 1, 39 en 10 (posible placeholder) — requiere re-curación con criterio |
| Piso térmico | ⚠️ placeholder | 300/303 dicen "Andino" — no usable tal cual |

**Conclusión del inventario**: el dataset es un **excelente catálogo de imágenes con atribución legalmente usable** (esto es lo caro de conseguir y ya está resuelto), pero los **atributos de juego deben curarse** para el subset que entre a la baraja.

## 2. Propuesta de aprovechamiento

### 2.1 Modelo de datos: especie → carta con variantes

```
Especie (1) ──< VarianteImagen (1..2: macho / hembra)
   nombre_comun (ES), nombre_cientifico, familia, habitat, dieta,
   atributos: tamano_cm, peso_g, envergadura_cm, velocidad_kmh,
              esperanza_vida_anos, rareza
   es_dimorfica: bool (tiene variantes macho+hembra con apariencia distinta)
```

- Una **carta = una especie** (la baraja se compara por atributos, no por individuo).
- La carta muestra la imagen `es_principal`; con toggle o en el detalle se ve la otra variante (macho/hembra).
- Campo nuevo `es_dimorfica` — el 48% de las especies (146/303) tiene ambas variantes.

### 2.2 Mecánicas de juego que enriquecen (propuesta al PO)

1. **Dimorfismo sexual como carta especial** 🎯 (diferencial educativo fuerte)
   - Las cartas dimórficas llevan badge visual "⚥ dimórfica".
   - **Ronda bono "¿Macho o hembra?"**: al revelar la carta oponente dimórfica, el jugador que acierte el sexo de la imagen mostrada gana la ronda aunque pierda el atributo (1 vez por partida).
   - En el detalle del ave: "En esta especie el macho y la hembra se ven distinto / igual" + ambas fotos con atribución.
2. **Rareza real como atributo de juego**
   - Re-curar `rareza` con criterio documentado (frecuencia de observación iNaturalist + listas rojas). Las aves raras (cóndor, águila harpía) ganan por rareza — enseña conservación.
3. **Barajas temáticas por piso térmico** (fase 2 de la propuesta)
   - Re-curar `piso_termico` real (Andino / Caribe / Pacífico / Orinoquía / Amazonía) → modos de juego "solo aves de páramo", "solo Caribe". Enseña geografía de Colombia.
4. **Detalle educativo enriquecido**
   - Modal del ave: foto grande, macho/hembra lado a lado (si aplica), hábitat, dieta, familia, conservación, y crédito del fotógrafo con licencia + enlace a la observación en iNaturalist (cumple cc-by/cc-by-sa legalmente).

### 2.3 Selección de la baraja del MVP

- Meta `vision.md` E2: **≥50 aves** → objetivo concreto: **baraja de 52 cartas** (coherente con §Alcance del MVP).
- Criterio de selección: (1) priorizar las 146 especies dimórficas (soportan la mecánica estrella), (2) cobertura de familias variadas y pisos térmicos, (3) rareza variada (algunas 9-10, muchas comunes), (4) atributos curables con fuente confiable.
- Resultado estimado: 52 especies × ~1.7 imágenes ≈ 90 imágenes.

### 2.4 Plan de curación (S16-DE-02 + S16-BE-04) — OBSOLETO en v2

> Ejecutado por el usuario: dataset completo enriquecido (303 especies, atributos completos). Se conserva como registro histórico de la propuesta.

| Paso | Trabajo | Rol |
|---|---|---|
| 1 | Versionar dataset bajo gobierno: JSONs al repo; imágenes **NO** crudas al repo (147 MB) — generar thumbnails comprimidos (webp ~200px ancho, ≈ 25-30 KB c/u) y versionar esos en `src/frontend/public/cards/` | Data Engineer |
| 2 | Curar atributos de las 52 especies seleccionadas: tamaño, peso, envergadura, velocidad, esperanza de vida, rareza (con fuente por dato; Wikipedia-ES / BirdLife / HBW como referencia) | Data Engineer + BA |
| 3 | Traducir nombre común a español y derivar familia taxonómica | BA |
| 4 | Script de build TDD: `topbirds_dataset/` (fuente) → cartas JSON del juego (`spec/api-contract.yaml` se extiende con `variantes`, `es_dimorfica`) | Backend (TDD) |
| 5 | UI: carta con imagen real, toggle macho/hembra, badge dimórfica, ronda bono, detalle enriquecido | Frontend (TDD) + UX |

### 2.5 Cambios de spec (delta, a aprobar en GATE del Sprint 16)

- `spec/api-contract.yaml`: schema `Ave` + `variantes_imagen[]` (sexo, url, atribución, licencia), `es_dimorfica`.
- `spec/user-stories.md`: nuevas HU (HU-09 selección de baraja temática — fase 2; HU-10 ronda bono dimorfismo — si el PO la aprueba).
- `spec/data-governance.md`: procedencia iNaturalist, licencias y obligación de atribución por carta.
- `spec/vision.md`: E2 se mantiene (≥50) y se añade nota de atributo "con imagen y atribución".

## 3. Riesgos y decisiones pendientes

| Riesgo | Mitigación |
|---|---|
| Atribución cc-by/cc-by-sa: exige crédito visible | Crédito en el modal de detalle (fotógrafo + licencia + enlace). Ya validado legalmente en `spec/security-requirements.md` SR-09 |
| 147 MB de imágenes en Git | Solo thumbnails versionados; originales quedan fuera del repo (documentado en `data-governance.md`) |
| Datos numéricos sin fuente primaria | Curación con fuente por dato; los valores son aproximaciones documentadas (juego educativo, no científico) |
| Alcance crece (mecánicas nuevas) | Fasear: Sprint 16 = imágenes + 52 cartas + detalle enriquecido; mecánicas (ronda bono, temáticas) entran como HU nuevas sujetas a aprobación del PO |

## 4. Criterios de aceptación propuestos

1. Baraja de 52 cartas con imagen real, nombre en español, 5 atributos numéricos curados y atribución por carta.
2. Cartas dimórficas muestran macho y hembra (toggle) con atribución de cada foto.
3. Detalle del ave enriquecido: familia, hábitat, dieta, conservación/rareza, crédito fotógrafo + licencia + enlace iNaturalist.
4. GATE 2 verifica HU-06 actualizada E2E con la baraja real.
5. Meta E2 de `vision.md` pasa a ✅ en el próximo impact report.
