# Flujos de usuario — Top Trumps Aves de Colombia

## Flujo principal: jugar una partida contra la IA

### Paso 1: Pantalla de inicio (PANT-01)
- El jugador abre la aplicación.
- Estado: loading mientras se cargan las aves.
- Si los datos están listos: se muestran botones "Jugar contra IA" y "Dos jugadores (hot-seat)".
- Si no hay datos: estado empty/error con botón de reintentar.

### Paso 2: Configuración rápida
- El jugador selecciona "Jugar contra IA".
- El sistema reparte la baraja.
- Estado: loading breve mientras se prepara la partida.
- Transición a pantalla de juego (PANT-02).

### Paso 3: Turno del jugador (PANT-02)
- Se muestra la carta activa del jugador con sus atributos.
- El jugador selecciona un atributo.
- Estado: loading mientras se resuelve la comparación.

### Paso 4: Comparación (PANT-03)
- Se revela la carta de la IA con el atributo seleccionado.
- Se muestra resultado de la ronda (ganó/perdió/empató).
- Se actualiza contador de cartas.

### Paso 5: Continuación o fin (PANT-04)
- Si la partida continúa: se muestra la siguiente carta del ganador.
- Si la partida termina: se muestra pantalla de resultado con ganador y opción de "Jugar de nuevo".

## Estados de UI cubiertos
- **Loading**: carga inicial, preparación de partida, resolución de ronda.
- **Empty**: no hay datos de aves disponibles.
- **Error**: fallo al cargar datos; muestra mensaje amigable y botón reintentar.
- **Success**: mensaje de victoria/derrota/empate.

## Flujo hot-seat (dos jugadores)
- Similar al flujo contra IA, pero en cada turno se oculta la carta del jugador que no le toca.
- Se muestra un indicador de "Pasa el dispositivo al otro jugador".

## Flujo de prototipo gobernado
Ver `spec/ux/screen-inventory.md` para el inventario PANT-xx conectado a historias de usuario.
