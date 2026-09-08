// Trazabilidad SDLC: HU-10..HU-17, RN-10, RN-11, RN-12, RN-14
import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { server } from "../mocks/server";
import { Card } from "../components/Card";
import { Game } from "./Game";
import { Result } from "./Result";
import { Ornitologo } from "./Ornitologo";
import type { Bird, Game as GameType, RoundResult } from "../types";

const atributosBase = {
  tamano_cm: 15,
  peso_g: 100,
  envergadura_cm: 50,
  velocidad_kmh: 40,
  esperanza_vida_anos: 10,
  rareza: 5,
  altitud_max_msnm: 2000,
};

export const dimorphicBird: Bird = {
  id: 1,
  nombre_comun: "Cometa colivioleta",
  nombre_cientifico: "Aglaiocercus coelestis",
  nombre_ingles: "Violet-tailed Sylph",
  orden: "Apodiformes",
  familia: "Trochilidae",
  habitat: "Bosques montanos",
  dieta: "Néctar",
  atribucion: "(c) Luis G Restrepo · iNaturalist (cc-by)",
  imagen_url: "/cards/aglaiocercus_coelestis_macho.webp",
  estado_conservacion_uicn: "LC",
  endemismo: null,
  es_dimorfica: true,
  estacionalidad: "Residente",
  regiones: ["andina"],
  variantes_imagen: [
    {
      sexo: "macho",
      es_principal: true,
      thumbnail_url: "/cards/aglaiocercus_coelestis_macho.webp",
      fotografo: "(c) Luis G Restrepo",
      licencia: "cc-by",
      url_observacion: "https://www.inaturalist.org/observations/161545471",
    },
    {
      sexo: "hembra",
      es_principal: false,
      thumbnail_url: "/cards/aglaiocercus_coelestis_hembra.webp",
      fotografo: "(c) Ana María Torres",
      licencia: "cc-by",
      url_observacion: "https://www.inaturalist.org/observations/161545472",
    },
  ],
  atributos: { ...atributosBase },
};

const threatenedBird: Bird = {
  ...dimorphicBird,
  id: 2,
  nombre_comun: "Águila harpía",
  nombre_cientifico: "Harpia harpyja",
  es_dimorfica: false,
  estado_conservacion_uicn: "EN",
  imagen_url: "/cards/harpia_harpyja_macho.webp",
  variantes_imagen: [
    {
      sexo: "indeterminado",
      es_principal: true,
      thumbnail_url: "/cards/harpia_harpyja_macho.webp",
      fotografo: "(c) Pedro Pérez",
      licencia: "cc0",
      url_observacion: "https://www.inaturalist.org/observations/1",
    },
  ],
};

const borealBird: Bird = {
  ...dimorphicBird,
  id: 3,
  nombre_comun: "Papamoscas cerrojillo",
  nombre_cientifico: "Ficedula hypoleuca",
  es_dimorfica: false,
  estacionalidad: "Migratoria Boreal",
  imagen_url: "/cards/ficedula_hypoleuca.webp",
  variantes_imagen: [
    {
      sexo: "indeterminado",
      es_principal: true,
      thumbnail_url: "/cards/ficedula_hypoleuca.webp",
      fotografo: "(c) Björn Schmidt",
      licencia: "cc-by-sa",
      url_observacion: "https://www.inaturalist.org/observations/2",
    },
  ],
};

const residentBird: Bird = {
  ...dimorphicBird,
  id: 4,
  nombre_comun: "Sicalis flaveola",
  nombre_cientifico: "Sicalis flaveola",
  es_dimorfica: false,
  imagen_url: "/cards/sicalis_flaveola.webp",
  variantes_imagen: [
    {
      sexo: "indeterminado",
      es_principal: true,
      thumbnail_url: "/cards/sicalis_flaveola.webp",
      fotografo: "(c) Carlos Gómez",
      licencia: "cc0",
      url_observacion: "https://www.inaturalist.org/observations/3",
    },
  ],
};

// --- Card enriquecida (HU-10, HU-12, HU-15) --------------------------------

describe("Card enriquecida", () => {
  it("HU-10: muestra badge de dimorfismo y alterna la imagen macho/hembra", async () => {
    render(<Card bird={dimorphicBird} />);
    expect(screen.getByText("⚥ dimórfica")).toBeInTheDocument();

    const img = screen.getByRole("img", { name: dimorphicBird.nombre_comun });
    expect(img).toHaveAttribute(
      "src",
      "/cards/aglaiocercus_coelestis_macho.webp"
    );

    await userEvent.click(screen.getByRole("button", { name: /Hembra/ }));
    expect(img).toHaveAttribute(
      "src",
      "/cards/aglaiocercus_coelestis_hembra.webp"
    );

    await userEvent.click(screen.getByRole("button", { name: /Macho/ }));
    expect(img).toHaveAttribute(
      "src",
      "/cards/aglaiocercus_coelestis_macho.webp"
    );
  });

  it("HU-10: no muestra toggle en especie no dimórfica", () => {
    render(<Card bird={residentBird} />);
    expect(screen.queryByText("⚥ dimórfica")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Hembra/ })).not.toBeInTheDocument();
  });

  it("HU-12: muestra sello UICN solo en especies amenazadas", () => {
    const primera = render(<Card bird={threatenedBird} />);
    expect(screen.getByTestId("uicn-badge")).toHaveTextContent("EN");
    primera.unmount();

    render(<Card bird={residentBird} />);
    expect(screen.queryByTestId("uicn-badge")).not.toBeInTheDocument();
  });

  it("HU-15: muestra badge de visitante boreal solo en migratorias boreales", () => {
    const primera = render(<Card bird={borealBird} />);
    expect(screen.getByText(/visitante boreal/i)).toBeInTheDocument();
    primera.unmount();

    render(<Card bird={residentBird} />);
    expect(screen.queryByText(/visitante boreal/i)).not.toBeInTheDocument();
  });
});

// --- Game: bono (HU-11), altitud (HU-14), combo (HU-16) ---------------------

function mockActiveGame(overrides: Partial<GameType> = {}) {
  const game: GameType = {
    id: "game-1",
    modo: "ia",
    baraja: "amazonia",
    estado: "activa",
    turno: "jugador",
    cartas_jugador: 10,
    cartas_oponente: 10,
    carta_activa: dimorphicBird,
    ganador: null,
    bono_dimorfico_usado: false,
    ...overrides,
  };
  server.use(
    http.get("/api/partidas/:id", () => HttpResponse.json(game))
  );
  return game;
}

function mockRoundResponse(overrides: Partial<RoundResult> = {}) {
  const result: RoundResult = {
    atributo: "tamano_cm",
    valor_jugador: 15,
    valor_oponente: 12,
    resultado: "gana_jugador",
    carta_jugador: dimorphicBird,
    carta_oponente: residentBird,
    cartas_jugador: 11,
    cartas_oponente: 9,
    reserva: 0,
    ganador_partida: null,
    bono_ofrecido: false,
    bono_acierto: null,
    combo_orden: null,
    combo_bonus: false,
    ...overrides,
  };
  server.use(
    http.post("/api/partidas/:id/rondas", () => HttpResponse.json(result))
  );
  return result;
}

describe("Game dinámicas", () => {
  it("HU-11: ofrece el bono una vez y envía sexo_oponente al jugar", async () => {
    mockActiveGame();
    let capturedBody: Record<string, unknown> = {};
    server.use(
      http.post("/api/partidas/:id/rondas", async ({ request }) => {
        capturedBody = (await request.json()) as Record<string, unknown>;
        return HttpResponse.json({
          atributo: "tamano_cm",
          valor_jugador: 15,
          valor_oponente: 12,
          resultado: "gana_jugador",
          carta_jugador: dimorphicBird,
          carta_oponente: residentBird,
          cartas_jugador: 11,
          cartas_oponente: 9,
          reserva: 0,
          ganador_partida: null,
          bono_ofrecido: true,
          bono_acierto: true,
          combo_orden: null,
          combo_bonus: false,
        } satisfies RoundResult);
      })
    );

    render(<Game gameId="game-1" mode="ia" onGameEnd={() => {}} onExit={() => {}} />);
    await screen.findByText("Elige un atributo");

    expect(screen.getByTestId("bono-box")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("radio", { name: /Macho/ }));
    await userEvent.click(screen.getByRole("button", { name: /Tamaño/ }));

    await waitFor(() => {
      expect(capturedBody.atributo).toBe("tamano_cm");
      expect(capturedBody.sexo_oponente).toBe("macho");
    });
    expect(await screen.findByText(/El bono te da la ronda/i)).toBeInTheDocument();
  });

  it("HU-11: no ofrece el bono cuando ya fue usado", async () => {
    mockActiveGame({ bono_dimorfico_usado: true });
    render(<Game gameId="game-1" mode="ia" onGameEnd={() => {}} onExit={() => {}} />);
    await screen.findByText("Elige un atributo");
    expect(screen.queryByTestId("bono-box")).not.toBeInTheDocument();
  });

  it("HU-16: muestra el combo taxonómico cuando combo_bonus es true", async () => {
    mockActiveGame();
    mockRoundResponse({ combo_bonus: true, combo_orden: "Apodiformes" });
    render(<Game gameId="game-1" mode="ia" onGameEnd={() => {}} onExit={() => {}} />);
    await screen.findByText("Elige un atributo");
    await userEvent.click(screen.getByRole("button", { name: /Tamaño/ }));
    expect(
      await screen.findByText(/Combo taxonómico.*Apodiformes/i)
    ).toBeInTheDocument();
  });

  it("HU-14: juega la ronda de altitud una sola vez por partida", async () => {
    mockActiveGame();
    mockRoundResponse({
      atributo: "altitud_max_msnm",
      valor_jugador: 2000,
      valor_oponente: 1500,
    });
    render(<Game gameId="game-1" mode="ia" onGameEnd={() => {}} onExit={() => {}} />);
    await screen.findByText("Elige un atributo");

    const altitudButton = screen.getByRole("button", {
      name: /¿Quién vive más alto\?/i,
    });
    await userEvent.click(altitudButton);

    expect(await screen.findByText(/2000 msnm.*1500 msnm|1500 msnm.*2000 msnm/i)).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: /Continuar/i }));
    await screen.findByText("Elige un atributo");
    expect(
      screen.queryByRole("button", { name: /¿Quién vive más alto\?/i })
    ).not.toBeInTheDocument();
  });

  it("HU-13: al terminar, entrega la expedición (aves vistas) y la baraja", async () => {
    mockActiveGame();
    mockRoundResponse({ ganador_partida: "jugador" });
    const onGameEnd = vi.fn();
    render(<Game gameId="game-1" mode="ia" onGameEnd={onGameEnd} onExit={() => {}} />);
    await screen.findByText("Elige un atributo");
    await userEvent.click(screen.getByRole("button", { name: /Tamaño/ }));
    await waitFor(() => expect(onGameEnd).toHaveBeenCalled());
    const [winner, expedition, baraja] = onGameEnd.mock.calls[0];
    expect(winner).toBe("jugador");
    expect(baraja).toBe("amazonia");
    const nombres = expedition.map((b: Bird) => b.nombre_comun);
    expect(nombres).toContain("Cometa colivioleta");
    expect(nombres).toContain("Sicalis flaveola");
  });
});

// --- Result: expedición (HU-13) ----------------------------------------------

describe("Result expedición", () => {
  it("muestra 'Tu expedición por {región}' con las aves vistas", () => {
    render(
      <Result
        winner="jugador"
        baraja="amazonia"
        expedition={[dimorphicBird, borealBird]}
        onNewGame={() => {}}
        onHome={() => {}}
      />
    );
    expect(screen.getByText(/Tu expedición por Amazonía/i)).toBeInTheDocument();
    expect(screen.getByText("Cometa colivioleta")).toBeInTheDocument();
    expect(screen.getByText("Papamoscas cerrojillo")).toBeInTheDocument();
  });

  it("muestra 'Tu recorrido por Colombia' para la baraja completa", () => {
    render(
      <Result
        winner="jugador"
        baraja="completa"
        expedition={[dimorphicBird]}
        onNewGame={() => {}}
        onHome={() => {}}
      />
    );
    expect(screen.getByText(/Tu recorrido por Colombia/i)).toBeInTheDocument();
  });
});

// --- Quiz Ornitólogo (HU-17, RN-14) -------------------------------------------

const quizBirds: Bird[] = [dimorphicBird, threatenedBird, borealBird, residentBird];

function mockQuizBirds() {
  server.use(
    http.get("/api/aves", () => HttpResponse.json({ items: quizBirds }))
  );
}

describe("Quiz Ornitólogo", () => {
  it("muestra la foto y 4 opciones; acierta y suma punto", async () => {
    mockQuizBirds();
    render(<Ornitologo onExit={() => {}} />);

    const img = (await screen.findByRole("img")) as HTMLImageElement;
    const target = quizBirds.find((b) => b.imagen_url === img.getAttribute("src"));
    expect(target).toBeDefined();

    const opciones = screen.getAllByRole("button", { name: /·/ });
    expect(opciones).toHaveLength(4);

    await userEvent.click(
      screen.getByRole("button", { name: new RegExp(target!.nombre_cientifico) })
    );
    expect(await screen.findByText(/¡Correcto!/i)).toBeInTheDocument();
    expect(screen.getByText(/Puntaje: 1/i)).toBeInTheDocument();
  });

  it("muestra la respuesta correcta al fallar y credito del fotógrafo", async () => {
    mockQuizBirds();
    render(<Ornitologo onExit={() => {}} />);

    const img = (await screen.findByRole("img")) as HTMLImageElement;
    const target = quizBirds.find((b) => b.imagen_url === img.getAttribute("src"))!;
    const otra = quizBirds.find((b) => b.id !== target.id)!;

    await userEvent.click(
      screen.getByRole("button", { name: new RegExp(otra.nombre_cientifico) })
    );
    expect(await screen.findByText(/Incorrecto/i)).toBeInTheDocument();
    expect(screen.getByTestId("quiz-feedback")).toHaveTextContent(
      target.nombre_comun
    );
    expect(screen.getByText(/Foto:/i)).toBeInTheDocument();
  });

  it("termina tras 5 preguntas y muestra el puntaje final", async () => {
    mockQuizBirds();
    render(<Ornitologo onExit={() => {}} />);

    for (let i = 0; i < 5; i++) {
      const img = (await screen.findByRole("img")) as HTMLImageElement;
      const target = quizBirds.find((b) => b.imagen_url === img.getAttribute("src"))!;
      await userEvent.click(
        screen.getByRole("button", { name: new RegExp(target.nombre_cientifico) })
      );
      await screen.findByText(/¡Correcto!/i);
      if (i < 4) {
        await userEvent.click(screen.getByRole("button", { name: /Siguiente/i }));
      } else {
        await userEvent.click(screen.getByRole("button", { name: /Ver resultado/i }));
      }
    }
    expect(await screen.findByText(/Puntaje final: 5\/5/i)).toBeInTheDocument();
  });
});
