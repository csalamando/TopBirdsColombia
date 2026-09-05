// Trazabilidad SDLC: HU-02, HU-05
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Card } from "./Card";
import type { Bird } from "../types";

const bird: Bird = {
  id: 1,
  nombre_comun: "Guacamaya Bandera",
  nombre_cientifico: "Ara macao",
  familia: "Psittacidae",
  habitat: "Bosques",
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
};

describe("Card", () => {
  it("renders bird common and scientific names", () => {
    render(<Card bird={bird} />);
    expect(screen.getByText(bird.nombre_comun)).toBeInTheDocument();
    expect(screen.getByText(bird.nombre_cientifico)).toBeInTheDocument();
  });

  it("renders loading skeleton when loading", () => {
    render(<Card loading />);
    expect(screen.getByLabelText("Cargando carta")).toBeInTheDocument();
  });

  it("renders selected state", () => {
    render(<Card bird={bird} selected />);
    expect(screen.getByTestId("bird-card")).toHaveClass("ring-2");
  });

  it("renders disabled state", () => {
    render(<Card bird={bird} disabled />);
    expect(screen.getByTestId("bird-card")).toHaveClass("opacity-50");
  });
});
