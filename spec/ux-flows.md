# Flujos de usuario — Top Trumps Aves de Colombia

## Flujo principal: jugar una partida contra la IA

### Paso 1: Pantalla de inicio (PANT-01)
- El jugador abre la aplicación.
- Estado: loading mientras se cargan las aves.
- Si los datos están listos: se muestran los modos "Un jugador vs IA" y "Dos jugadores (hotseat)", los campos de nombre ("Tu nombre" en IA; "Nombre del Jugador 1/2" en hot-seat) y el selector de baraja.
- Si no hay datos: estado empty/error con botón de reintentar.

### Paso 2: Configuración rápida
- El jugador selecciona modo y baraja, y opcionalmente escribe su nombre (HU-18, RN-17: máx. 20 caracteres; en blanco se usan los defaults "Tú"/"IA" o "Jugador 1"/"Jugador 2").
- Al presionar "Nueva partida" el sistema crea la partida enviando `jugador_nombre` (y `oponente_nombre` en hot-seat) al backend.
- Estado: loading breve mientras se prepara la partida.
- Transición a pantalla de juego (PANT-02).

### Paso 3: Turno del jugador (PANT-02)
- Se muestra la carta activa del jugador con sus atributos.
- El jugador selecciona un atributo.
- Estado: loading mientras se resuelve la comparación.

### Paso 4: Comparación (PANT-03)
- Se revela la carta de la IA con el atributo seleccionado.
- Se muestra resultado de la ronda (ganó/perdió/empató) en un panel con banda de color (verde/rojo/ámbar, HU-19) y la comparación con los nombres de los jugadores (HU-18).
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
- El turno y la carta se anuncian con el nombre de cada jugador ("Turno de Ana", "Carta de Luis").

## Reglas de copy (RN-18)
- Ningún texto visible muestra códigos de trazabilidad (HU-, RN-, PANT-) ni jerga interna; la trazabilidad vive en código y spec versionados.

## Flujo de prototipo gobernado
Ver `spec/ux/screen-inventory.md` para el inventario PANT-xx conectado a historias de usuario.
