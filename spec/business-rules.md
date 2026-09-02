# Reglas de negocio — Top Trumps Aves de Colombia

## RN-01 Baraja inicial
- La baraja completa contiene todas las aves disponibles (≥52 en el MVP).
- Cada carta aparece exactamente una vez en la baraja de una partida.
- No se admiten cartas duplicadas dentro de la misma partida.

## RN-02 Reparto de cartas
- Al inicio de la partida, el sistema reparte las cartas de forma aleatoria pero equitativa.
- Si el número total de cartas es par, ambos jugadores reciben la misma cantidad.
- Si es impar, un jugador recibe una carta más; el jugador con la carta extra inicia la primera ronda.

## RN-03 Comparación de atributos
- Los atributos comparables de cada carta son: tamaño (cm), peso (g), envergadura (cm), velocidad (km/h), esperanza de vida (años) y rareza (índice 1-10).
- Gana la ronda el jugador cuyo atributo seleccionado tenga el valor numérico mayor.
- El ganador de la ronda coloca ambas cartas jugadas al final de su baraja, en orden: carta propia primero, carta del oponente después.

## RN-04 Empate
- Si ambos valores del atributo seleccionado son iguales, se declara empate.
- Las cartas del empate se colocan en una pila de reserva.
- El ganador de la siguiente ronda se lleva la pila de reserva más las cartas de esa ronda.
- Si un nuevo empate ocurre con cartas en reserva, se añaden a la pila existente.
- Si un jugador se queda sin cartas durante una cadena de empates, pierde la partida.

## RN-05 Turnos
- El ganador de la ronda anterior elige el atributo en la siguiente ronda.
- En caso de empate, el turno alterna o se mantiene según el modo de juego:
  - Contra IA: el jugador humano siempre elige atributo cuando es su turno; la IA elige cuando es su turno.
  - Hot-seat: el jugador cuya carta está visible elige el atributo.

## RN-06 Fin de partida
- La partida termina cuando un jugador se queda sin cartas.
- El ganador es el jugador que acumula todas las cartas.
- Si ambos jugadores se quedan sin cartas simultáneamente (caso borde por cadena de empates), se declara empate final.

## RN-07 Información de carta
- Cada carta muestra: nombre común, nombre científico, familia, hábitat, dieta, atribución de la fuente y los seis atributos comparables.
- Los valores de atributos se presentan normalizados (sin unidades mixtas).

## RN-08 Modos de juego
- **Modo un jugador**: humano contra IA.
- **Modo hot-seat**: dos humanos comparten el mismo dispositivo; el sistema oculta la carta del oponente durante el turno del otro.

## RN-09 Atribución de datos
- Toda la información de aves debe incluir una fuente abierta citada (por ejemplo Wikipedia, eBird, Wikidata).
- La aplicación no reclama propiedad sobre las imágenes ni datos de terceros.
