# Gobierno de datos — Top Trumps Aves de Colombia

## Datos del sistema
El sistema maneja dos tipos de datos:
1. **Datos de contenido**: información pública de aves de Colombia (nombres, atributos, imágenes).
2. **Datos de partida**: estado efímero de partidas (cartas por jugador, rondas, ganador).

No se procesan datos personales ni sensibles.

## Fuentes de datos
- **Primaria**: fuentes abiertas como Wikipedia, eBird y Wikidata.
- **Requisito**: cada registro debe incluir atribución de la fuente (`atribucion`).
- **Licencias**: respetar CC BY-SA, dominio público u otras licencias aplicables.

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

## Cumplimiento
- HABEAS DATA (Colombia): no aplica por ausencia de datos personales.
- GDPR: no aplica por ausencia de datos personales de residentes de la UE.
- Si se añade autenticación o leaderboard persistente, se reabrirá este documento.
