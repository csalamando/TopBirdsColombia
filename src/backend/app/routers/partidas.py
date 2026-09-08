# Trazabilidad SDLC: HU-01, HU-02, HU-03, HU-04, HU-06, HU-09, HU-10..HU-17
from fastapi import APIRouter, HTTPException, Response, Request
from app.models import Game, GameMode, Ave
from app.schemas import (
    CreatePartidaRequest,
    Error,
    Partida,
    PlayRondaRequest,
    RondaResult,
)
from app.dependencies import get_game_repository
from app.barajas import list_barajas, resolve_baraja
from app.security import limiter
import secrets

router = APIRouter()


def _to_partida_schema(game: Game) -> Partida:
    carta_activa = None
    if game.estado == "activa":
        if game.turno == "jugador" and game.baraja_jugador:
            carta_activa = game.baraja_jugador[0]
        elif game.turno == "oponente" and game.baraja_oponente:
            carta_activa = game.baraja_oponente[0]
    data = {
        "id": game.id,
        "modo": game.modo.value,
        "baraja": game.baraja,
        "estado": game.estado.value,
        "turno": game.turno,
        "cartas_jugador": game.cartas_jugador,
        "cartas_oponente": game.cartas_oponente,
        "carta_activa": carta_activa,
        "ganador": game.ganador,
        "bono_dimorfico_usado": game.bono_dimorfico_usado,
    }
    return Partida.model_validate(data)


@router.get("/barajas", response_model=dict)
@limiter.limit("60/minute")
def list_barajas_endpoint(response: Response, request: Request) -> dict:
    return {"items": [b.__dict__ for b in list_barajas()]}


@router.post("/partidas", response_model=Partida, status_code=201)
@limiter.limit("30/minute")
def create_partida(
    body: CreatePartidaRequest,
    response: Response,
    request: Request,
) -> Partida:
    baraja_id, cards = resolve_baraja(body.baraja)
    modo = GameMode.IA if body.modo == "ia" else GameMode.HOTSEAT
    game = Game.create(modo, cards, baraja=baraja_id)
    get_game_repository().add(game)
    return _to_partida_schema(game)


@router.get(
    "/partidas/{partida_id}",
    response_model=Partida,
    responses={404: {"description": "Partida no encontrada", "model": Error}},
)
def get_partida(partida_id: str) -> Partida:
    game = get_game_repository().get(partida_id)
    if game is None:
        raise HTTPException(status_code=404, detail="Partida no encontrada")
    return _to_partida_schema(game)


@router.post(
    "/partidas/{partida_id}/rondas",
    response_model=RondaResult,
    responses={
        404: {"description": "Partida no encontrada", "model": Error},
        409: {"description": "Partida finalizada", "model": Error},
    },
)
@limiter.limit("60/minute")
def play_ronda(
    partida_id: str,
    body: PlayRondaRequest,
    response: Response,
    request: Request,
) -> RondaResult:
    game = get_game_repository().get(partida_id)
    if game is None:
        raise HTTPException(status_code=404, detail="Partida no encontrada")

    if game.estado == "finalizada":
        raise HTTPException(status_code=409, detail="Partida finalizada")

    if game.turno == "oponente" and game.modo == GameMode.IA:
        atributo = secrets.choice(
            ["tamano_cm", "peso_g", "envergadura_cm", "velocidad_kmh", "esperanza_vida_anos", "rareza"]
        )
    else:
        atributo = body.atributo

    try:
        result = game.play_round(atributo, sexo_oponente=body.sexo_oponente)
    except RuntimeError as exc:
        raise HTTPException(status_code=409, detail=str(exc)) from exc
    except ValueError as exc:
        raise HTTPException(status_code=409, detail=str(exc)) from exc

    return RondaResult.model_validate(result, from_attributes=True)
