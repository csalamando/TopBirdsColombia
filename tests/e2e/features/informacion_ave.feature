Feature: Ver información de un ave

  Como educador
  quiero ver información detallada de cada ave
  para usarla como recurso didáctico.

  Background:
    Given que el jugador ha iniciado una partida contra la IA

  Scenario: Consultar detalle de la carta activa
    When consulta el detalle de la carta activa
    Then ve nombre común, nombre científico, familia, hábitat, dieta y atribución
