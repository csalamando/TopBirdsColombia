# Trazabilidad SDLC: HU-09, S16-BE-04, HU-10..HU-17, HU-20, S18-DE-03
"""Construye la baraja del juego (52 cartas) desde el dataset enriquecido.

Fuente: topbirds_dataset/aves_colombia_toptrumps_enriquecido.json (303 especies,
curadas por el usuario, ver spec/dataset-enrichment.md v3).

Criterio de seleccion (determinista):
1. Siempre incluir las especies amenazadas (UICN VU/EN/CR): ensenanza de conservacion.
2. Priorizar especies dimorficas (146 disponibles): soportan la mecanica estrella.
3. Balance por region canonica (max 12 por region) y diversidad de familias (max 6 por familia).
4. Rellenar hasta 52 relajando topes si es necesario.

Cartas enriquecidas (contrato spec/api-contract.yaml): nombre_ingles,
orden, estado_conservacion_uicn, endemismo, es_dimorfica, estacionalidad,
variantes_imagen[] (thumbnail_url apunta al JPG original sin perdida en
src/frontend/public/cards/, ver scripts/build_card_images.py y RN-19; el campo
conserva su nombre por compatibilidad de contrato pero su contenido es la
imagen completa) y atributos.altitud_max_msnm (oculto, RN-11).

Salida: src/backend/app/data/barajas.json
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATASET = ROOT / "topbirds_dataset" / "aves_colombia_toptrumps_enriquecido.json"
OUTPUT = ROOT / "src" / "backend" / "app" / "data" / "barajas.json"

PUBLIC_CARDS = ROOT / "src" / "frontend" / "public" / "cards"

TARGET = 52
REGION_CAP = 12
FAMILY_CAP = 6
THREATENED = {"VU", "EN", "CR"}
UICN_VALIDAS = {"LC", "NT", "VU", "EN", "CR"}  # enum del contrato
REGION_ORDER = ["andina", "caribe", "pacifico", "amazonia", "orinoquia"]
REGION_LABELS = {
    "andina": "Expedición: Andina",
    "caribe": "Expedición: Caribe",
    "pacifico": "Expedición: Pacífico",
    "amazonia": "Expedición: Amazonía",
    "orinoquia": "Expedición: Orinoquía",
}
REGION_PREFIXES = [
    ("Andina", "andina"),
    ("Caribe", "caribe"),
    ("Pacífico", "pacifico"),
    ("Amazonía", "amazonia"),
    ("Orinoquía", "orinoquia"),
]


def normalize_regions(regiones: list[str]) -> list[str]:
    """Mapea regiones del dataset (incl. subregiones) a ids canonicos."""
    canon = []
    for raw in regiones:
        base = raw.split("(")[0].split("/")[0].strip()
        for prefix, canon_id in REGION_PREFIXES:
            if base.startswith(prefix) and canon_id not in canon:
                canon.append(canon_id)
    return [r for r in REGION_ORDER if r in canon]


def is_dimorphic(species: dict) -> bool:
    sexes = {v.get("sexo") for v in species.get("variantes_imagen", [])}
    return "macho" in sexes and "hembra" in sexes


def atribucion(species: dict) -> str:
    for v in species.get("variantes_imagen", []):
        if v.get("es_principal") and v.get("fotografo"):
            licencia = v.get("licencia", "cc-by")
            return f"{v['fotografo']} · iNaturalist ({licencia})"
    return "iNaturalist Open Data"


def primary_region(species: dict) -> str | None:
    regions = normalize_regions(
        species["distribucion_y_ecologia"]["regiones_colombia"]
    )
    return regions[0] if regions else None


def thumbnail_url(variante: dict) -> str | None:
    """URL de la imagen original servida por el frontend, o null si no existe.

    RN-19: copia sin perdida del JPG del dataset (supersedes thumbnails webp).
    """
    archivo = variante.get("archivo_local")
    if not archivo:
        return None
    name = Path(archivo).stem + ".jpg"
    if (PUBLIC_CARDS / name).exists():
        return f"/cards/{name}"
    return None


def uicn_contrato(species: dict) -> str | None:
    """UICN dentro del enum del contrato; NE/DD quedan como null."""
    uicn = species.get("estado_conservacion_uicn")
    return uicn if uicn in UICN_VALIDAS else None


def build_variantes(species: dict) -> list[dict]:
    variantes = []
    for v in species.get("variantes_imagen", []):
        variantes.append(
            {
                "sexo": v.get("sexo") or "indeterminado",
                "es_principal": bool(v.get("es_principal")),
                "thumbnail_url": thumbnail_url(v),
                "fotografo": v.get("fotografo"),
                "licencia": v.get("licencia"),
                "url_observacion": v.get("url_observacion"),
            }
        )
    return variantes


def select_species(pool: list[dict]) -> list[dict]:
    pool = sorted(pool, key=lambda s: s["nombre_cientifico"])
    selected: list[dict] = []
    region_count = {r: 0 for r in REGION_ORDER}
    family_count: dict[str, int] = {}

    def try_add(species: dict, check_family: bool) -> bool:
        if species in selected or len(selected) >= TARGET:
            return False
        region = primary_region(species)
        if region and region_count[region] >= REGION_CAP:
            return False
        familia = species.get("familia") or ""
        if check_family and family_count.get(familia, 0) >= FAMILY_CAP:
            return False
        selected.append(species)
        if region:
            region_count[region] += 1
        family_count[familia] = family_count.get(familia, 0) + 1
        return True

    # 1. Amenazadas UICN
    for s in pool:
        if s.get("estado_conservacion_uicn") in THREATENED:
            try_add(s, check_family=False)
    # 2. Dimorficas
    for s in pool:
        if is_dimorphic(s):
            try_add(s, check_family=False)
    # 3. Resto con diversidad de familias
    for s in pool:
        try_add(s, check_family=True)
    # 4. Relleno relajando tope de familia
    for s in pool:
        try_add(s, check_family=False)
    # 5. Relleno final sin topes (garantiza llegar a TARGET)
    for s in pool:
        if s not in selected and len(selected) < TARGET:
            selected.append(s)
    return selected


def build() -> dict:
    dataset = json.loads(DATASET.read_text(encoding="utf-8"))
    selected = select_species(dataset)
    if len(selected) != TARGET:
        raise SystemExit(f"Seleccion incomplete: {len(selected)}/{TARGET}")

    selected = sorted(selected, key=lambda s: s["nombre_cientifico"])
    cartas = []
    for idx, s in enumerate(selected, start=1):
        atributos = s["atributos_juego"]
        dist = s.get("distribucion_y_ecologia", {})
        rango = dist.get("rango_altitudinal_msnm") or []
        altitud_max = float(rango[1]) if len(rango) > 1 and rango[1] is not None else None
        variantes = build_variantes(s)
        principal = next((v for v in variantes if v["es_principal"]), None)
        cartas.append(
            {
                "id": idx,
                "nombre_comun": s["nombre_comun"],
                "nombre_ingles": s.get("nombre_ingles"),
                "nombre_cientifico": s["nombre_cientifico"],
                "orden": s.get("orden"),
                "familia": s.get("familia"),
                "habitat": s.get("habitat"),
                "dieta": s.get("dieta"),
                "atribucion": atribucion(s),
                "imagen_url": principal["thumbnail_url"] if principal else None,
                "estado_conservacion_uicn": uicn_contrato(s),
                "endemismo": s.get("endemismo"),
                "es_dimorfica": is_dimorphic(s),
                "estacionalidad": dist.get("estacionalidad"),
                "regiones": normalize_regions(
                    s["distribucion_y_ecologia"]["regiones_colombia"]
                ),
                "variantes_imagen": variantes,
                "atributos": {
                    "tamano_cm": float(atributos["tamano_cm"]),
                    "peso_g": float(atributos["peso_g"]),
                    "envergadura_cm": float(atributos["envergadura_cm"]),
                    "velocidad_kmh": float(atributos["velocidad_kmh"]),
                    "esperanza_vida_anos": float(atributos["esperanza_vida_anos"]),
                    "rareza": int(atributos["rareza_indice"]) * 2,  # escala 1-5 -> 1-10
                    "altitud_max_msnm": altitud_max,  # oculto (RN-11)
                },
            }
        )

    barajas = [
        {
            "id": "completa",
            "nombre": "Colombia completa",
            "cartas": [c["id"] for c in cartas],
        }
    ]
    for region in REGION_ORDER:
        ids = [c["id"] for c in cartas if region in c["regiones"]]
        barajas.append(
            {"id": region, "nombre": REGION_LABELS[region], "cartas": ids}
        )

    return {"version": "1.2.0", "cartas": cartas, "barajas": barajas}


def main() -> None:
    data = build()
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(
        json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    for baraja in data["barajas"]:
        print(f"{baraja['id']}: {len(baraja['cartas'])} cartas")
    print(f"OK -> {OUTPUT}")


if __name__ == "__main__":
    sys.exit(main())
