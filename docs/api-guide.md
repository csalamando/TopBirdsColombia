# Guía de la API — Top Trumps Aves de Colombia

Base URL local: `http://localhost:8000`

## Endpoints

### `GET /health`

Verifica que el backend esté activo.

```json
{ "status": "ok" }
```

### `GET /aves`

Lista todas las aves disponibles.

```json
{
  "items": [
    {
      "id": 1,
      "nombre_comun": "Guacamaya Bandera",
      "nombre_cientifico": "Ara macao",
      "atributos": { ... }
    }
  ]
}
```

### `GET /aves/{id}`

Obtiene una ave por ID.

### `POST /partidas`

Crea una nueva partida.

**Body:**

```json
{
  "modo": "ia"
}
```

Valores permitidos: `"ia"`, `"hotseat"`.

**Respuesta 201:**

```json
{
  "id": "<uuid>",
  "modo": "ia",
  "estado": "activa",
  "turno": "jugador",
  "cartas_jugador": 3,
  "cartas_oponente": 3,
  "carta_activa": { ... },
  "ganador": null
}
```

### `GET /partidas/{id}`

Obtiene el estado actual de una partida.

### `POST /partidas/{id}/rondas`

Juega una ronda seleccionando un atributo.

**Body:**

```json
{
  "atributo": "tamano_cm"
}
```

Atributos válidos:

- `tamano_cm`
- `peso_g`
- `envergadura_cm`
- `velocidad_kmh`
- `esperanza_vida_anos`
- `rareza`

**Respuesta 200:**

```json
{
  "atributo": "tamano_cm",
  "valor_jugador": 84.0,
  "valor_oponente": 11.0,
  "resultado": "gana_jugador",
  "cartas_jugador": 4,
  "cartas_oponente": 2,
  "reserva": 0,
  "ganador_partida": null
}
```

Valores de `resultado`: `"gana_jugador"`, `"gana_oponente"`, `"empate"`.

## Códigos de error

- `404`: Partida o ave no encontrada.
- `409`: Partida finalizada o conflicto de estado.
- `422`: Solicitud con cuerpo inválido.

## Contrato completo

Ver `spec/api-contract.yaml` (OpenAPI 3.0.3).
