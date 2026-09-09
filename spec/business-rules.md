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
- Cada imagen (macho y hembra cuando aplica) lleva su propia atribución: fotógrafo, licencia (cc-by / cc0 / cc-by-sa) y enlace a la observación en iNaturalist.

## RN-10 Ronda bono "¿Macho o hembra?" (HU-11)
- Solo se ofrece cuando la carta oponente es de especie dimórfica.
- Se puede usar como máximo una vez por partida; tras usarse (acierto o fallo) no se vuelve a ofrecer.
- El jugador elige sexo de la imagen mostrada del oponente junto con el atributo de la ronda.
- Si acierta, gana la ronda con prioridad sobre la comparación numérica del atributo; si falla, vale el resultado normal.
- La IA no usa el bono en el MVP (solo el jugador humano).

## RN-11 Ronda especial de altitud (HU-14)
- La altitud máxima del rango (`rango_altitudinal_msnm[1]`) es un atributo oculto: no seleccionable en rondas normales.
- La ronda especial "¿Quién vive más alto?" compara altitud máxima y gana el mayor valor.
- Frecuencia sugerida: a lo sumo una vez por partida, ofrecida por el sistema (definir en implementación).

## RN-12 Combo taxonómico (HU-16)
- Ganar dos rondas consecutivas con aves del mismo orden taxonómico otorga un bonus (+1 carta extra tomada de la reserva; si la reserva está vacía, se indica el combo sin bonus material).
- La racha se reinicia al perder o empatar una ronda.
- El bonus nunca decide la partida por sí solo: solo acelera la acumulación de cartas.

## RN-13 Modo temporada y visitantes boreales (HU-15)
- Las especies migratorias boreales llevan badge "visitante boreal" con temporada de presencia (nov-feb).
- La regla de +1 en modo "temporada" está **diferida a S17**: se activará solo con el modo de juego dedicado.

## RN-14 Modo "Ornitólogo" (HU-17)
- Modo quiz independiente de la partida: se muestra foto sin nombre y 4 opciones (español / inglés / nombre científico, mezclados).
- Una ronda del quiz equivale a una pregunta; acierto suma 1 punto.
- Usa solo aves de la baraja vigente (temática o completa).

## RN-15 Empate con ave amenazada (DIFERIDA — no implementar aún)
- Propuesta futura: en empate de atributo, gana la carta con peor estado UICN (CR > EN > VU > NT > LC).
- Estado: aprobada como idea, sin HU asignada; requiere decisión del PO antes de implementar.

## RN-16 Rareza real (HU implícita en datos)
- La rareza (escala 1-10 en juego, = rareza_indice 1-5 del dataset × 2) ya refleja amenaza: las 13 especies VU/EN/CR puntúan alto sin reglas especiales.
- No requiere mecánica adicional en S16.

## RN-17 Identidad de jugadores (HU-18)
- Los nombres son opcionales y se ingresan en la pantalla de inicio (PANT-01) antes de crear la partida.
- Longitud máxima: 20 caracteres. Se recorta el espacio en blanco al inicio y al final; si queda vacío, se usa el valor por defecto.
- Valores por defecto: modo IA → jugador "Tú", oponente "IA"; modo hot-seat → "Jugador 1" y "Jugador 2".
- El nombre se envía al backend en `CreatePartidaRequest.jugador_nombre` y `oponente_nombre` (campos ya versionados en `spec/api-contract.yaml`); el backend los registra en la partida.
- El nombre (o su defecto) se usa en todo texto visible de la partida: marcador, indicador de turno, titular de la carta activa, comparación de valores por ronda, resultado de ronda y título de la pantalla final.
- La IA no tiene nombre personalizable en el MVP.

## RN-18 Copy de usuario final (HU-19)
- Ningún texto visible de la UI puede exponer códigos de trazabilidad (HU-xx, RN-xx, PANT-xx) ni jerga interna del proyecto (p. ej. "msnm" sin explicar, IDs de baraja en mensajes de error).
- La trazabilidad vive exclusivamente en el versionado: comentarios en el código fuente, spec/ y recibos.
- Los indicadores educativos se expresan en lenguaje natural (p. ej. el badge "visitante boreal" explica "Temporada en Colombia: noviembre a febrero").
