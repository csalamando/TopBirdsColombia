# Trazabilidad SDLC: HU-09
import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.barajas import load_cartas, list_barajas, resolve_baraja

REGION_IDS = {"andina", "caribe", "pacifico", "amazonia", "orinoquia"}
ATRIBUTOS = (
    "tamano_cm",
    "peso_g",
    "envergadura_cm",
    "velocidad_kmh",
    "esperanza_vida_anos",
    "rareza",
)


@pytest.fixture
def client():
    return TestClient(app)


# --- Datos de baraja (barajas.json generado desde el dataset enriquecido) ---

def test_barajas_data_has_52_complete_cards():
    cartas = load_cartas()
    assert len(cartas) == 52
    for carta in cartas:
        for key in ATRIBUTOS:
            assert carta.atributos[key] is not None
        assert 1 <= carta.atributos["rareza"] <= 10


def test_list_barajas_completa_first_and_regions():
    barajas = list_barajas()
    assert barajas[0].id == "completa"
    assert barajas[0].cantidad == 52
    region_ids = {b.id for b in barajas[1:]}
    assert region_ids == REGION_IDS
    assert all(b.cantidad >= 10 for b in barajas[1:])


def test_resolve_aleatoria_returns_thematic_deck():
    baraja_id, cartas = resolve_baraja("aleatoria")
    assert baraja_id in REGION_IDS
    assert len(cartas) >= 10


def test_resolve_unknown_baraja_raises():
    with pytest.raises(ValueError):
        resolve_baraja("marte")


# --- API ---

def test_barajas_endpoint_lists_decks(client):
    response = client.get("/barajas")
    assert response.status_code == 200
    items = response.json()["items"]
    assert items[0]["id"] == "completa"
    assert items[0]["cantidad"] == 52
    assert REGION_IDS.issubset({b["id"] for b in items})
    for item in items:
        assert item["nombre"]
        assert item["cantidad"] >= 10


def test_create_partida_completa_deals_52_cards(client):
    response = client.post("/partidas", json={"modo": "ia", "baraja": "completa"})
    assert response.status_code == 201
    data = response.json()
    assert data["baraja"] == "completa"
    assert data["cartas_jugador"] + data["cartas_oponente"] == 52


def test_create_partida_region_deck(client):
    decks = client.get("/barajas").json()["items"]
    amazonia = next(b for b in decks if b["id"] == "amazonia")
    response = client.post("/partidas", json={"modo": "hotseat", "baraja": "amazonia"})
    assert response.status_code == 201
    data = response.json()
    assert data["baraja"] == "amazonia"
    assert data["cartas_jugador"] + data["cartas_oponente"] == amazonia["cantidad"]


def test_create_partida_default_is_random_thematic(client):
    response = client.post("/partidas", json={"modo": "ia"})
    assert response.status_code == 201
    assert response.json()["baraja"] in REGION_IDS


def test_create_partida_invalid_baraja(client):
    response = client.post("/partidas", json={"modo": "ia", "baraja": "marte"})
    assert response.status_code == 422
