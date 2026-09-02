# Historias de usuario — Top Trumps Aves de Colombia

## HU-01 Iniciar partida contra la IA
**Épica**: EP-01
**Rol**: ROL-03 Jugador casual

Como jugador casual, quiero iniciar una partida contra la IA para empezar a jugar rápidamente.

### Escenario 1: inicio desde pantalla principal
```gherkin
Dado que el jugador está en la pantalla de inicio
Cuando selecciona "Jugar contra IA"
Entonces se crea una partida con una baraja repartida entre jugador e IA
Y el sistema muestra la primera carta del jugador con sus atributos visibles
```

### Escenario 2: baraja única sin repetición
```gherkin
Dado que el jugador inicia una partida
Cuando se reparten las cartas
Entonces cada carta aparece solo una vez en la partida
Y jugador e IA reciben el mismo número de cartas
```

## HU-02 Seleccionar atributo de carta
**Épica**: EP-01
**Rol**: ROL-01 Aficionado a las aves

Como aficionado a las aves, quiero seleccionar un atributo de mi carta para competir contra la IA.

### Escenario 1: turno del jugador
```gherkin
Dado que es el turno del jugador
Cuando selecciona un atributo de su carta activa
Entonces se revela el valor del mismo atributo en la carta de la IA
Y se compara para determinar el ganador de la ronda
```

### Escenario 2: atributo con valor numérico mayor gana
```gherkin
Dado que el jugador selecciona "envergadura"
Cuando el valor de envergadura del jugador es mayor que el de la IA
Entonces el jugador gana la ronda
Y acumula ambas cartas al final de su baraja
```

## HU-03 Resolver ronda con empate
**Épica**: EP-01
**Rol**: ROL-03 Jugador casual

Como jugador casual, quiero que los empates se resuelvan con una regla clara para continuar el juego.

### Escenario 1: empate por igual valor
```gherkin
Dado que jugador e IA tienen el mismo valor en el atributo seleccionado
Cuando se resuelve la ronda
Entonces las cartas quedan en reserva para el próximo ganador
Y el turno pasa al jugador que no eligió el atributo (o se mantiene según regla de negocio RN-03)
```

## HU-04 Determinar ganador de la partida
**Épica**: EP-01
**Rol**: ROL-03 Jugador casual

Como jugador casual, quiero saber cuándo termina la partida y quién ganó.

### Escenario 1: un jugador se queda sin cartas
```gherkin
Dado que un jugador se ha quedado sin cartas
Cuando termina la ronda en curso
Entonces la partida finaliza
Y se declara ganador al jugador que tiene todas las cartas
```

### Escenario 2: victoria por acumulación
```gherkin
Dado que el jugador ha acumulado todas las cartas de la baraja
Cuando termina la ronda
Entonces el sistema muestra un mensaje de victoria
Y ofrece la opción de jugar otra partida
```

## HU-05 Ver información de un ave
**Épica**: EP-02
**Rol**: ROL-02 Educador / guía

Como educador, quiero ver información detallada de cada ave para usarla como recurso didáctico.

### Escenario 1: carta con atributos visibles
```gherkin
Dado que una carta está en juego
Cuando el jugador consulta la carta
Entonces ve nombre común, nombre científico, familia, hábitat, dieta y atribución de la fuente
```

## HU-06 Jugar en modo hot-seat (dos humanos)
**Épica**: EP-01
**Rol**: ROL-01 Aficionado a las aves

Como aficionado a las aves, quiero jugar contra otra persona en el mismo dispositivo para compartir la experiencia.

### Escenario 1: alternar turnos ocultando cartas
```gherkin
Dado que dos jugadores humanos juegan en el mismo dispositivo
Cuando es turno del jugador 2
Entonces el sistema oculta la carta del jugador 1
Y muestra solo la carta del jugador 2 para que elija atributo
```

## HU-07 Recuperar de estado de carga
**Épica**: EP-03
**Rol**: ROL-03 Jugador casual

Como jugador casual, quiero ver estados de carga, vacío y error para entender qué está pasando.

### Escenario 1: carga inicial de datos
```gherkin
Dado que el juego está cargando las aves
Cuando los datos aún no están listos
Entonces se muestra un indicador de carga
Y no aparece la pantalla de juego hasta que termine
```

### Escenario 2: error al cargar aves
```gherkin
Dado que falla la carga de datos de aves
Cuando el sistema no puede obtener la baraja
Entonces se muestra un mensaje de error amigable
Y se ofrece un botón para reintentar
```

## HU-08 Interfaz responsive
**Épica**: EP-03
**Rol**: ROL-03 Jugador casual

Como jugador casual, quiero usar el juego en dispositivos móviles y escritorio.

### Escenario 1: adaptación de layout
```gherkin
Dado que el jugador abre el juego en un teléfono
Cuando la pantalla es menor que 768px
Entonces el layout se adapta a una columna
Y los botones de atributo son tocables sin zoom
```
