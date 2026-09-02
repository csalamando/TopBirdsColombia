from fastapi import APIRouter, HTTPException
from app.models import Game, GameMode, Ave
from app.schemas import CreatePartidaRequest, Partida, PlayRondaRequest, RondaResult, Error
from app.dependencies import get_game_repository, get_cards
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
        "estado": game.estado.value,
        "turno": game.turno,
        "cartas_jugador": game.cartas_jugador,
        "cartas_oponente": game.cartas_oponente,
        "carta_activa": carta_activa,
        "ganador": game.ganador,
    }
    return Partida.model_validate(data)


@router.post("/partidas", response_model=Partida, status_code=201)
def create_partida(request: CreatePartidaRequest) -> Partida:
    cards = get_cards()
    modo = GameMode.IA if request.modo == "ia" else GameMode.HOTSEAT
    game = Game.create(modo, cards)
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
def play_ronda(partida_id: str, request: PlayRondaRequest) -> RondaResult:
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
        atributo = request.atributo

    try:
        result = game.play_round(atributo)
    except RuntimeError as exc:
        raise HTTPException(status_code=409, detail=str(exc)) from exc

    return RondaResult.model_validate(result, from_attributes=True)
