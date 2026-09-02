Feature: Jugar en modo hot-seat

  Como aficionado a las aves
  quiero jugar contra otra persona en el mismo dispositivo
  para compartir la experiencia.

  Scenario: Alternar turnos ocultando cartas
    Given que dos jugadores inician una partida hot-seat
    When el jugador 1 juega una ronda perdiendo el turno
    And es turno del jugador 2
    Then se oculta la carta del jugador 1
    And se muestra la carta del jugador 2 para elegir atributo
