Feature: Resolver empate con reserva
  # Trazabilidad SDLC: HU-03

  Como jugador casual
  quiero que los empates se resuelvan con una regla clara
  para continuar el juego.

  Background:
    Given que el jugador ha iniciado una partida contra la IA

  @empate
  Scenario: Empate y posterior victoria con reserva
    When ocurren empates seguidos y luego un ganador
    Then el ganador de la ronda posterior acumula las cartas de la reserva
