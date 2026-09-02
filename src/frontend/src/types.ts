export type AttributeKey =
  | "tamano_cm"
  | "peso_g"
  | "envergadura_cm"
  | "velocidad_kmh"
  | "esperanza_vida_anos"
  | "rareza";

export interface Attributes {
  tamano_cm: number;
  peso_g: number;
  envergadura_cm: number;
  velocidad_kmh: number;
  esperanza_vida_anos: number;
  rareza: number;
}

export interface Bird {
  id: number;
  nombre_comun: string;
  nombre_cientifico: string;
  familia?: string | null;
  habitat?: string | null;
  dieta?: string | null;
  atribucion?: string | null;
  imagen_url?: string | null;
  atributos: Attributes;
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
}

export interface Game {
  id: string;
  modo: GameMode;
  estado: GameState;
  turno: Turn;
  cartas_jugador: number;
  cartas_oponente: number;
  carta_activa?: Bird | null;
  ganador?: Winner | null;
}
