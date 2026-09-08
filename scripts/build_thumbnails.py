# Trazabilidad SDLC: S17-DE-01 (spec/data-governance.md)
"""Genera thumbnails webp (~200px de ancho) para las cartas seleccionadas.

Fuente: topbirds_dataset/images/<archivo_local> (imagenes raw, fuera de git;
ver spec/data-governance.md). Seleccion identica a build_baraja.py (determinista).

Salida: src/frontend/public/cards/<nombre>.webp (servidas por el frontend SPA y
referenciadas como VarianteImagen.thumbnail_url / Ave.imagen_url).

Requiere Pillow: .venv\\Scripts\\pip install Pillow
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

from PIL import Image

from build_baraja import DATASET, ROOT, select_species

WIDTH = 200
PUBLIC_CARDS = ROOT / "src" / "frontend" / "public" / "cards"


def main() -> int:
    dataset = json.loads(DATASET.read_text(encoding="utf-8"))
    selected = select_species(dataset)
    PUBLIC_CARDS.mkdir(parents=True, exist_ok=True)

    written = 0
    missing: list[str] = []
    for species in selected:
        for variante in species.get("variantes_imagen", []):
            archivo = variante.get("archivo_local")
            if not archivo:
                continue
            src = ROOT / "topbirds_dataset" / archivo
            dst = PUBLIC_CARDS / (Path(archivo).stem + ".webp")
            if not src.exists():
                missing.append(f"{species['nombre_cientifico']}: {archivo}")
                continue
            with Image.open(src) as img:
                img = img.convert("RGB")
                ratio = WIDTH / img.width
                img = img.resize(
                    (WIDTH, max(1, round(img.height * ratio))), Image.LANCZOS
                )
                img.save(dst, "WEBP", quality=80)
            written += 1

    print(f"Thumbnails escritos: {written} -> {PUBLIC_CARDS}")
    if missing:
        print(f"AVISO: {len(missing)} imagenes fuente no encontradas:", file=sys.stderr)
        for m in missing:
            print(f"  - {m}", file=sys.stderr)
    return 0


if __name__ == "__main__":
    sys.exit(main())
