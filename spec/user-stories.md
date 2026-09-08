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

## HU-09 Seleccionar baraja al iniciar partida
**Épica**: EP-01
**Rol**: ROL-03 Jugador casual

Como jugador casual, quiero elegir la baraja con la que se juega la partida (una región temática o la colección completa) para variar la experiencia de juego.

### Escenario 1: baraja aleatoria por defecto
```gherkin
Dado que el jugador está en la pantalla de inicio
Cuando presiona "Jugar" sin cambiar la selección
Entonces se crea la partida con una baraja temática elegida al azar por el servidor
Y la partida indica el id de la baraja usada
```

### Escenario 2: elegir Colombia completa
```gherkin
Dado que el jugador está en la pantalla de inicio
Cuando selecciona "Colombia completa"
Y presiona "Jugar"
Entonces se crea la partida repartiendo únicamente las 52 cartas de la colección completa
```

### Escenario 3: elegir expedición por región
```gherkin
Dado que el jugador está en la pantalla de inicio
Cuando selecciona "Expedición: Amazonía"
Entonces ve la cantidad de aves de esa baraja junto al nombre
Y al jugar, la partida reparte solo las cartas de esa región
```

### Escenario 4: listar barajas disponibles
```gherkin
Dado que el cliente necesita mostrar el selector
Cuando consulta GET /api/barajas
Entonces recibe la lista de barajas con id, nombre y cantidad de aves
```

### Escenario 5: baraja inválida
```gherkin
Dado que el jugador crea una partida con un id de baraja inexistente
Cuando el servidor valida la solicitud
Entonces responde 422 con un mensaje de error
```

## HU-10 Ver dimorfismo sexual en la carta (mecánica estrella)
**Épica**: EP-01
**Rol**: ROL-01 Aficionado a las aves

Como aficionado a las aves, quiero ver la foto del macho y de la hembra en las cartas dimórficas para aprender que en muchas aves ambos sexos se ven distinto.

### Escenario 1: carta dimórfica con badge y toggle
```gherkin
Dado que la carta activa es de una especie dimórfica
Cuando el jugador la ve en pantalla
Entonces lleva el badge "⚥ dimórfica"
Y puede alternar entre la foto del macho y de la hembra
```

### Escenario 2: carta no dimórfica
```gherkin
Dado que la carta activa es de una especie sin dimorfismo
Cuando el jugador la ve en pantalla
Entonces no aparece el badge ni el toggle de sexo
Y en el detalle se indica "en esta especie ambos sexos se ven igual"
```

### Escenario 3: detalle lado a lado
```gherkin
Dado que el jugador abre el detalle de una carta dimórfica
Cuando se muestra la vista ampliada
Entonces ve macho y hembra lado a lado con la atribución de cada foto
```

## HU-11 Jugar la ronda bono "¿Macho o hembra?"
**Épica**: EP-01
**Rol**: ROL-03 Jugador casual

Como jugador casual, quiero poder arriesgar a adivinar el sexo de la carta oponente para ganar la ronda aunque pierda el atributo, una vez por partida.

### Escenario 1: oponente dimórfico, se ofrece el bono
```gherkin
Dado que es el turno del jugador
Y la carta oponente es de una especie dimórfica
Y el bono no se ha usado en la partida
Cuando el jugador selecciona un atributo
Entonces puede además indicar si cree que la imagen mostrada del oponente es macho o hembra
```

### Escenario 2: acierto del sexo gana la ronda
```gherkin
Dado que el jugador activó el bono y acertó el sexo de la imagen oponente
Cuando se resuelve la ronda
Entonces gana la ronda aunque el valor de su atributo sea menor
Y el bono queda marcado como usado para el resto de la partida
```

### Escenario 3: fallo o bono ya usado
```gherkin
Dado que el jugador falló el sexo o el bono ya fue usado
Cuando se resuelve la ronda
Entonces vale el resultado normal del atributo
Y el bono usado no se vuelve a ofrecer
```

## HU-12 Ver sello de conservación UICN
**Épica**: EP-02
**Rol**: ROL-02 Educador / guía

Como educador, quiero que las aves amenazadas lleven un sello UICN visible y una explicación en el detalle para generar conciencia de conservación real.

### Escenario 1: ave amenazada con sello
```gherkin
Dado que una carta es de una especie con estado UICN VU, EN o CR
Cuando el jugador la ve en pantalla
Entonces lleva el sello de conservación con su categoría
Y en el detalle se explica por qué está amenazada
```

### Escenario 2: ave sin amenaza
```gherkin
Dado que una carta es de una especie LC o NT
Cuando el jugador la ve en pantalla
Entonces no lleva sello de amenaza
Y en el detalle se muestra su estado UICN informativo
```

## HU-13 Ver resumen "Tu expedición" al terminar
**Épica**: EP-02
**Rol**: ROL-03 Jugador casual

Como jugador casual, quiero ver al terminar la partida las aves que encontré en mi expedición para reforzar lo aprendido jugando.

### Escenario 1: partida con baraja temática
```gherkin
Dado que la partida usó una baraja temática de región
Cuando la partida finaliza
Entonces la pantalla de resultado muestra "Tu expedición por {región}"
Y lista las aves vistas durante la partida con su nombre común
```

### Escenario 2: partida con baraja completa
```gherkin
Dado que la partida usó la baraja completa
Cuando la partida finaliza
Entonces la pantalla de resultado muestra "Tu recorrido por Colombia"
Y lista las aves vistas durante la partida
```

## HU-14 Jugar la ronda especial "¿Quién vive más alto?"
**Épica**: EP-01
**Rol**: ROL-02 Educador / guía

Como educador, quiero una ronda especial que compare la altitud máxima donde vive cada ave para enseñar los pisos térmicos de Colombia sin memorizar términos.

### Escenario 1: ronda de altitud
```gherkin
Dado que se activó la ronda especial "¿Quién vive más alto?"
Cuando se comparan las cartas
Entonces gana la carta con mayor altitud máxima de su rango (msnm)
Y se muestra la explicación "esta ave llega hasta X msnm"
```

### Escenario 2: atributo oculto en juego normal
```gherkin
Dado una ronda normal
Cuando el jugador elige atributo
Entonces la altitud no aparece entre los atributos seleccionables
```

## HU-15 Identificar visitantes boreales
**Épica**: EP-01
**Rol**: ROL-01 Aficionado a las aves

Como aficionado a las aves, quiero reconocer a las aves migratorias boreales con un badge para entender cuándo visitan Colombia.

### Escenario 1: ave migratoria con badge
```gherkin
Dado que la carta es de una especie migratoria boreal
Cuando el jugador la ve en pantalla
Entonces lleva el badge "visitante boreal"
Y en el detalle se indica su temporada de presencia (nov-feb)
```

### Escenario 2: modo temporada (diferido a S17)
```gherkin
Dado que se juega el modo "temporada" (nov-feb)
Cuando una carta de visitante boreal juega una ronda
Entonces podría recibir +1 en el atributo elegido
Y la regla exacta se definirá en la implementación del modo
```

## HU-16 Ganar bonus por combo taxonómico
**Épica**: EP-01
**Rol**: ROL-01 Aficionado a las aves

Como aficionado a las aves, quiero que ganar dos rondas seguidas con aves del mismo orden taxonómico dé un bonus para aprender taxonomía jugando.

### Escenario 1: dos rondas seguidas del mismo orden
```gherkin
Dado que el jugador ganó la ronda anterior con un ave de un orden
Cuando gana la ronda actual con otra ave del mismo orden
Entonces recibe un bonus de +1 carta extra de la reserva o se indica el combo logrado
Y se muestra "las dos aves son del orden {orden}"
```

### Escenario 2: romper la racha
```gherkin
Dado que el jugador ganó la ronda anterior
Cuando pierde o empata la ronda actual
Entonces la racha de combo se reinicia
```

## HU-17 Jugar el modo "Ornitólogo" (quiz de identificación)
**Épica**: EP-02
**Rol**: ROL-02 Educador / guía

Como educador, quiero un modo quiz donde se muestra la foto de un ave sin nombre y hay que elegir entre cuatro opciones, para entrenar identificación con nombres en español, inglés y científico.

### Escenario 1: pregunta con 4 opciones
```gherkin
Dado que el jugador inició el modo "Ornitólogo"
Cuando se presenta una carta
Entonces ve la foto sin nombre
Y cuatro opciones de nombre usando español, inglés o nombre científico
```

### Escenario 2: respuesta y explicación
```gherkin
Dado que el jugador eligió una opción
Cuando se resuelve la pregunta
Entonces se indica si acertó
Y se muestra el nombre correcto con su atribución
```
