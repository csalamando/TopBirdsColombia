import pytest
from app.models import Ave, Deck, Game, GameMode, GameState


def make_game(player_cards: list[Ave], opponent_cards: list[Ave], modo: GameMode = GameMode.HOTSEAT, turno: str = "jugador") -> Game:
    return Game(
        id="test-game",
        modo=modo,
        estado=GameState.ACTIVA,
        turno=turno,
        cartas_jugador=len(player_cards),
        cartas_oponente=len(opponent_cards),
        baraja_jugador=list(player_cards),
        baraja_oponente=list(opponent_cards),
        reserva=[],
        ganador=None,
    )


def make_card(card_id: int, tamano_cm: float = 20.0, rareza: int = 5) -> Ave:
    return Ave(
        id=card_id,
        nombre_comun=f"Ave {card_id}",
        nombre_cientifico=f"Scientifica {card_id}",
        familia="Turdidae",
        habitat="Bosque",
        dieta="Insectos",
        atribucion="Wikipedia",
        imagen_url=None,
        atributos={
            "tamano_cm": tamano_cm,
            "peso_g": 50.0 + card_id,
            "envergadura_cm": 30.0 + card_id,
            "velocidad_kmh": 20.0 + card_id,
            "esperanza_vida_anos": 5.0 + card_id,
            "rareza": rareza,
        },
    )


def test_card_attribute_access():
    card = make_card(1, rareza=7)
    assert card.get_attribute("rareza") == 7
    assert card.get_attribute("tamano_cm") == 20.0


def test_card_attribute_not_found_raises():
    card = make_card(1)
    with pytest.raises(ValueError):
        card.get_attribute("no_existe")


class TestDeck:
    def test_deck_has_no_duplicates(self):
        cards = [make_card(i) for i in range(10)]
        deck = Deck(cards)
        assert len(deck.cards) == 10
        assert len({c.id for c in deck.cards}) == 10

    def test_deck_deals_even_split(self):
        cards = [make_card(i) for i in range(10)]
        deck = Deck(cards)
        player, opponent = deck.deal()
        assert len(player) == 5
        assert len(opponent) == 5
        assert set(player).isdisjoint(opponent)
        assert len(player) + len(opponent) == 10

    def test_deck_deals_odd_split_extra_to_first(self):
        cards = [make_card(i) for i in range(11)]
        deck = Deck(cards)
        player, opponent = deck.deal()
        assert len(player) == 6
        assert len(opponent) == 5
        assert len(player) + len(opponent) == 11

    def test_deck_shuffle_preserves_all_cards(self):
        cards = [make_card(i) for i in range(10)]
        deck = Deck(cards)
        deck.shuffle()
        assert len(deck.cards) == 10
        assert {c.id for c in deck.cards} == set(range(10))


class TestGame:
    def test_game_starts_with_even_deck(self):
        cards = [make_card(i) for i in range(10)]
        game = Game.create(GameMode.IA, cards)
        assert game.estado == GameState.ACTIVA
        assert game.modo == GameMode.IA
        assert game.cartas_jugador + game.cartas_oponente == 10

    def test_game_starts_with_odd_deck(self):
        cards = [make_card(i) for i in range(11)]
        game = Game.create(GameMode.IA, cards)
        assert game.cartas_jugador == 6
        assert game.cartas_oponente == 5

    def test_player_wins_round_takes_both_cards(self):
        player_cards = [
            make_card(1, tamano_cm=10.0),
            make_card(2, tamano_cm=20.0),
        ]
        opponent_cards = [
            make_card(3, tamano_cm=5.0),
            make_card(4, tamano_cm=15.0),
        ]
        game = make_game(player_cards, opponent_cards)
        initial_player = game.cartas_jugador
        result = game.play_round("tamano_cm")
        assert result.resultado == "gana_jugador"
        assert game.cartas_jugador == initial_player + 1
        assert game.turno == "jugador"

    def test_opponent_wins_round_takes_both_cards(self):
        player_cards = [
            make_card(1, tamano_cm=10.0),
            make_card(2, tamano_cm=5.0),
        ]
        opponent_cards = [
            make_card(3, tamano_cm=20.0),
            make_card(4, tamano_cm=15.0),
        ]
        game = make_game(player_cards, opponent_cards)
        initial_opponent = game.cartas_oponente
        result = game.play_round("tamano_cm")
        assert result.resultado == "gana_oponente"
        assert game.cartas_oponente == initial_opponent + 1
        assert game.turno == "oponente"

    def test_tie_stash_and_winner_takes_reserve(self):
        player_cards = [
            make_card(1, tamano_cm=10.0),
            make_card(2, tamano_cm=20.0),
        ]
        opponent_cards = [
            make_card(3, tamano_cm=10.0),
            make_card(4, tamano_cm=15.0),
        ]
        game = make_game(player_cards, opponent_cards)
        result = game.play_round("tamano_cm")
        assert result.resultado == "empate"
        assert len(game.reserva) == 2
        result2 = game.play_round("tamano_cm")
        assert result2.reserva == 0
        assert game.cartas_jugador + game.cartas_oponente + len(game.reserva) == 4

    def test_game_ends_when_player_runs_out(self):
        player_cards = [make_card(1, tamano_cm=10.0)]
        opponent_cards = [make_card(2, tamano_cm=20.0)]
        game = make_game(player_cards, opponent_cards)
        game.play_round("tamano_cm")
        assert game.estado == GameState.FINALIZADA
        assert game.ganador == "oponente"

    def test_game_ends_when_opponent_runs_out(self):
        player_cards = [make_card(1, tamano_cm=20.0)]
        opponent_cards = [make_card(2, tamano_cm=10.0)]
        game = make_game(player_cards, opponent_cards)
        game.play_round("tamano_cm")
        assert game.estado == GameState.FINALIZADA
        assert game.ganador == "jugador"

    def test_cannot_play_finished_game(self):
        player_cards = [make_card(1, tamano_cm=10.0)]
        opponent_cards = [make_card(2, tamano_cm=20.0)]
        game = make_game(player_cards, opponent_cards)
        game.play_round("tamano_cm")
        with pytest.raises(RuntimeError):
            game.play_round("tamano_cm")

    def test_only_turn_owner_chooses_attribute(self):
        player_cards = [
            make_card(1, tamano_cm=10.0),
            make_card(2, tamano_cm=20.0),
        ]
        opponent_cards = [
            make_card(3, tamano_cm=5.0),
            make_card(4, tamano_cm=15.0),
        ]
        game = make_game(player_cards, opponent_cards, turno="oponente")
        with pytest.raises(RuntimeError):
            game.play_round("tamano_cm", chooser="jugador")
