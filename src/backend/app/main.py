import os
from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from starlette.types import ASGIApp, Receive, Scope, Send
from app.routers import health, aves, partidas
from app.security import setup_security


class ApiPrefixMiddleware:
    """Replica en el monolito de producción la reescritura del proxy de Vite.

    El frontend usa API_BASE_URL="/api" (src/frontend/src/services/api.ts). En
    desarrollo, el proxy de Vite (vite.config.ts) reescribe /api/* → /* antes
    de llegar al backend; en producción no hay proxy, así que este middleware
    aplica la misma reescritura. Sin él, /api/* cae en el StaticFiles y
    responde 404/405 (HU-01).
    """

    PREFIX = "/api"

    def __init__(self, app: ASGIApp) -> None:
        self.app = app

    async def __call__(self, scope: Scope, receive: Receive, send: Send) -> None:
        if scope["type"] == "http" and (
            scope["path"] == self.PREFIX or scope["path"].startswith(self.PREFIX + "/")
        ):
            scope["path"] = scope["path"][len(self.PREFIX):] or "/"
            scope["raw_path"] = scope["path"].encode("ascii")
        await self.app(scope, receive, send)


app = FastAPI(title="Top Trumps Aves de Colombia API", version="1.0.0")

app.add_middleware(ApiPrefixMiddleware)

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("CORS_ORIGINS", "http://localhost:5173").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

setup_security(app)

app.include_router(health.router)
app.include_router(aves.router)
app.include_router(partidas.router)


_dist_dir = Path(__file__).resolve().parent.parent.parent / "frontend" / "dist"
if _dist_dir.is_dir():
    app.mount("/", StaticFiles(directory=str(_dist_dir), html=True), name="static")
else:

    @app.get("/")
    def root() -> dict[str, str]:
        return {"message": "Top Trumps Aves de Colombia"}
