import { http, HttpResponse } from "msw";
import type { Bird, Game, RoundResult } from "../types";

const mockBirds: Bird[] = [
  {
    id: 1,
    nombre_comun: "Guacamaya Bandera",
    nombre_cientifico: "Ara macao",
    familia: "Psittacidae",
    habitat: "Bosques húmedos tropicales",
    dieta: "Frugívora",
    atribucion: "Wikipedia",
    imagen_url: null,
    atributos: {
      tamano_cm: 84,
      peso_g: 1000,
      envergadura_cm: 110,
      velocidad_kmh: 56,
      esperanza_vida_anos: 50,
      rareza: 4,
    },
  },
  {
    id: 2,
    nombre_comun: "Colibrí de Buffon",
    nombre_cientifico: "Chalybura buffonii",
    familia: "Trochilidae",
    habitat: "Bosques húmedos",
    dieta: "Néctar e insectos",
    atribucion: "Wikipedia",
    imagen_url: null,
    atributos: {
      tamano_cm: 11,
      peso_g: 7,
      envergadura_cm: 13,
      velocidad_kmh: 50,
      esperanza_vida_anos: 8,
      rareza: 6,
    },
  },
];

const mockGame: Game = {
  id: "game-1",
  modo: "ia",
  estado: "activa",
  turno: "jugador",
  cartas_jugador: 3,
  cartas_oponente: 3,
  carta_activa: mockBirds[0],
  ganador: null,
};

export const handlers = [
  http.get("/api/aves", () => {
    return HttpResponse.json({ items: mockBirds });
  }),

  http.get("/api/aves/:id", ({ params }) => {
    const bird = mockBirds.find((b) => b.id === Number(params.id));
    if (!bird) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(bird);
  }),

  http.post("/api/partidas", async ({ request }) => {
    const body = (await request.json()) as { modo: string; jugador_nombre?: string };
    const newGame: Game = {
      ...mockGame,
      id: "new-game-1",
      modo: body.modo === "ia" ? "ia" : "hotseat",
    };
    return HttpResponse.json(newGame, { status: 201 });
  }),

  http.get("/api/partidas/:id", ({ params }) => {
    if (params.id === "not-found") {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(mockGame);
  }),

  http.post("/api/partidas/:id/rondas", async ({ request }) => {
    const body = (await request.json()) as { atributo: string };
    const result: RoundResult = {
      atributo: body.atributo,
      valor_jugador: 84,
      valor_oponente: 11,
      resultado: "gana_jugador",
      carta_jugador: mockBirds[0],
      carta_oponente: mockBirds[1],
      cartas_jugador: 4,
      cartas_oponente: 2,
      reserva: 0,
      ganador_partida: null,
    };
    return HttpResponse.json(result);
  }),
];
