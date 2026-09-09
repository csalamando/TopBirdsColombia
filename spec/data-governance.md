# Gobierno de datos — Top Trumps Aves de Colombia

## Datos del sistema
El sistema maneja dos tipos de datos:
1. **Datos de contenido**: información pública de aves de Colombia (nombres, atributos, imágenes).
2. **Datos de partida**: estado efímero de partidas (cartas por jugador, rondas, ganador).

No se procesan datos personales ni sensibles.

## Fuentes de datos
- **Primaria**: iNaturalist Open Data (observaciones con licencias abiertas), enriquecida por el usuario (Sprint 16): 303 especies con atributos de juego, taxonomía, UICN, endemismo, geografía y variantes de imagen. JSON versionado en `topbirds_dataset/`.
- **Secundaria**: fuentes abiertas como Wikipedia, eBird y Wikidata (referencia de curación).
- **Requisito**: cada registro debe incluir atribución de la fuente (`atribucion`).
- **Licencias por imagen**: cada variante (macho/hembra) lleva fotógrafo, licencia (`cc-by` 344 / `cc0` 69 / `cc-by-sa` 36) y `url_observacion` a iNaturalist. Las licencias cc-by/cc-by-sa exigen crédito visible y enlace: el detalle del ave lo cumple mostrando crédito + licencia + enlace por foto (SR-09).
- **Imágenes crudas (147 MB) NO se versionan** en el repo. Se versionan solo las copias sin pérdida (JPG original) de las 52 cartas del juego en `src/frontend/public/cards/` (~24 MB en total, RN-19); `scripts/build_card_images.py` las genera desde `topbirds_dataset/images/` y `scripts/build_baraja.py` valida que existan. El pipeline de thumbnails webp con pérdida (S17-DE-01) quedó **superseded** por RN-19: la pérdida de calidad era inaceptable para el juego. `variantes_imagen[].thumbnail_url` apunta al archivo original completo (nombre del campo mantenido por compatibilidad de contrato).
- **Selección de baraja**: `scripts/build_baraja.py` deriva las 52 cartas del juego desde el dataset enriquecido; regenerar y commitear `src/backend/app/data/barajas.json` ante cambios del dataset.

## Almacenamiento
- SQLite para MVP/demo.
- Esquema definido en `spec/data-model.md`.
- Sin datos PII; sin requisitos de encriptación en reposo para el MVP.

## Migraciones
- Las migraciones de esquema se versionan en `src/backend/migrations/`.
- Se ejecutan de forma idempotente en CI y al iniciar el backend.
- Cada migración debe ser reversible o documentar rollback manual.

## Backup y restauración
- **Demo**: backup manual de archivo SQLite ante cambios de datos.
- **Restauración**: copiar archivo SQLite desde backup.
- No hay RPO/RTO formal para el MVP.

## Anonimización
- No aplica. No hay PII ni datos sensibles.
- Si en el futuro se añaden nombres de jugadores, se evaluará anonimización o consentimiento.

## Calidad de datos
- Atributos numéricos deben ser positivos y dentro de rangos razonables.
- Seed valida integridad referencial antes de insertar.
- Proceso de carga rechaza registros con atribución faltante.
- Dataset enriquecido: 303/303 especies con atributos completos (verificados 2026-09-08); rareza 1-5 se escala a 1-10 en juego multiplicando ×2.
- Conteos verificados: UICN (279 LC · 7 NT · 10 VU · 2 EN · 1 CR), 146 especies dimórficas, 28 endémicas + 20 casi endémicas, 16 migratorias boreales, 41 familias / 18 órdenes.

## Cumplimiento
- HABEAS DATA (Colombia): no aplica por ausencia de datos personales.
- GDPR: no aplica por ausencia de datos personales de residentes de la UE.
- Si se añade autenticación o leaderboard persistente, se reabrirá este documento.
