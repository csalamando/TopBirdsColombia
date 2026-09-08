from pydantic import BaseModel, Field, ConfigDict, field_validator
from typing import Literal

from app.barajas import list_barajas


class HealthStatus(BaseModel):
    status: str = Field(..., json_schema_extra={"example": "ok"})


class Atributos(BaseModel):
    tamano_cm: float
    peso_g: float
    envergadura_cm: float
    velocidad_kmh: float
    esperanza_vida_anos: float
    rareza: int = Field(..., ge=1, le=10)
    altitud_max_msnm: float | None = Field(
        default=None, description="Atributo oculto (RN-11); solo se compara en la ronda especial"
    )


class VarianteImagen(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    sexo: Literal["macho", "hembra", "indeterminado"]
    es_principal: bool
    thumbnail_url: str | None = None
    fotografo: str | None = None
    licencia: Literal["cc-by", "cc0", "cc-by-sa"] | None = None
    url_observacion: str | None = None


class Ave(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    nombre_comun: str
    nombre_cientifico: str
    nombre_ingles: str | None = None
    orden: str | None = None
    familia: str | None = None
    habitat: str | None = None
    dieta: str | None = None
    atribucion: str | None = None
    imagen_url: str | None = None
    estado_conservacion_uicn: Literal["LC", "NT", "VU", "EN", "CR"] | None = None
    endemismo: str | None = None
    es_dimorfica: bool = False
    estacionalidad: str | None = None
    regiones: list[str] = Field(default_factory=list)
    variantes_imagen: list[VarianteImagen] = Field(default_factory=list)
    atributos: Atributos


class CreatePartidaRequest(BaseModel):
    modo: Literal["ia", "hotseat"]
    jugador_nombre: str | None = None
    baraja: str = "aleatoria"

    @field_validator("baraja")
    @classmethod
    def _baraja_existe(cls, v: str) -> str:
        validas = {"aleatoria", "completa"} | {b.id for b in list_barajas()}
        if v not in validas:
            raise ValueError(f"Baraja no encontrada: {v}")
        return v


class BarajaInfo(BaseModel):
    id: str
    nombre: str
    cantidad: int


class Partida(BaseModel):
    id: str
    modo: Literal["ia", "hotseat"]
    baraja: str
    estado: Literal["activa", "finalizada"]
    turno: Literal["jugador", "oponente"]
    cartas_jugador: int
    cartas_oponente: int
    carta_activa: Ave | None = None
    ganador: Literal["jugador", "oponente", "empate"] | None = None
    bono_dimorfico_usado: bool = False


class PlayRondaRequest(BaseModel):
    atributo: Literal[
        "tamano_cm",
        "peso_g",
        "envergadura_cm",
        "velocidad_kmh",
        "esperanza_vida_anos",
        "rareza",
        "altitud_max_msnm",
    ]
    sexo_oponente: Literal["macho", "hembra"] | None = Field(
        default=None, description="RN-10; apuesta del bono '¿Macho o hembra?' (solo si aplica)"
    )


class RondaResult(BaseModel):
    atributo: str
    valor_jugador: float
    valor_oponente: float
    resultado: Literal["gana_jugador", "gana_oponente", "empate"]
    carta_jugador: Ave | None = None
    carta_oponente: Ave | None = None
    cartas_jugador: int
    cartas_oponente: int
    reserva: int
    ganador_partida: Literal["jugador", "oponente", "empate"] | None = None
    bono_ofrecido: bool = False
    bono_acierto: bool | None = None
    combo_orden: str | None = None
    combo_bonus: bool = False


class Error(BaseModel):
    detail: str
