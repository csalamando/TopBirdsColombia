# Trazabilidad SDLC: HU-01, HU-05, HU-09
# El frontend llama la API bajo /api/* (API_BASE_URL en services/api.ts). En
# desarrollo el proxy de Vite reescribe /api/* → /*; ApiPrefixMiddleware replica
# esa reescritura en el monolito de producción. Estos tests bloquean ese
# comportamiento para que el despliegue (FastAPI sirviendo el SPA) no regrese a
# 404/405 en /api/*.
import pytest
from fastapi.testclient import TestClient
from app.main import app


@pytest.fixture
def client():
    return TestClient(app)


def test_api_prefix_list_aves(client):
    response = client.get("/api/aves")
    assert response.status_code == 200
    assert len(response.json()["items"]) > 0


def test_api_prefix_list_barajas(client):
    response = client.get("/api/barajas")
    assert response.status_code == 200
    items = response.json()["items"]
    assert items[0]["id"] == "completa"


def test_api_prefix_create_partida(client):
    response = client.post(
        "/api/partidas", json={"modo": "ia", "baraja": "completa"}
    )
    assert response.status_code == 201
    data = response.json()
    assert data["cartas_jugador"] + data["cartas_oponente"] == 52


def test_api_prefix_play_round(client):
    game = client.post(
        "/api/partidas", json={"modo": "ia", "baraja": "completa"}
    ).json()
    response = client.post(
        f"/api/partidas/{game['id']}/rondas", json={"atributo": "tamano_cm"}
    )
    assert response.status_code == 200
    assert response.json()["resultado"] in (
        "gana_jugador",
        "gana_oponente",
        "empate",
    )


def test_root_routes_still_work(client):
    # Las rutas raíz deben seguir respondiendo (healthcheck y contrato).
    assert client.get("/health").status_code == 200
    assert client.get("/aves").status_code == 200
