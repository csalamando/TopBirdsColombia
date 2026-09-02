import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AttributeButton } from "./AttributeButton";

describe("AttributeButton", () => {
  it("renders name and value", () => {
    render(<AttributeButton attributeKey="tamano_cm" name="Tamaño" value={84} unit="cm" />);
    expect(screen.getByText("Tamaño")).toBeInTheDocument();
    expect(screen.getByText("84 cm")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const handleClick = vi.fn();
    render(
      <AttributeButton attributeKey="peso_g" name="Peso" value={1000} unit="g" onClick={handleClick} />
    );
    await userEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledWith("peso_g");
  });

  it("is disabled when disabled", () => {
    render(
      <AttributeButton attributeKey="velocidad_kmh" name="Velocidad" value={50} unit="km/h" disabled />
    );
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("shows selected state", () => {
    render(<AttributeButton attributeKey="rareza" name="Rareza" value={7} selected />);
    expect(screen.getByRole("button")).toHaveClass("ring-2");
  });
});
