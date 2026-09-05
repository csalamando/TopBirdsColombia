// Trazabilidad SDLC: HU-01, HU-05
import type { AttributeKey, Bird, Game, GameMode, RoundResult } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

export async function fetchBirds(): Promise<Bird[]> {
  const response = await fetch(`${API_BASE_URL}/aves`);
  if (!response.ok) {
    throw new Error("No se pudieron cargar las aves");
  }
  const data = (await response.json()) as { items: Bird[] };
  return data.items;
}

export async function fetchBird(id: number): Promise<Bird> {
  const response = await fetch(`${API_BASE_URL}/aves/${id}`);
  if (!response.ok) {
    throw new Error("Ave no encontrada");
  }
  return (await response.json()) as Bird;
}

export async function createGame(mode: GameMode): Promise<Game> {
  const response = await fetch(`${API_BASE_URL}/partidas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ modo: mode }),
  });
  if (!response.ok) {
    throw new Error("No se pudo crear la partida");
  }
  return (await response.json()) as Game;
}

export async function fetchGame(id: string): Promise<Game> {
  const response = await fetch(`${API_BASE_URL}/partidas/${id}`);
  if (!response.ok) {
    throw new Error("Partida no encontrada");
  }
  return (await response.json()) as Game;
}

export async function playRound(
  gameId: string,
  attribute: AttributeKey
): Promise<RoundResult> {
  const response = await fetch(`${API_BASE_URL}/partidas/${gameId}/rondas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ atributo: attribute }),
  });
  if (!response.ok) {
    throw new Error("No se pudo jugar la ronda");
  }
  return (await response.json()) as RoundResult;
}
