// Trazabilidad SDLC: HU-01
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("starts at the home screen", () => {
    render(<App />);
    expect(screen.getByRole("button", { name: /Nueva partida/i })).toBeInTheDocument();
  });
});
