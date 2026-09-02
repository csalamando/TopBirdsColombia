# Visión de producto — Top Trumps Aves de Colombia

## Problema
Los aficionados a las aves de Colombia y el público general no tienen una forma lúdica, accesible y visual de aprender sobre la riqueza ornitológica del país. Las guías existentes son técnicas o estáticas; no existe un juego digital educativo y entretenido centrado en aves colombianas.

## Propuesta de valor
Una aplicación web tipo *Top Trumps* con aves de Colombia, donde cada carta representa un ave con atributos comparables (tamaño, peso, envergadura, velocidad, esperanza de vida, rareza). Los jugadores compiten eligiendo el atributo que creen superior para ganar cartas de su oponente, aprendiendo sobre biodiversidad mientras juegan.

## Objetivo principal del proyecto
Demostrar el funcionamiento completo del arnés SDLC (SDD + TDD + RDD) en 15 sprints, produciendo una aplicación jugable y un pipeline gobernado con recibos verificables.

## Usuarios objetivo
1. **ROL-01 Aficionado a las aves**: persona con interés medio en aves; busca aprender mientras juega.
2. **ROL-02 Educador / guía**: usa el juego como recurso didáctico en aulas o salidas de campo.
3. **ROL-03 Jugador casual**: persona que busca un juego de cartas rápido y gratuito en el navegador.

## Métricas de éxito por épica
- **E1 Juego jugable**: 100% de las historias del MVP verificadas E2E.
- **E2 Datos de aves**: ≥50 aves colombianas cargadas con atribución de fuente abierta.
- **E3 Experiencia visual**: prototipo de pantallas aprobado por negocio antes de implementar frontend.
- **E4 Calidad técnica**: cobertura de tests ≥70%, cero vulnerabilidades críticas/alta.
- **E5 Entrega demo**: aplicación desplegada en un entorno demo accesible.

## Alcance del MVP
- Un jugador humano contra IA o contra otro humano en el mismo dispositivo (hot-seat).
- Baraja inicial de 52 aves de Colombia.
- Comparación por atributo con reglas de desempate.
- Diseño responsive para web.

## Fuera de alcance del MVP
- Multijugador online en tiempo real.
- Sistema de cuentas / login.
- Leaderboard persistente en servidor.
- Aplicaciones móviles nativas.

## Restricciones
- No se almacena PII ni credenciales de usuarios.
- Datos de aves desde fuentes abiertas con atribución.
- Presupuesto demo cercano a cero (hosting estático gratuito o contenedor local).
