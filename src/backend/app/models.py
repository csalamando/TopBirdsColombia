from __future__ import annotations

import random
import uuid
from dataclasses import dataclass, field
from enum import Enum
from typing import Any


class GameMode(str, Enum):
    IA = "ia"
    HOTSEAT = "hotseat"


class GameState(str, Enum):
    ACTIVA = "activa"
    FINALIZADA = "finalizada"


@dataclass
class Ave:
    id: int
    nombre_comun: str
    nombre_cientifico: str
    familia: str
    habitat: str
    dieta: str
    atribucion: str
    imagen_url: str | None
    atributos: dict[str, float | int]

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Ave):
            return NotImplemented
        return self.id == other.id

    def __hash__(self) -> int:
        return hash(self.id)

    def get_attribute(self, name: str) -> float | int:
        if name not in self.atributos:
            raise ValueError(f"Atributo no encontrado: {name}")
        return self.atributos[name]


@dataclass
class RoundResult:
    atributo: str
    valor_jugador: float | int
    valor_oponente: float | int
    resultado: str
    carta_jugador: Ave | None = None
    carta_oponente: Ave | None = None
    cartas_jugador: int = 0
    cartas_oponente: int = 0
    reserva: int = 0
    ganador_partida: str | None = None


@dataclass
class Game:
    id: str
    modo: GameMode
    estado: GameState
    turno: str
    cartas_jugador: int
    cartas_oponente: int
    baraja_jugador: list[Ave] = field(default_factory=list)
    baraja_oponente: list[Ave] = field(default_factory=list)
    reserva: list[Ave] = field(default_factory=list)
    ganador: str | None = None

    @classmethod
    def create(cls, modo: GameMode, cards: list[Ave]) -> "Game":
        deck = Deck(cards)
        deck.shuffle()
        player_deck, opponent_deck = deck.deal()

        turno = "jugador" if len(player_deck) >= len(opponent_deck) else "oponente"

        return cls(
            id=str(uuid.uuid4()),
            modo=modo,
            estado=GameState.ACTIVA,
            turno=turno,
            cartas_jugador=len(player_deck),
            cartas_oponente=len(opponent_deck),
            baraja_jugador=player_deck,
            baraja_oponente=opponent_deck,
            reserva=[],
            ganador=None,
        )

    def _check_finished(self) -> None:
        if self.estado == GameState.FINALIZADA:
            raise RuntimeError("La partida ya finalizó")

    def play_round(self, atributo: str, chooser: str | None = None) -> RoundResult:
        self._check_finished()

        if chooser is not None and chooser != self.turno:
            raise RuntimeError(f"No es turno de {chooser}")

        if not self.baraja_jugador or not self.baraja_oponente:
            raise RuntimeError("Un jugador no tiene cartas")

        carta_jugador = self.baraja_jugador.pop(0)
        carta_oponente = self.baraja_oponente.pop(0)

        valor_jugador = carta_jugador.get_attribute(atributo)
        valor_oponente = carta_oponente.get_attribute(atributo)

        pot = [carta_jugador, carta_oponente] + self.reserva
        self.reserva = []

        if valor_jugador > valor_oponente:
            resultado_str = "gana_jugador"
            self.baraja_jugador.extend(pot)
            self.turno = "jugador"
        elif valor_oponente > valor_jugador:
            resultado_str = "gana_oponente"
            self.baraja_oponente.extend(pot)
            self.turno = "oponente"
        else:
            resultado_str = "empate"
            self.reserva = pot
            # Turno alterna en empate para evitar bloqueo; mantiene quien no eligió
            self.turno = "oponente" if self.turno == "jugador" else "jugador"

        self.cartas_jugador = len(self.baraja_jugador)
        self.cartas_oponente = len(self.baraja_oponente)

        self._resolve_end()

        return RoundResult(
            atributo=atributo,
            valor_jugador=valor_jugador,
            valor_oponente=valor_oponente,
            resultado=resultado_str,
            carta_jugador=carta_jugador,
            carta_oponente=carta_oponente,
            cartas_jugador=self.cartas_jugador,
            cartas_oponente=self.cartas_oponente,
            reserva=len(self.reserva),
            ganador_partida=self.ganador,
        )

    def _resolve_end(self) -> None:
        if self.cartas_jugador == 0 and self.cartas_oponente == 0:
            self.estado = GameState.FINALIZADA
            self.ganador = "empate"
        elif self.cartas_jugador == 0:
            self.estado = GameState.FINALIZADA
            self.ganador = "oponente"
        elif self.cartas_oponente == 0:
            self.estado = GameState.FINALIZADA
            self.ganador = "jugador"


class Deck:
    def __init__(self, cards: list[Ave]):
        if len(cards) != len({c.id for c in cards}):
            raise ValueError("La baraja contiene cartas duplicadas")
        self.cards = list(cards)

    def shuffle(self) -> None:
        random.shuffle(self.cards)

    def deal(self) -> tuple[list[Ave], list[Ave]]:
        n = len(self.cards)
        mid = (n + 1) // 2
        return self.cards[:mid], self.cards[mid:]
