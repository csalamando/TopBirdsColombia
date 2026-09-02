-- Sprint 7 — Migración inicial: tabla de aves

CREATE TABLE IF NOT EXISTS aves (
    id INTEGER PRIMARY KEY,
    nombre_comun TEXT NOT NULL,
    nombre_cientifico TEXT NOT NULL,
    familia TEXT,
    habitat TEXT,
    dieta TEXT,
    atribucion TEXT,
    imagen_url TEXT,
    atributos TEXT NOT NULL
);
