// Trazabilidad SDLC: HU-04
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Scoreboard } from "./Scoreboard";

describe("Scoreboard", () => {
  it("renders player and opponent counts", () => {
    render(<Scoreboard playerCards={5} opponentCards={3} turn="jugador" />);
    expect(screen.getByText("Jugador")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("Oponente")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("highlights active turn", () => {
    render(<Scoreboard playerCards={5} opponentCards={3} turn="oponente" />);
    const opponentSection = screen.getByText("Oponente").closest("div");
    expect(opponentSection).toHaveClass("ring-2");
  });

  it("renders loading state", () => {
    render(<Scoreboard playerCards={0} opponentCards={0} loading />);
    expect(screen.getByLabelText("Cargando marcador")).toBeInTheDocument();
  });

  it("renders empty state when no cards", () => {
    render(<Scoreboard playerCards={0} opponentCards={0} turn="jugador" />);
    expect(screen.getByText("Sin cartas")).toBeInTheDocument();
  });
});
