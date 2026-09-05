// Trazabilidad SDLC: HU-08
import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { server } from "../mocks/server";
import App from "../App";
import { Home } from "./Home";
import { Game } from "./Game";
import { Result } from "./Result";
import type { Game as GameType } from "../types";

describe("Home screen", () => {
  it("renders title and default IA mode", () => {
    render(<Home onStartGame={() => {}} />);
    expect(screen.getByText("Top Trumps Aves de Colombia")).toBeInTheDocument();
    expect(screen.getByLabelText(/Un jugador vs IA/)).toBeChecked();
  });

  it("switches game mode", async () => {
    render(<Home onStartGame={() => {}} />);
    const hotseat = screen.getByLabelText(/Dos jugadores/);
    await userEvent.click(hotseat);
    expect(hotseat).toBeChecked();
  });

  it("creates a game and calls onStartGame", async () => {
    const onStartGame = vi.fn();
    render(<Home onStartGame={onStartGame} />);
    await userEvent.click(screen.getByRole("button", { name: /Nueva partida/i }));
    await waitFor(() => expect(onStartGame).toHaveBeenCalledWith("new-game-1", "ia"));
  });

  it("shows error when create game fails", async () => {
    server.use(
      http.post("/api/partidas", () => {
        return new HttpResponse(null, { status: 500 });
      })
    );
    render(<Home onStartGame={() => {}} />);
    await userEvent.click(screen.getByRole("button", { name: /Nueva partida/i }));
    expect(await screen.findByText(/No se pudo crear la partida/i)).toBeInTheDocument();
  });
});

describe("Game screen", () => {
  it("loads and displays the game", async () => {
    render(<Game gameId="game-1" mode="ia" onGameEnd={() => {}} onExit={() => {}} />);
    expect(await screen.findByText("Tu carta")).toBeInTheDocument();
    expect(screen.getByText("Guacamaya Bandera")).toBeInTheDocument();
    expect(screen.getByText("Elige un atributo")).toBeInTheDocument();
  });

  it("plays a round when selecting an attribute", async () => {
    render(<Game gameId="game-1" mode="ia" onGameEnd={() => {}} onExit={() => {}} />);
    await screen.findByText("Elige un atributo");
    await userEvent.click(screen.getByRole("button", { name: /Tamaño/ }));
    expect(await screen.findByText(/Ganaste la ronda/i)).toBeInTheDocument();
  });

  it("shows attribute selection on opponent turn", async () => {
    server.use(
      http.get("/api/partidas/:id", () => {
        const game: GameType = {
          id: "game-1",
          modo: "ia",
          estado: "activa",
          turno: "oponente",
          cartas_jugador: 3,
          cartas_oponente: 3,
          carta_activa: {
            id: 1,
            nombre_comun: "Guacamaya Bandera",
            nombre_cientifico: "Ara macao",
            atributos: {
              tamano_cm: 84,
              peso_g: 1000,
              envergadura_cm: 110,
              velocidad_kmh: 56,
              esperanza_vida_anos: 50,
              rareza: 4,
            },
          },
          ganador: null,
        };
        return HttpResponse.json(game);
      })
    );
    render(<Game gameId="game-1" mode="ia" onGameEnd={() => {}} onExit={() => {}} />);
    expect(await screen.findByText("Elige un atributo")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Tamaño/ })).toBeInTheDocument();
  });

  it("shows error state when game is not found", async () => {
    render(<Game gameId="not-found" mode="ia" onGameEnd={() => {}} onExit={() => {}} />);
    expect(await screen.findByText(/Partida no encontrada/i)).toBeInTheDocument();
  });
});

describe("Result screen", () => {
  it("displays player victory", () => {
    render(<Result winner="jugador" onNewGame={() => {}} onHome={() => {}} />);
    expect(screen.getByText("¡Ganaste la partida!")).toBeInTheDocument();
  });

  it("displays opponent defeat", () => {
    render(<Result winner="oponente" onNewGame={() => {}} onHome={() => {}} />);
    expect(screen.getByText("Perdiste la partida")).toBeInTheDocument();
  });

  it("calls callbacks", async () => {
    const onNewGame = vi.fn();
    const onHome = vi.fn();
    render(<Result winner="empate" onNewGame={onNewGame} onHome={onHome} />);
    await userEvent.click(screen.getByRole("button", { name: /Nueva partida/i }));
    await userEvent.click(screen.getByRole("button", { name: /Volver al inicio/i }));
    expect(onNewGame).toHaveBeenCalled();
    expect(onHome).toHaveBeenCalled();
  });
});

describe("App flow", () => {
  it("starts at home and navigates through a game to result", async () => {
    server.use(
      http.post("/api/partidas/:id/rondas", async ({ request }) => {
        const body = (await request.json()) as { atributo: string };
        return HttpResponse.json({
          atributo: body.atributo,
          valor_jugador: 84,
          valor_oponente: 11,
          resultado: "gana_jugador",
          carta_jugador: null,
          carta_oponente: null,
          cartas_jugador: 6,
          cartas_oponente: 0,
          reserva: 0,
          ganador_partida: "jugador",
        });
      })
    );

    render(<App />);
    await userEvent.click(screen.getByRole("button", { name: /Nueva partida/i }));
    await screen.findByText("Elige un atributo");
    await userEvent.click(screen.getByRole("button", { name: /Tamaño/ }));
    expect(await screen.findByText("¡Ganaste la partida!")).toBeInTheDocument();
  });
});
