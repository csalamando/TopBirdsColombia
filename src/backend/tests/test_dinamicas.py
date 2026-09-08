# Trazabilidad SDLC: HU-10..HU-17, RN-10, RN-11, RN-12
"""Dinamicas de juego S17.

- Cartas enriquecidas expuestas por la API (dimorfismo, UICN, variantes,
  estacionalidad boreal, altitud_max_msnm oculto).
- Bono "Macho o hembra?" (RN-10): solo turno del jugador, solo vs carta
  dimorfica, una vez por partida; el acierto gana la ronda aunque se pierda
  el atributo; el fallo vale normal; el uso se consume aunque falle.
- Ronda de altitud (RN-11): atributo altitud_max_msnm jugable.
- Combo taxonomico (RN-12): 2 victorias consecutivas del mismo ganador con
  aves del mismo orden suman +1 carta del perdedor; sin bonus si no hay
  cartas que tomar; la racha se rompe con empate o cambio de ganador.
"""
import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.models import (
    Ave,
    Game,
    GameMode,
    GameState,
    RoundResult,
    VarianteImagen,
)


@pytest.fixture
def client():
    return TestClient(app)


def make_ave(
    ave_id: int,
    nombre: str,
    orden: str,
    tamano: float,
    *,
    es_dimorfica: bool = False,
    variantes: list[VarianteImagen] | None = None,
    altitud: float | None = None,
    uicn: str | None = None,
    estacionalidad: str = "Residente",
) -> Ave:
    atributos: dict = {
        "tamano_cm": float(tamano),
        "peso_g": 100.0,
        "envergadura_cm": 50.0,
        "velocidad_kmh": 40.0,
        "esperanza_vida_anos": 10.0,
        "rareza": 5,
    }
    if altitud is not None:
        atributos["altitud_max_msnm"] = float(altitud)
    return Ave(
        id=ave_id,
        nombre_comun=nombre,
        nombre_cientifico=f"Cientifico {ave_id}",
        familia="Familia",
        habitat="Habitat",
        dieta="Dieta",
        atribucion="Atribucion",
        imagen_url=None,
        orden=orden,
        estado_conservacion_uicn=uicn,
        es_dimorfica=es_dimorfica,
        estacionalidad=estacionalidad,
        variantes_imagen=variantes or [],
        atributos=atributos,
    )


def dimorphic_variantes() -> list[VarianteImagen]:
    return [
        VarianteImagen(
            sexo="macho", es_principal=True, thumbnail_url="/cards/a_macho.webp"
        ),
        VarianteImagen(
            sexo="hembra", es_principal=False, thumbnail_url="/cards/a_hembra.webp"
        ),
    ]


def make_game(player: list[Ave], opponent: list[Ave]) -> Game:
    return Game(
        id="test-game",
        modo=GameMode.HOTSEAT,
        estado=GameState.ACTIVA,
        turno="jugador",
        cartas_jugador=len(player),
        cartas_oponente=len(opponent),
        baraja_jugador=list(player),
        baraja_oponente=list(opponent),
    )


# --- Cartas enriquecidas (API) -------------------------------------------


def test_aves_expone_cartas_enriquecidas(client):
    response = client.get("/aves")
    assert response.status_code == 200
    aves = response.json()["items"]
    assert len(aves) >= 50

    dimorficas = [a for a in aves if a["es_dimorfica"]]
    assert dimorficas, "la baraja debe incluir especies dimorficas"
    c = next(a for a in dimorficas if a["imagen_url"])
    assert {v["sexo"] for v in c["variantes_imagen"]} >= {"macho", "hembra"}
    principal = next(v for v in c["variantes_imagen"] if v["es_principal"])
    assert principal["thumbnail_url"].startswith("/cards/")
    assert principal["fotografo"]
    assert principal["licencia"] in ("cc-by", "cc0", "cc-by-sa")
    assert principal["url_observacion"].startswith("https://")

    assert all("altitud_max_msnm" in a["atributos"] for a in aves)
    assert any(a["atributos"]["altitud_max_msnm"] for a in aves)

    amenazadas = [a for a in aves if a["estado_conservacion_uicn"] in ("VU", "EN", "CR")]
    assert amenazadas, "la baraja debe incluir especies amenazadas UICN"
    assert all(a["orden"] for a in aves)

    boreal = next(
        (a for a in aves if a["estacionalidad"] == "Migratoria Boreal"), None
    )
    assert boreal is not None, "HU-15: debe existir al menos un visitante boreal"


def test_get_ave_enriquecida_por_id(client):
    response = client.get("/aves/1")
    assert response.status_code == 200
    data = response.json()
    for campo in (
        "nombre_ingles",
        "orden",
        "estado_conservacion_uicn",
        "endemismo",
        "es_dimorfica",
        "estacionalidad",
        "regiones",
        "variantes_imagen",
    ):
        assert campo in data
    assert "altitud_max_msnm" in data["atributos"]


# --- Bono "Macho o hembra?" (RN-10) ---------------------------------------


def test_bono_acierto_gana_ronda_aun_perdiendo_atributo():
    jugador = make_ave(1, "Jugador", "Paseriformes", 10)
    oponente = make_ave(
        2, "Oponente", "Apodiformes", 99,
        es_dimorfica=True, variantes=dimorphic_variantes(),
    )
    game = make_game(
        [jugador, make_ave(11, "J2", "Paseriformes", 10)],
        [oponente, make_ave(12, "O2", "Apodiformes", 99)],
    )
    result = game.play_round("tamano_cm", sexo_oponente="macho")
    assert result.bono_ofrecido is True
    assert result.bono_acierto is True
    assert result.resultado == "gana_jugador"
    assert game.bono_dimorfico_usado is True


def test_bono_fallo_vale_normal_y_se_consume():
    jugador = make_ave(1, "Jugador", "Paseriformes", 10)
    oponente = make_ave(
        2, "Oponente", "Apodiformes", 99,
        es_dimorfica=True, variantes=dimorphic_variantes(),
    )
    game = make_game(
        [jugador, make_ave(11, "J2", "Paseriformes", 10)],
        [oponente, make_ave(12, "O2", "Apodiformes", 99)],
    )
    result = game.play_round("tamano_cm", sexo_oponente="hembra")
    assert result.bono_ofrecido is True
    assert result.bono_acierto is False
    assert result.resultado == "gana_oponente"  # fallo: vale el atributo
    assert game.bono_dimorfico_usado is True


def test_bono_solo_se_ofrece_una_vez():
    jugador1 = make_ave(1, "J1", "Paseriformes", 50)
    jugador2 = make_ave(2, "J2", "Paseriformes", 50)
    oponente1 = make_ave(
        3, "O1", "Apodiformes", 10,
        es_dimorfica=True, variantes=dimorphic_variantes(),
    )
    oponente2 = make_ave(
        4, "O2", "Apodiformes", 10,
        es_dimorfica=True, variantes=dimorphic_variantes(),
    )
    game = make_game([jugador1, jugador2], [oponente1, oponente2])
    r1 = game.play_round("tamano_cm", sexo_oponente="macho")
    assert r1.bono_ofrecido is True
    r2 = game.play_round("tamano_cm", sexo_oponente="macho")
    assert r2.bono_ofrecido is False
    assert r2.bono_acierto is None


def test_bono_ignorado_si_oponente_no_dimorfico():
    jugador = make_ave(1, "J", "Paseriformes", 10)
    oponente = make_ave(2, "O", "Apodiformes", 99)
    game = make_game(
        [jugador, make_ave(11, "J2", "Paseriformes", 10)],
        [oponente, make_ave(12, "O2", "Apodiformes", 99)],
    )
    result = game.play_round("tamano_cm", sexo_oponente="macho")
    assert result.bono_ofrecido is False
    assert result.bono_acierto is None
    assert result.resultado == "gana_oponente"
    assert game.bono_dimorfico_usado is False


# --- Ronda de altitud (RN-11) ---------------------------------------------


def test_atributo_altitud_max_msnm_es_jugable():
    jugador = make_ave(1, "J", "Paseriformes", 10, altitud=3000)
    oponente = make_ave(2, "O", "Apodiformes", 10, altitud=1000)
    game = make_game(
        [jugador, make_ave(11, "J2", "Paseriformes", 10, altitud=500)],
        [oponente, make_ave(12, "O2", "Apodiformes", 10, altitud=500)],
    )
    result = game.play_round("altitud_max_msnm")
    assert result.valor_jugador == 3000
    assert result.valor_oponente == 1000
    assert result.resultado == "gana_jugador"


# --- Combo taxonómico (RN-12) ----------------------------------------------


def test_combo_mismo_orden_suma_carta_del_perdedor():
    player = [
        make_ave(1, "J1", "Paseriformes", 50),
        make_ave(2, "J2", "Paseriformes", 60),
        make_ave(3, "J3", "Paseriformes", 70),
    ]
    opponent = [
        make_ave(4, "O1", "Apodiformes", 10),
        make_ave(5, "O2", "Apodiformes", 20),
        make_ave(6, "O3", "Apodiformes", 30),
        make_ave(7, "O4", "Apodiformes", 40),
    ]
    game = make_game(player, opponent)
    r1 = game.play_round("tamano_cm")
    assert r1.resultado == "gana_jugador"
    assert r1.combo_bonus is False
    assert r1.combo_orden is None

    r2 = game.play_round("tamano_cm")
    assert r2.resultado == "gana_jugador"
    assert r2.combo_orden == "Paseriformes"
    assert r2.combo_bonus is True
    # r2: pot de 2 cartas al ganador + 1 carta extra del perdedor por el combo;
    # al perdedor le quedaba 1 carta tras entregar la del bono
    assert game.cartas_jugador == 6
    assert game.cartas_oponente == 1


def test_combo_no_aplica_si_cambia_el_orden():
    player = [
        make_ave(1, "J1", "Paseriformes", 50),
        make_ave(2, "J2", "Apodiformes", 60),
    ]
    opponent = [
        make_ave(3, "O1", "Apodiformes", 10),
        make_ave(4, "O2", "Paseriformes", 20),
        make_ave(5, "O3", "Paseriformes", 30),
    ]
    game = make_game(player, opponent)
    r1 = game.play_round("tamano_cm")
    assert r1.resultado == "gana_jugador"
    r2 = game.play_round("tamano_cm")
    assert r2.resultado == "gana_jugador"
    assert r2.combo_orden is None
    assert r2.combo_bonus is False


def test_combo_sin_bonus_si_perdedor_sin_cartas():
    player = [
        make_ave(1, "J1", "Paseriformes", 50),
        make_ave(2, "J2", "Paseriformes", 60),
    ]
    opponent = [make_ave(3, "O1", "Apodiformes", 10)]
    game = make_game(player, opponent)
    r1 = game.play_round("tamano_cm")
    assert r1.resultado == "gana_jugador"
    assert game.cartas_oponente == 0
    # la partida ya finalizo; no hay segunda ronda que jugar
    assert game.estado == GameState.FINALIZADA
    assert game.ganador == "jugador"


def test_empate_rompe_la_racha_de_combo():
    player = [
        make_ave(1, "J1", "Paseriformes", 50),
        make_ave(2, "J2", "Paseriformes", 10),
        make_ave(3, "J3", "Paseriformes", 60),
    ]
    opponent = [
        make_ave(4, "O1", "Apodiformes", 40),
        make_ave(5, "O2", "Apodiformes", 10),
        make_ave(6, "O3", "Apodiformes", 20),
        make_ave(7, "O4", "Apodiformes", 30),
    ]
    game = make_game(player, opponent)
    r1 = game.play_round("tamano_cm")
    assert r1.resultado == "gana_jugador"
    r2 = game.play_round("tamano_cm")  # 10 vs 10 -> empate, va al reservorio
    assert r2.resultado == "empate"
    assert r2.combo_bonus is False
    r3 = game.play_round("tamano_cm")  # racha reiniciada: no hay combo
    assert r3.resultado == "gana_jugador"
    assert r3.combo_orden is None
    assert r3.combo_bonus is False


# --- API: partida y rondas con nuevos campos --------------------------------


def test_partida_expone_bono_dimorfico_usado(client):
    response = client.post("/partidas", json={"modo": "hotseat", "baraja": "completa"})
    assert response.status_code == 201
    assert response.json()["bono_dimorfico_usado"] is False


def test_play_ronda_expone_bono_y_combo(client):
    partida = client.post(
        "/partidas", json={"modo": "hotseat", "baraja": "completa"}
    ).json()
    response = client.post(
        f"/partidas/{partida['id']}/rondas",
        json={"atributo": "altitud_max_msnm"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["bono_ofrecido"] is False
    assert data["bono_acierto"] is None
    assert "combo_orden" in data
    assert "combo_bonus" in data

    response2 = client.post(
        f"/partidas/{partida['id']}/rondas",
        json={"atributo": "tamano_cm", "sexo_oponente": "macho"},
    )
    assert response2.status_code == 200
    data2 = response2.json()
    if data2["bono_ofrecido"]:
        assert data2["bono_acierto"] in (True, False)
        estado = client.get(f"/partidas/{partida['id']}").json()
        assert estado["bono_dimorfico_usado"] is True
