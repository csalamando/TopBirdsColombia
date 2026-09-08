export type AttributeKey =
  | "tamano_cm"
  | "peso_g"
  | "envergadura_cm"
  | "velocidad_kmh"
  | "esperanza_vida_anos"
  | "rareza"
  | "altitud_max_msnm";

export interface Attributes {
  tamano_cm: number;
  peso_g: number;
  envergadura_cm: number;
  velocidad_kmh: number;
  esperanza_vida_anos: number;
  rareza: number;
  altitud_max_msnm?: number | null;
}

export type Sexo = "macho" | "hembra" | "indeterminado";

export interface VarianteImagen {
  sexo: Sexo;
  es_principal: boolean;
  thumbnail_url?: string | null;
  fotografo?: string | null;
  licencia?: "cc-by" | "cc0" | "cc-by-sa" | null;
  url_observacion?: string | null;
}

export interface Bird {
  id: number;
  nombre_comun: string;
  nombre_cientifico: string;
  nombre_ingles?: string | null;
  orden?: string | null;
  familia?: string | null;
  habitat?: string | null;
  dieta?: string | null;
  atribucion?: string | null;
  imagen_url?: string | null;
  estado_conservacion_uicn?: "LC" | "NT" | "VU" | "EN" | "CR" | null;
  endemismo?: string | null;
  es_dimorfica?: boolean;
  estacionalidad?: string | null;
  regiones?: string[];
  variantes_imagen?: VarianteImagen[];
  atributos: Attributes;
}

export interface DeckInfo {
  id: string;
  nombre: string;
  cantidad: number;
}

export type GameMode = "ia" | "hotseat";
export type Turn = "jugador" | "oponente";
export type GameState = "activa" | "finalizada";
export type Winner = "jugador" | "oponente" | "empate";

export interface RoundResult {
  atributo: string;
  valor_jugador: number;
  valor_oponente: number;
  resultado: "gana_jugador" | "gana_oponente" | "empate";
  carta_jugador?: Bird | null;
  carta_oponente?: Bird | null;
  cartas_jugador: number;
  cartas_oponente: number;
  reserva: number;
  ganador_partida?: Winner | null;
  bono_ofrecido?: boolean;
  bono_acierto?: boolean | null;
  combo_orden?: string | null;
  combo_bonus?: boolean;
}

export interface Game {
  id: string;
  modo: GameMode;
  baraja?: string;
  estado: GameState;
  turno: Turn;
  cartas_jugador: number;
  cartas_oponente: number;
  carta_activa?: Bird | null;
  ganador?: Winner | null;
  bono_dimorfico_usado?: boolean;
}
