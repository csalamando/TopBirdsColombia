# Trazabilidad SDLC: HU-07
import pytest
from app.database import get_connection, run_migrations
from app.models import Ave
from app.repository import AveRepository
from app.seed import seed_aves


@pytest.fixture
def conn():
    return get_connection(":memory:")


def test_migrations_create_aves_table(conn):
    run_migrations(conn)
    tables = {
        row["name"]
        for row in conn.execute(
            "SELECT name FROM sqlite_master WHERE type='table'"
        ).fetchall()
    }
    assert "aves" in tables


def test_ave_repository_add_and_get(conn):
    run_migrations(conn)
    repo = AveRepository(conn)
    ave = seed_aves()[0]
    repo.add(ave)
    fetched = repo.get(ave.id)
    assert fetched is not None
    assert fetched.nombre_comun == ave.nombre_comun
    assert fetched.get_attribute("rareza") == ave.get_attribute("rareza")


def test_ave_repository_list_returns_seeded_data(conn):
    run_migrations(conn)
    repo = AveRepository(conn)
    for ave in seed_aves():
        repo.add(ave)
    assert len(repo.list()) == len(seed_aves())


def test_ave_repository_count(conn):
    run_migrations(conn)
    repo = AveRepository(conn)
    assert repo.count() == 0
    repo.add(seed_aves()[0])
    assert repo.count() == 1


def test_ave_repository_update_existing_id(conn):
    run_migrations(conn)
    repo = AveRepository(conn)
    ave = seed_aves()[0]
    repo.add(ave)
    updated = Ave(
        id=ave.id,
        nombre_comun="Nombre actualizado",
        nombre_cientifico=ave.nombre_cientifico,
        familia=ave.familia,
        habitat=ave.habitat,
        dieta=ave.dieta,
        atribucion=ave.atribucion,
        imagen_url=ave.imagen_url,
        atributos=ave.atributos,
    )
    repo.add(updated)
    assert repo.get(ave.id).nombre_comun == "Nombre actualizado"
