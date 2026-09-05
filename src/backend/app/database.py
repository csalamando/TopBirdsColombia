# Trazabilidad SDLC: HU-07
from __future__ import annotations

import json
import os
import sqlite3
from pathlib import Path


def get_db_path() -> str:
    return os.getenv("DATABASE_URL", "data/topbirds.db")


def get_connection(db_path: str | None = None) -> sqlite3.Connection:
    path = db_path or get_db_path()
    if path != ":memory:":
        Path(path).parent.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(path, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    return conn


def run_migrations(conn: sqlite3.Connection) -> None:
    migrations_dir = Path(__file__).parent / "migrations"
    for sql_file in sorted(migrations_dir.glob("*.sql")):
        conn.executescript(sql_file.read_text())
    conn.commit()
