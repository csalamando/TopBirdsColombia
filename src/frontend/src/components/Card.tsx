// Trazabilidad SDLC: HU-02, HU-05
import type { Bird } from "../types";

interface CardProps {
  bird?: Bird;
  loading?: boolean;
  selected?: boolean;
  disabled?: boolean;
}

export function Card({ bird, loading = false, selected = false, disabled = false }: CardProps) {
  if (loading) {
    return (
      <div
        aria-label="Cargando carta"
        data-testid="bird-card"
        className="bg-surface rounded-lg shadow p-4 animate-pulse opacity-70 h-64"
      >
        <div className="h-32 bg-gray-200 rounded-md mb-4" />
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
      </div>
    );
  }

  if (!bird) {
    return null;
  }

  const atributos = bird.atributos;

  return (
    <div
      data-testid="bird-card"
      className={`
        bg-surface rounded-lg shadow p-4 transition-all
        ${selected ? "ring-2 ring-primary" : ""}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
    >
      {bird.imagen_url ? (
        <img
          src={bird.imagen_url}
          alt={bird.nombre_comun}
          className="w-full h-32 object-cover rounded-md mb-4"
        />
      ) : (
        <div className="w-full h-32 bg-primary/10 rounded-md mb-4 flex items-center justify-center text-primary font-serif text-xl">
          {bird.nombre_comun.charAt(0)}
        </div>
      )}
      <h3 className="text-lg font-semibold text-textPrimary">{bird.nombre_comun}</h3>
      <p className="text-sm text-textSecondary font-serif italic">{bird.nombre_cientifico}</p>
      <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-textSecondary">
        <span>Tamaño: {atributos.tamano_cm} cm</span>
        <span>Peso: {atributos.peso_g} g</span>
        <span>Rareza: {atributos.rareza}/10</span>
      </div>
    </div>
  );
}
