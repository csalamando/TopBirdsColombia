Feature: Jugar una ronda
  # Trazabilidad SDLC: HU-02

  Como aficionado a las aves
  quiero seleccionar un atributo de mi carta
  para competir contra la IA u oponente.

  Background:
    Given que el jugador ha iniciado una partida contra la IA

  Scenario: El jugador selecciona un atributo y gana o pierde la ronda
    When es el turno del jugador
    And selecciona el atributo "Tamaño"
    Then se revela el valor del oponente para "Tamaño"
    And se muestra el resultado "Ganaste la ronda" o "Perdiste la ronda" o "Empate"
    And el marcador se actualiza
