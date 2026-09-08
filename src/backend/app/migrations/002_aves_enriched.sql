-- Sprint 17 — Aves enriquecidas (HU-10..HU-17, S17-DE-01)
-- Dimorfismo (RN-10), conservacion UICN (HU-12), visitante boreal (HU-15),
-- variantes fotograficas por sexo (HU-10) y combo taxonomico (RN-12).
-- Idempotencia: run_migrations tolera re-ejecutar ALTER (duplicate column name).

ALTER TABLE aves ADD COLUMN nombre_ingles TEXT;
ALTER TABLE aves ADD COLUMN orden TEXT;
ALTER TABLE aves ADD COLUMN estado_conservacion_uicn TEXT;
ALTER TABLE aves ADD COLUMN endemismo TEXT;
ALTER TABLE aves ADD COLUMN es_dimorfica INTEGER NOT NULL DEFAULT 0;
ALTER TABLE aves ADD COLUMN estacionalidad TEXT;
ALTER TABLE aves ADD COLUMN regiones TEXT NOT NULL DEFAULT '[]';
ALTER TABLE aves ADD COLUMN variantes_imagen TEXT NOT NULL DEFAULT '[]';
