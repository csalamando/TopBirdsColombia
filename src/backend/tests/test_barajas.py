# Trazabilidad SDLC: HU-09, HU-20, RN-19, RN-20
import json
from pathlib import Path

import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.barajas import load_cartas, get_baraja, list_barajas, resolve_baraja

PUBLIC_CARDS = (
    Path(__file__).resolve().parents[3] / "src" / "frontend" / "public" / "cards"
)

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


# --- HU-20 / RN-19: imágenes en calidad original ---

def test_cartas_use_original_jpg_without_lossy_compression():
    for carta in load_cartas():
        if carta.imagen_url:
            assert carta.imagen_url.startswith("/cards/")
            assert carta.imagen_url.endswith(".jpg")
            assert not carta.imagen_url.endswith(".webp")
        for variante in carta.variantes_imagen:
            if variante.thumbnail_url:
                assert variante.thumbnail_url.endswith(".jpg")
                assert not variante.thumbnail_url.endswith(".webp")


def test_referenced_card_images_exist_on_disk_without_lossy_artifacts():
    assert not list(PUBLIC_CARDS.glob("*.webp")), "no deben quedar thumbnails webp (RN-19)"
    data = json.loads(
        (Path(__file__).resolve().parents[1] / "app" / "data" / "barajas.json").read_text(
            encoding="utf-8"
        )
    )
    assert data["version"] == "1.2.0"
    for carta in data["cartas"]:
        urls = [v.get("thumbnail_url") for v in carta["variantes_imagen"]]
        urls.append(carta["imagen_url"])
        for url in urls:
            if url:
                assert (PUBLIC_CARDS / Path(url).name).is_file(), f"falta {url} en disco"


# --- RN-20: imagen representativa de baraja ---

def test_list_barajas_includes_representative_image():
    for baraja in list_barajas():
        _, cartas = get_baraja(baraja.id)
        expected = next((c.imagen_url for c in cartas if c.imagen_url), None)
        assert baraja.imagen_url == expected
        if baraja.imagen_url is not None:
            assert baraja.imagen_url.endswith(".jpg")


def test_barajas_endpoint_includes_imagen_url(client):
    items = client.get("/barajas").json()["items"]
    for item in items:
        assert "imagen_url" in item
        if item["imagen_url"] is not None:
            assert item["imagen_url"].endswith(".jpg")


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
