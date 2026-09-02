# Catálogo de roles — Top Trumps Aves de Colombia

## ROL-01 Aficionado a las aves
- **Nombre**: Aficionado a las aves
- **Acciones que habilita**: jugar partidas, explorar cartas, comparar atributos, aprender curiosidades sobre aves colombianas.
- **Contexto**: usuario con interés medio en ornitología; accede desde navegador web; busca experiencia educativa y entretenida.
- **Reglas que lo restringen**: no puede editar contenido; no requiere cuenta; solo juega contra la IA o en modo hot-seat.

## ROL-02 Educador / guía
- **Nombre**: Educador o guía de aves
- **Acciones que habilita**: usar el juego como recurso didáctico en aulas o salidas de campo; proyectar pantallas; recomendar atributos de interés.
- **Contexto**: persona que enseña sobre biodiversidad; necesita contenido confiable y visualmente atractivo.
- **Reglas que lo restringen**: no tiene funciones de administración; no puede cargar aves ni modificar atributos.

## ROL-03 Jugador casual
- **Nombre**: Jugador casual
- **Acciones que habilita**: iniciar una partida rápida, jugar contra la IA, ver resultados.
- **Contexto**: usuario que busca entretenimiento breve; no tiene conocimiento previo de aves ni del juego Top Trumps.
- **Reglas que lo restringen**: no requiere registro; no puede retomar partidas anteriores (MVP sin persistencia de estado).

## ROL-04 Sistema (IA)
- **Nombre**: IA del juego
- **Acciones que habilita**: repartir cartas, seleccionar atributo, resolver rondas, declarar ganador.
- **Contexto**: componente automatizado que actúa como oponente en modo un jugador.
- **Reglas que lo restringen**: sigue las reglas de negocio; no accede a datos externos durante la partida.
