// Trazabilidad SDLC: HU-01, HU-05
import { describe, expect, it } from "vitest";
import { http, HttpResponse } from "msw";
import { server } from "../mocks/server";
import { createGame, fetchBirds, fetchGame, playRound } from "./api";

describe("api services", () => {
  it("fetches birds", async () => {
    const birds = await fetchBirds();
    expect(birds).toHaveLength(2);
    expect(birds[0].nombre_comun).toBe("Guacamaya Bandera");
  });

  it("throws when birds endpoint fails", async () => {
    server.use(
      http.get("/api/aves", () => {
        return new HttpResponse(null, { status: 500 });
      })
    );
    await expect(fetchBirds()).rejects.toThrow("No se pudieron cargar las aves");
  });

  it("creates a game", async () => {
    const game = await createGame("ia");
    expect(game.id).toBe("new-game-1");
    expect(game.modo).toBe("ia");
  });

  it("fetches game state", async () => {
    const game = await fetchGame("game-1");
    expect(game.id).toBe("game-1");
    expect(game.estado).toBe("activa");
  });

  it("throws when game is not found", async () => {
    await expect(fetchGame("not-found")).rejects.toThrow("Partida no encontrada");
  });

  it("plays a round", async () => {
    const result = await playRound("game-1", "tamano_cm");
    expect(result.atributo).toBe("tamano_cm");
    expect(result.resultado).toBe("gana_jugador");
  });
});
