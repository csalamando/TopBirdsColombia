# Trazabilidad SDLC: HU-01, HU-02, HU-03, HU-04, HU-06
import pytest
from fastapi.testclient import TestClient
from app.main import app


@pytest.fixture
def client():
    return TestClient(app)


def test_create_partida_ia(client):
    response = client.post("/partidas", json={"modo": "ia"})
    assert response.status_code == 201
    data = response.json()
    assert data["modo"] == "ia"
    assert data["estado"] == "activa"
    assert data["turno"] in ("jugador", "oponente")
    assert data["cartas_jugador"] > 0
    assert data["cartas_oponente"] > 0
    assert "id" in data


def test_create_partida_hotseat(client):
    response = client.post("/partidas", json={"modo": "hotseat"})
    assert response.status_code == 201
    data = response.json()
    assert data["modo"] == "hotseat"


def test_create_partida_invalid_mode(client):
    response = client.post("/partidas", json={"modo": "online"})
    assert response.status_code == 422


def test_get_partida(client):
    created = client.post("/partidas", json={"modo": "ia"}).json()
    partida_id = created["id"]
    response = client.get(f"/partidas/{partida_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == partida_id


def test_get_partida_not_found(client):
    response = client.get("/partidas/00000000-0000-0000-0000-000000000000")
    assert response.status_code == 404


def test_play_ronda(client):
    created = client.post("/partidas", json={"modo": "hotseat"}).json()
    partida_id = created["id"]
    response = client.post(f"/partidas/{partida_id}/rondas", json={"atributo": "tamano_cm"})
    assert response.status_code == 200
    data = response.json()
    assert data["atributo"] == "tamano_cm"
    assert data["resultado"] in ("gana_jugador", "gana_oponente", "empate")
    assert "valor_jugador" in data
    assert "valor_oponente" in data


def test_play_ronda_invalid_attribute(client):
    created = client.post("/partidas", json={"modo": "hotseat"}).json()
    partida_id = created["id"]
    response = client.post(f"/partidas/{partida_id}/rondas", json={"atributo": "color"})
    assert response.status_code == 422


def test_play_ronda_partida_not_found(client):
    response = client.post(
        "/partidas/00000000-0000-0000-0000-000000000000/rondas",
        json={"atributo": "tamano_cm"},
    )
    assert response.status_code == 404


def test_play_ronda_until_game_ends_or_max_rounds(client):
    created = client.post("/partidas", json={"modo": "hotseat"}).json()
    partida_id = created["id"]
    finished = False
    for _ in range(60):
        response = client.post(f"/partidas/{partida_id}/rondas", json={"atributo": "tamano_cm"})
        assert response.status_code in (200, 409)
        if response.status_code == 409:
            finished = True
            break
    final = client.get(f"/partidas/{partida_id}").json()
    assert final["estado"] in ("activa", "finalizada")
    if finished:
        assert final["estado"] == "finalizada"
        assert final["ganador"] in ("jugador", "oponente", "empate")
