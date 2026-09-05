// Trazabilidad SDLC: HU-02
import type { AttributeKey } from "../types";

export function AttributeButton({
  attributeKey,
  name,
  value,
  unit = "",
  selected = false,
  disabled = false,
  onClick,
}: AttributeButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onClick?.(attributeKey)}
      className={`
        w-full text-left px-3 py-2 rounded-md border transition-all
        ${selected ? "bg-primary text-white border-primary ring-2 ring-primary/50" : "bg-surface border-gray-200 hover:border-primary"}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
    >
      <span className="block text-xs text-current opacity-80">{name}</span>
      <span className="block text-lg font-semibold">
        {value} {unit}
      </span>
    </button>
  );
}

interface AttributeButtonProps {
  attributeKey: AttributeKey;
  name: string;
  value: number;
  unit?: string;
  selected?: boolean;
  disabled?: boolean;
  onClick?: (attribute: AttributeKey) => void;
}
