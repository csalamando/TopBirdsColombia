Feature: Recuperar de estados de UI

  Como jugador casual
  quiero ver estados de carga, vacío y error
  para entender qué está pasando.

  Scenario: Estado de carga inicial
    Given que el jugador abre la aplicación
    Then se muestra el botón de inicio sin datos vacíos

  Scenario: Manejo de error al crear partida con backend caído
    Given que el jugador abre la aplicación
    And que el backend no está disponible
    Then se muestra el botón de inicio sin datos vacíos
    When el jugador intenta iniciar una partida
    Then se muestra un mensaje de error y un botón para reintentar
