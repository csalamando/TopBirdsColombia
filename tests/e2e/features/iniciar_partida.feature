Feature: Iniciar partida

  Como jugador casual
  quiero iniciar una partida contra la IA o en hot-seat
  para empezar a jugar rápidamente.

  Scenario: Iniciar partida contra la IA
    Given que el jugador está en la pantalla de inicio
    When selecciona "Un jugador vs IA"
    And presiona "Nueva partida"
    Then se crea una partida y se muestra la primera carta con atributos visibles

  Scenario: Iniciar partida hot-seat
    Given que el jugador está en la pantalla de inicio
    When selecciona "Dos jugadores (hotseat)"
    And presiona "Nueva partida"
    Then se crea una partida hot-seat y se muestra la primera carta
