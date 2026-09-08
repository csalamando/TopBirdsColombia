# Inventario de pantallas — Top Trumps Aves de Colombia

## PANT-01 Pantalla de inicio
- **HU relacionadas**: HU-01, HU-07, HU-09
- **ROL principal**: ROL-03 Jugador casual
- **Propósito**: Dar la bienvenida y permitir iniciar una partida.
- **Interacciones**: botón "Jugar contra IA", botón "Dos jugadores (hot-seat)"; selector de baraja (Aleatoria por defecto / Colombia completa / Expedición por región con conteo de aves).
- **Estados**: loading (carga de aves y barajas), empty (sin datos), error (fallo de carga, con reintento), success (datos listos).
- **Destino**: PANT-02 al iniciar partida.

## PANT-02 Pantalla de juego
- **HU relacionadas**: HU-02, HU-05, HU-07, HU-10, HU-11, HU-14, HU-15, HU-16
- **ROL principal**: ROL-01 Aficionado a las aves
- **Propósito**: Mostrar carta activa, permitir seleccionar atributo y ver información del ave, y presentar las mecánicas especiales.
- **Interacciones**: seleccionar atributo, ver detalle de ave (PANT-05); toggle macho/hembra y badge "⚥ dimórfica" (HU-10); apuesta del bono "¿Macho o hembra?" una vez por partida (HU-11); sello UICN en amenazadas y badge "visitante boreal" (HU-12, HU-15); ronda especial "¿Quién vive más alto?" con explicación (HU-14); indicación de combo taxonómico (HU-16).
- **Estados**: loading (resolviendo ronda), empty/error (datos no disponibles), success (ronda resuelta, con indicación de bono/combo cuando aplica).
- **Destino**: PANT-03 tras seleccionar atributo.

## PANT-03 Pantalla de comparación
- **HU relacionadas**: HU-02, HU-03
- **ROL principal**: ROL-01 Aficionado a las aves
- **Propósito**: Revelar carta de la IA y mostrar resultado de la ronda.
- **Interacciones**: botón "Siguiente ronda".
- **Estados**: loading (breve), success (ganó/perdió/empató).
- **Destino**: PANT-02 si continúa; PANT-04 si termina.

## PANT-04 Pantalla de resultado
- **HU relacionadas**: HU-04, HU-13
- **ROL principal**: ROL-03 Jugador casual
- **Propósito**: Declarar ganador, mostrar el resumen de la expedición y ofrecer reinicio.
- **Interacciones**: botón "Jugar de nuevo"; lista "Tu expedición por {región}" / "Tu recorrido por Colombia" con las aves vistas (HU-13).
- **Estados**: success (victoria/derrota/empate final; lista de aves vista, empty si no hay datos).
- **Destino**: PANT-01.

## PANT-05 Detalle de ave enriquecido
- **HU relacionadas**: HU-05, HU-10, HU-12, HU-15
- **ROL principal**: ROL-02 Educador / guía
- **Propósito**: Mostrar la ficha completa del ave: fotos macho/hembra lado a lado (si dimórfica), taxonomía, hábitat, dieta, estado UICN con explicación, endemismo, estacionalidad y atribución por foto.
- **Interacciones**: alternar foto destacada, enlaces de atribución (iNaturalist).
- **Estados**: success (datos del ave), error (ave no encontrada).
- **Destino**: vuelta a PANT-02.

## PANT-06 Modo "Ornitólogo" (quiz)
- **HU relacionadas**: HU-17
- **ROL principal**: ROL-02 Educador / guía
- **Propósito**: Entrenar identificación: foto sin nombre y 4 opciones (español / inglés / científico).
- **Interacciones**: elegir opción, ver acierto/fallo con el nombre correcto y su atribución, avanzar a la siguiente carta.
- **Estados**: loading (cargando cartas), success (pregunta/resolución), end (puntaje final).
- **Destino**: PANT-01 al terminar.

## Notas de prototipo
- Prototipo de baja fidelidad disponible como archivos `.penpot` en `spec/ux/`.
- Los exports PNG/SVG se generarán tras aprobación de negocio.
- Toda pantalla implementa los estados loading, empty y error según `spec/design-system.md`.
