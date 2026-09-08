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
class VarianteImagen:
    """Variante fotografica de una ave por sexo (spec/api-contract.yaml)."""

    sexo: str
    es_principal: bool
    thumbnail_url: str | None = None
    fotografo: str | None = None
    licencia: str | None = None
    url_observacion: str | None = None


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
    # Campos enriquecidos S17 (HU-10..HU-17); defaults para datos legacy
    nombre_ingles: str | None = None
    orden: str | None = None
    estado_conservacion_uicn: str | None = None
    endemismo: str | None = None
    es_dimorfica: bool = False
    estacionalidad: str | None = None
    regiones: list[str] = field(default_factory=list)
    variantes_imagen: list[VarianteImagen] = field(default_factory=list)

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

    def sexo_principal(self) -> str | None:
        """Sexo de la variante principal (RN-10: sexo real del bono)."""
        for variante in self.variantes_imagen:
            if variante.es_principal:
                return variante.sexo
        return self.variantes_imagen[0].sexo if self.variantes_imagen else None


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
    bono_ofrecido: bool = False
    bono_acierto: bool | None = None
    combo_orden: str | None = None
    combo_bonus: bool = False


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
    baraja: str = "completa"
    bono_dimorfico_usado: bool = False
    _last_winner: str | None = None
    _last_winner_orden: str | None = None

    @classmethod
    def create(cls, modo: GameMode, cards: list[Ave], baraja: str = "completa") -> "Game":
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
            baraja=baraja,
        )

    def _check_finished(self) -> None:
        if self.estado == GameState.FINALIZADA:
            raise RuntimeError("La partida ya finalizó")

    def play_round(
        self,
        atributo: str,
        chooser: str | None = None,
        sexo_oponente: str | None = None,
    ) -> RoundResult:
        self._check_finished()

        if chooser is not None and chooser != self.turno:
            raise RuntimeError(f"No es turno de {chooser}")

        if not self.baraja_jugador or not self.baraja_oponente:
            raise RuntimeError("Un jugador no tiene cartas")

        # RN-10: bono "Macho o hembra?" — solo en turno del jugador (la IA no
        # lo usa), solo si la carta oponente es dimorfica y solo una vez por
        # partida. Si no aplica, la apuesta se ignora silenciosamente.
        bono_ofrecido = False
        bono_acierto: bool | None = None
        carta_oponente = self.baraja_oponente[0]
        if (
            sexo_oponente is not None
            and self.turno == "jugador"
            and not self.bono_dimorfico_usado
            and carta_oponente.es_dimorfica
        ):
            bono_ofrecido = True
            self.bono_dimorfico_usado = True
            bono_acierto = sexo_oponente == carta_oponente.sexo_principal()

        carta_jugador = self.baraja_jugador.pop(0)
        carta_oponente = self.baraja_oponente.pop(0)

        valor_jugador = carta_jugador.get_attribute(atributo)
        valor_oponente = carta_oponente.get_attribute(atributo)

        pot = [carta_jugador, carta_oponente] + self.reserva
        self.reserva = []

        if valor_jugador > valor_oponente:
            resultado_str = "gana_jugador"
        elif valor_oponente > valor_jugador:
            resultado_str = "gana_oponente"
        else:
            resultado_str = "empate"

        # RN-10: el acierto en el bono gana la ronda aunque se pierda el
        # atributo; el fallo vale normal.
        if bono_acierto is True:
            resultado_str = "gana_jugador"

        combo_orden: str | None = None
        combo_bonus = False
        if resultado_str == "gana_jugador":
            self.baraja_jugador.extend(pot)
            self.turno = "jugador"
        elif resultado_str == "gana_oponente":
            self.baraja_oponente.extend(pot)
            self.turno = "oponente"
        else:
            self.reserva = pot
            # Turno alterna en empate para evitar bloqueo; mantiene quien no eligió
            self.turno = "oponente" if self.turno == "jugador" else "jugador"

        # RN-12: combo taxonomico — el mismo ganador gana 2 rondas seguidas
        # con aves del mismo orden: +1 carta del perdedor (si tiene).
        if resultado_str == "empate":
            self._last_winner = None
            self._last_winner_orden = None
        else:
            winner = "jugador" if resultado_str == "gana_jugador" else "oponente"
            winner_carta = carta_jugador if winner == "jugador" else carta_oponente
            if (
                winner == self._last_winner
                and winner_carta.orden
                and winner_carta.orden == self._last_winner_orden
            ):
                combo_orden = winner_carta.orden
                loser_deck = (
                    self.baraja_oponente if winner == "jugador" else self.baraja_jugador
                )
                winner_deck = (
                    self.baraja_jugador if winner == "jugador" else self.baraja_oponente
                )
                if loser_deck:
                    winner_deck.append(loser_deck.pop(0))
                    combo_bonus = True
            self._last_winner = winner
            self._last_winner_orden = winner_carta.orden

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
            bono_ofrecido=bono_ofrecido,
            bono_acierto=bono_acierto,
            combo_orden=combo_orden,
            combo_bonus=combo_bonus,
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
