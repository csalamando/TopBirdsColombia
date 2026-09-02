import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Jugar</Button>);
    expect(screen.getByRole("button", { name: "Jugar" })).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("shows loading spinner and is disabled when loading", () => {
    render(<Button loading>Cargando</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
    expect(screen.getByText("Cargando")).toBeInTheDocument();
  });

  it("applies variant classes for secondary", () => {
    render(<Button variant="secondary">Secundario</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-secondary");
  });
});
