import pytest
from fastapi.testclient import TestClient
from app.main import app


@pytest.fixture
def client():
    return TestClient(app)


def test_list_aves(client):
    response = client.get("/aves")
    assert response.status_code == 200
    data = response.json()
    assert "items" in data
    assert len(data["items"]) > 0
    assert data["items"][0]["id"] is not None


def test_get_ave(client):
    response = client.get("/aves/1")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == 1
    assert "nombre_comun" in data
    assert "atributos" in data


def test_get_ave_not_found(client):
    response = client.get("/aves/999999")
    assert response.status_code == 404
