# Trazabilidad SDLC: HU-20, RN-19, S18-DE-03
"""Copia sin pérdida las imágenes originales de las cartas del juego.

Supersedes scripts/build_thumbnails.py (S17-DE-01): los thumbnails webp q80 a
~200px degradaban la calidad de forma inaceptable para el juego (RN-19).

Este script copia los JPG originales del dataset (topbirds_dataset/images/)
hacia src/frontend/public/cards/ sin recompresión, para las especies
seleccionadas por build_baraja.select_species (mismo criterio determinista).
Elimina cualquier .webp residual del directorio servido.

Uso: python scripts/build_card_images.py
"""
from __future__ import annotations

import json
import shutil
import sys
from pathlib import Path

from build_baraja import DATASET, PUBLIC_CARDS, ROOT, select_species

IMAGES = ROOT / "topbirds_dataset" / "images"


def main() -> int:
    dataset = json.loads(DATASET.read_text(encoding="utf-8"))
    selected = select_species(dataset)

    PUBLIC_CARDS.mkdir(parents=True, exist_ok=True)

    copied: list[str] = []
    missing: list[str] = []
    for species in selected:
        for variante in species.get("variantes_imagen", []):
            archivo = variante.get("archivo_local")
            if not archivo:
                continue
            src = IMAGES / Path(archivo).name
            dst = PUBLIC_CARDS / (Path(archivo).stem + ".jpg")
            if not src.exists():
                missing.append(archivo)
                continue
            shutil.copyfile(src, dst)  # copia byte a byte, sin recompresión
            copied.append(dst.name)

    removed = 0
    for webp in PUBLIC_CARDS.glob("*.webp"):
        webp.unlink()
        removed += 1

    print(f"copiados {len(copied)} JPG originales -> {PUBLIC_CARDS}")
    print(f"eliminados {removed} thumbnails webp residuales")
    if missing:
        print("AVISO: archivos originales no encontrados:", file=sys.stderr)
        for name in missing:
            print(f"  - {name}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
