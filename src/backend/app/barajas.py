# Trazabilidad SDLC: HU-09
"""Acceso a las barajas del juego (data/barajas.json, generado por scripts/build_baraja.py)."""
from __future__ import annotations

import json
import secrets
from dataclasses import dataclass
from functools import lru_cache
from pathlib import Path

from app.models import Ave, VarianteImagen

DATA_PATH = Path(__file__).resolve().parent / "data" / "barajas.json"
MIN_TEMA_TICAS = 10  # barajas regionales elegibles para "aleatoria"


class BarajaNoEncontradaError(ValueError):
    pass


@dataclass
class BarajaInfo:
    id: str
    nombre: str
    cantidad: int


@lru_cache(maxsize=1)
def _data() -> dict:
    return json.loads(DATA_PATH.read_text(encoding="utf-8"))


def load_cartas() -> list[Ave]:
    return [
        Ave(
            id=c["id"],
            nombre_comun=c["nombre_comun"],
            nombre_cientifico=c["nombre_cientifico"],
            familia=c.get("familia"),
            habitat=c.get("habitat"),
            dieta=c.get("dieta"),
            atribucion=c.get("atribucion"),
            imagen_url=c.get("imagen_url"),
            atributos=c["atributos"],
            nombre_ingles=c.get("nombre_ingles"),
            orden=c.get("orden"),
            estado_conservacion_uicn=c.get("estado_conservacion_uicn"),
            endemismo=c.get("endemismo"),
            es_dimorfica=bool(c.get("es_dimorfica")),
            estacionalidad=c.get("estacionalidad"),
            regiones=list(c.get("regiones") or []),
            variantes_imagen=[
                VarianteImagen(
                    sexo=v.get("sexo") or "indeterminado",
                    es_principal=bool(v.get("es_principal")),
                    thumbnail_url=v.get("thumbnail_url"),
                    fotografo=v.get("fotografo"),
                    licencia=v.get("licencia"),
                    url_observacion=v.get("url_observacion"),
                )
                for v in c.get("variantes_imagen") or []
            ],
        )
        for c in _data()["cartas"]
    ]


def list_barajas() -> list[BarajaInfo]:
    """completa primero, luego las barajas tematicas por region."""
    orden = ["completa", "andina", "caribe", "pacifico", "amazonia", "orinoquia"]
    raw = {b["id"]: b for b in _data()["barajas"]}
    return [
        BarajaInfo(id=bid, nombre=raw[bid]["nombre"], cantidad=len(raw[bid]["cartas"]))
        for bid in orden
        if bid in raw
    ]


def _cartas_por_id() -> dict[int, Ave]:
    return {c.id: c for c in load_cartas()}


def get_baraja(baraja_id: str) -> tuple[BarajaInfo, list[Ave]]:
    cartas = _cartas_por_id()
    for baraja in _data()["barajas"]:
        if baraja["id"] == baraja_id:
            info = BarajaInfo(
                id=baraja["id"], nombre=baraja["nombre"], cantidad=len(baraja["cartas"])
            )
            return info, [cartas[cid] for cid in baraja["cartas"]]
    raise BarajaNoEncontradaError(f"Baraja no encontrada: {baraja_id}")


def resolve_baraja(baraja_id: str) -> tuple[str, list[Ave]]:
    """Resuelve la seleccion del jugador a (id_efectivo, cartas).

    "aleatoria" elige una baraja tematica (regional) al azar entre las que
    tienen suficientes cartas; ids concretos devuelven esa baraja.
    """
    if baraja_id == "aleatoria":
        tematicas = [
            b
            for b in _data()["barajas"]
            if b["id"] != "completa" and len(b["cartas"]) >= MIN_TEMA_TICAS
        ]
        elegida = secrets.choice(tematicas)
        _, cartas = get_baraja(elegida["id"])
        return elegida["id"], cartas
    info, cartas = get_baraja(baraja_id)
    return info.id, cartas
