import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoadingState, EmptyState, ErrorState, SuccessState } from "./ScreenStates";

describe("LoadingState", () => {
  it("renders spinner and message", () => {
    render(<LoadingState message="Cargando aves..." />);
    expect(screen.getByText("Cargando aves...")).toBeInTheDocument();
    expect(screen.getByRole("status")).toBeInTheDocument();
  });
});

describe("EmptyState", () => {
  it("renders title, description and optional CTA", () => {
    render(<EmptyState title="Sin aves" description="No hay aves disponibles." />);
    expect(screen.getByText("Sin aves")).toBeInTheDocument();
    expect(screen.getByText("No hay aves disponibles.")).toBeInTheDocument();
  });
});

describe("ErrorState", () => {
  it("renders message and retry button", async () => {
    const onRetry = vi.fn();
    render(<ErrorState message="Error de conexión" onRetry={onRetry} />);
    expect(screen.getByText("Error de conexión")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /reintentar/i }));
    expect(onRetry).toHaveBeenCalled();
  });
});

describe("SuccessState", () => {
  it("renders title and CTA", () => {
    render(<SuccessState title="¡Ganaste!" description="Felicitaciones." />);
    expect(screen.getByText("¡Ganaste!")).toBeInTheDocument();
    expect(screen.getByText("Felicitaciones.")).toBeInTheDocument();
  });
});
