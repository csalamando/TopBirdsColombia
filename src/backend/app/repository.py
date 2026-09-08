# Trazabilidad SDLC: HU-07
from __future__ import annotations

import json
import sqlite3

from app.models import Ave, Game, VarianteImagen


def _row_to_ave(row: sqlite3.Row) -> Ave:
    return Ave(
        id=row["id"],
        nombre_comun=row["nombre_comun"],
        nombre_cientifico=row["nombre_cientifico"],
        familia=row["familia"],
        habitat=row["habitat"],
        dieta=row["dieta"],
        atribucion=row["atribucion"],
        imagen_url=row["imagen_url"],
        atributos=json.loads(row["atributos"]),
        nombre_ingles=row["nombre_ingles"],
        orden=row["orden"],
        estado_conservacion_uicn=row["estado_conservacion_uicn"],
        endemismo=row["endemismo"],
        es_dimorfica=bool(row["es_dimorfica"]),
        estacionalidad=row["estacionalidad"],
        regiones=json.loads(row["regiones"] or "[]"),
        variantes_imagen=[
            VarianteImagen(
                sexo=v.get("sexo") or "indeterminado",
                es_principal=bool(v.get("es_principal")),
                thumbnail_url=v.get("thumbnail_url"),
                fotografo=v.get("fotografo"),
                licencia=v.get("licencia"),
                url_observacion=v.get("url_observacion"),
            )
            for v in json.loads(row["variantes_imagen"] or "[]")
        ],
    )


class AveRepository:
    def __init__(self, conn: sqlite3.Connection) -> None:
        self._conn = conn

    def add(self, ave: Ave) -> None:
        self._conn.execute(
            """
            INSERT OR REPLACE INTO aves (
                id, nombre_comun, nombre_cientifico, familia, habitat, dieta,
                atribucion, imagen_url, atributos,
                nombre_ingles, orden, estado_conservacion_uicn, endemismo,
                es_dimorfica, estacionalidad, regiones, variantes_imagen
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                ave.id,
                ave.nombre_comun,
                ave.nombre_cientifico,
                ave.familia,
                ave.habitat,
                ave.dieta,
                ave.atribucion,
                ave.imagen_url,
                json.dumps(ave.atributos),
                ave.nombre_ingles,
                ave.orden,
                ave.estado_conservacion_uicn,
                ave.endemismo,
                int(ave.es_dimorfica),
                ave.estacionalidad,
                json.dumps(ave.regiones),
                json.dumps(
                    [
                        {
                            "sexo": v.sexo,
                            "es_principal": v.es_principal,
                            "thumbnail_url": v.thumbnail_url,
                            "fotografo": v.fotografo,
                            "licencia": v.licencia,
                            "url_observacion": v.url_observacion,
                        }
                        for v in ave.variantes_imagen
                    ]
                ),
            ),
        )
        self._conn.commit()

    def list(self) -> list[Ave]:
        rows = self._conn.execute("SELECT * FROM aves").fetchall()
        return [_row_to_ave(row) for row in rows]

    def get(self, ave_id: int) -> Ave | None:
        try:
            row = self._conn.execute(
                "SELECT * FROM aves WHERE id = ?", (ave_id,)
            ).fetchone()
        except (OverflowError, sqlite3.InterfaceError):
            return None
        return _row_to_ave(row) if row else None

    def count(self) -> int:
        row = self._conn.execute("SELECT COUNT(*) FROM aves").fetchone()
        return row[0] if row else 0


class GameRepository:
    def __init__(self) -> None:
        self._games: dict[str, Game] = {}

    def add(self, game: Game) -> None:
        self._games[game.id] = game

    def get(self, game_id: str) -> Game | None:
        return self._games.get(game_id)
