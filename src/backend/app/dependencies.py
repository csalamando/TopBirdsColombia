from __future__ import annotations

from app.database import get_connection, run_migrations
from app.models import Ave
from app.repository import AveRepository, GameRepository
from app.seed import seed_aves


_ave_repository: AveRepository | None = None
_game_repository = GameRepository()


def _init_ave_repository() -> AveRepository:
    conn = get_connection()
    run_migrations(conn)
    repo = AveRepository(conn)
    if repo.count() == 0:
        for ave in seed_aves():
            repo.add(ave)
    return repo


def get_ave_repository() -> AveRepository:
    global _ave_repository
    if _ave_repository is None:
        _ave_repository = _init_ave_repository()
    return _ave_repository


def get_game_repository() -> GameRepository:
    return _game_repository


def get_cards() -> list[Ave]:
    return get_ave_repository().list()
