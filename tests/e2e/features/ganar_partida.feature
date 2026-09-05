Feature: Determinar ganador de la partida
  # Trazabilidad SDLC: HU-04

  Como jugador casual
  quiero saber cuándo termina la partida y quién ganó.

  Background:
    Given que el jugador ha iniciado una partida contra la IA

  Scenario: Un jugador se queda con todas las cartas
    When se juegan rondas hasta que la partida termine
    Then se muestra la pantalla de resultado con el ganador
    And se ofrece la opción de jugar otra partida
