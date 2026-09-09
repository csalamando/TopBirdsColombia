// Trazabilidad SDLC: HU-08, HU-09
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
    await waitFor(() =>
      expect(onStartGame).toHaveBeenCalledWith("new-game-1", "ia", undefined)
    );
  });

  it("pasa el nickname del jugador al iniciar la partida", async () => {
    let capturedBody: { jugador_nombre?: string } = {};
    server.use(
      http.post("/api/partidas", async ({ request }) => {
        capturedBody = (await request.json()) as { jugador_nombre?: string };
        return HttpResponse.json({ id: "new-game-1", modo: "ia" }, { status: 201 });
      })
    );
    const onStartGame = vi.fn();
    render(<Home onStartGame={onStartGame} />);
    await userEvent.type(screen.getByLabelText(/Tu nombre/), "Karlo");
    await userEvent.click(screen.getByRole("button", { name: /Nueva partida/i }));
    await waitFor(() => expect(capturedBody.jugador_nombre).toBe("Karlo"));
    await waitFor(() =>
      expect(onStartGame).toHaveBeenCalledWith("new-game-1", "ia", {
        jugador: "Karlo",
        oponente: undefined,
      })
    );
  });

  it("pide los dos nombres en modo hotseat", async () => {
    render(<Home onStartGame={() => {}} />);
    await userEvent.click(screen.getByLabelText(/Dos jugadores/));
    expect(screen.getByLabelText(/Nombre del Jugador 1/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nombre del Jugador 2/)).toBeInTheDocument();
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

  it("renders deck selector with Aleatoria default and region counts", async () => {
    render(<Home onStartGame={() => {}} />);
    expect(await screen.findByLabelText(/Aleatoria/)).toBeChecked();
    expect(screen.getByLabelText(/Colombia completa · 52 aves/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Expedición: Amazonía · 24 aves/)).toBeInTheDocument();
  });

  it("muestra cada baraja como tarjeta con su imagen representativa (HU-09, RN-20)", async () => {
    render(<Home onStartGame={() => {}} />);
    await screen.findByLabelText(/Aleatoria/);
    const srcs = screen
      .getAllByRole("img")
      .map((img) => img.getAttribute("src") ?? "");
    expect(srcs).toContain("/cards/completa-representativa.jpg");
    expect(srcs).toContain("/cards/amazonia-representativa.jpg");
    expect(srcs.some((s) => s.endsWith(".webp"))).toBe(false);
    // la opción "Aleatoria" no tiene imagen: usa placeholder
    expect(
      screen.getByLabelText(/Aleatoria/).querySelector("img")
    ).toBeNull();
  });

  it("creates a game with the selected deck", async () => {
    let capturedBody: { baraja?: string } = {};
    server.use(
      http.post("/api/partidas", async ({ request }) => {
        capturedBody = (await request.json()) as { baraja?: string };
        return HttpResponse.json(
          {
            id: "new-game-1",
            modo: "ia",
            baraja: capturedBody.baraja ?? "aleatoria",
            estado: "activa",
            turno: "jugador",
            cartas_jugador: 26,
            cartas_oponente: 26,
            ganador: null,
          },
          { status: 201 }
        );
      })
    );
    render(<Home onStartGame={() => {}} />);
    await screen.findByLabelText(/Aleatoria/);
    await userEvent.click(screen.getByLabelText(/Colombia completa · 52 aves/));
    await userEvent.click(screen.getByRole("button", { name: /Nueva partida/i }));
    await waitFor(() => expect(capturedBody.baraja).toBe("completa"));
  });

  it("shows error state when decks fail to load", async () => {
    server.use(
      http.get("/api/barajas", () => {
        return new HttpResponse(null, { status: 500 });
      })
    );
    render(<Home onStartGame={() => {}} />);
    expect(
      await screen.findByText(/No se pudieron cargar las barajas/i)
    ).toBeInTheDocument();
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

  it("muestra los nombres personalizados en marcador y resultado", async () => {
    render(
      <Game
        gameId="game-1"
        mode="hotseat"
        playerName="Ana"
        opponentName="Luis"
        onGameEnd={() => {}}
        onExit={() => {}}
      />
    );
    await screen.findByText("Elige un atributo");
    expect(screen.getByTestId("scoreboard")).toHaveTextContent("Ana");
    expect(screen.getByTestId("scoreboard")).toHaveTextContent("Luis");
    await userEvent.click(screen.getByRole("button", { name: /Tamaño/ }));
    expect(await screen.findByText(/Ana: 84 vs Luis: 11/)).toBeInTheDocument();
    expect(screen.getByTestId("round-result")).toHaveTextContent("¡Ana gana la ronda!");
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

  it("muestra el nombre del ganador cuando se provee", () => {
    render(
      <Result
        winner="jugador"
        playerName="Ana"
        onNewGame={() => {}}
        onHome={() => {}}
      />
    );
    expect(screen.getByText("¡Ana ganó la partida!")).toBeInTheDocument();
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
