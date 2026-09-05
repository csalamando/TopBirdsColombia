Feature: Interfaz responsive
  # Trazabilidad SDLC: HU-08

  Como jugador casual
  quiero usar el juego en dispositivos móviles y escritorio.

  Scenario: Layout en móvil
    Given que el jugador abre la aplicación en un viewport de 375x667
    When inicia una partida contra la IA
    Then el layout se adapta a una columna
    And los botones de atributo son visibles sin scroll horizontal
