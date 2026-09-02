# Inventario de pantallas — Top Trumps Aves de Colombia

## PANT-01 Pantalla de inicio
- **HU relacionadas**: HU-01, HU-07
- **ROL principal**: ROL-03 Jugador casual
- **Propósito**: Dar la bienvenida y permitir iniciar una partida.
- **Interacciones**: botón "Jugar contra IA", botón "Dos jugadores (hot-seat)".
- **Estados**: loading (carga de aves), empty (sin datos), error (fallo de carga), success (datos listos).
- **Destino**: PANT-02 al iniciar partida.

## PANT-02 Pantalla de juego
- **HU relacionadas**: HU-02, HU-05, HU-07
- **ROL principal**: ROL-01 Aficionado a las aves
- **Propósito**: Mostrar carta activa, permitir seleccionar atributo y ver información del ave.
- **Interacciones**: seleccionar atributo, ver detalle de ave (tooltip/modal).
- **Estados**: loading (resolviendo ronda), empty/error (datos no disponibles), success (ronda resuelta).
- **Destino**: PANT-03 tras seleccionar atributo.

## PANT-03 Pantalla de comparación
- **HU relacionadas**: HU-02, HU-03
- **ROL principal**: ROL-01 Aficionado a las aves
- **Propósito**: Revelar carta de la IA y mostrar resultado de la ronda.
- **Interacciones**: botón "Siguiente ronda".
- **Estados**: loading (breve), success (ganó/perdió/empató).
- **Destino**: PANT-02 si continúa; PANT-04 si termina.

## PANT-04 Pantalla de resultado
- **HU relacionadas**: HU-04
- **ROL principal**: ROL-03 Jugador casual
- **Propósito**: Declarar ganador y ofrecer reinicio.
- **Interacciones**: botón "Jugar de nuevo".
- **Estados**: success (victoria/derrota/empate final).
- **Destino**: PANT-01.

## Notas de prototipo
- Prototipo de baja fidelidad disponible como archivos `.penpot` en `spec/ux/`.
- Los exports PNG/SVG se generarán tras aprobación de negocio.
- Toda pantalla implementa los estados loading, empty y error según `spec/design-system.md`.
