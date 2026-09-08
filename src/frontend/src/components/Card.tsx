// Trazabilidad SDLC: HU-02, HU-05, HU-10, HU-12, HU-15
import { useState } from "react";
import type { Bird, Sexo } from "../types";

interface CardProps {
  bird?: Bird;
  loading?: boolean;
  selected?: boolean;
  disabled?: boolean;
}

const UICN_LABELS: Record<string, string> = {
  VU: "Vulnerable",
  EN: "En peligro",
  CR: "En peligro crítico",
};

export function Card({ bird, loading = false, selected = false, disabled = false }: CardProps) {
  // HU-10: sexo mostrado; por defecto el de la variante principal
  const [sexo, setSexo] = useState<Sexo | null>(null);

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
  const sexosDisponibles = [
    ...new Set((bird.variantes_imagen ?? []).map((v) => v.sexo)),
  ].filter((s) => s === "macho" || s === "hembra");

  const principal =
    (bird.variantes_imagen ?? []).find((v) => v.es_principal) ??
    (bird.variantes_imagen ?? [])[0];
  const sexoActual = sexo ?? principal?.sexo ?? null;
  const varianteActual =
    (bird.variantes_imagen ?? []).find((v) => v.sexo === sexoActual) ?? principal;

  const imgSrc = varianteActual?.thumbnail_url ?? bird.imagen_url;
  const esAmenazada = ["VU", "EN", "CR"].includes(bird.estado_conservacion_uicn ?? "");
  const esBoreal = bird.estacionalidad === "Migratoria Boreal";

  return (
    <div
      data-testid="bird-card"
      className={`
        bg-surface rounded-lg shadow p-4 transition-all
        ${selected ? "ring-2 ring-primary" : ""}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
    >
      {(bird.es_dimorfica || esBoreal) && (
        <div className="flex flex-wrap gap-2 mb-2">
          {bird.es_dimorfica && (
            <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
              ⚥ dimórfica
            </span>
          )}
          {esBoreal && (
            <span
              className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 font-medium"
              title="Temporada en Colombia: noviembre a febrero (RN-13)"
            >
              ❄ visitante boreal
            </span>
          )}
        </div>
      )}

      {imgSrc ? (
        <img
          src={imgSrc}
          alt={bird.nombre_comun}
          className="w-full h-32 object-cover rounded-md mb-4"
        />
      ) : (
        <div className="w-full h-32 bg-primary/10 rounded-md mb-4 flex items-center justify-center text-primary font-serif text-xl">
          {bird.nombre_comun.charAt(0)}
        </div>
      )}

      {bird.es_dimorfica && sexosDisponibles.length > 1 && (
        <div className="flex gap-2 mb-3" role="group" aria-label="Sexo de la fotografía">
          {sexosDisponibles.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSexo(s)}
              aria-pressed={sexoActual === s}
              className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                sexoActual === s
                  ? "border-primary bg-primary/10 text-primary font-semibold"
                  : "border-gray-200 text-textSecondary hover:border-primary"
              }`}
            >
              {s === "macho" ? "Macho" : "Hembra"}
            </button>
          ))}
        </div>
      )}

      <h3 className="text-lg font-semibold text-textPrimary">{bird.nombre_comun}</h3>
      <p className="text-sm text-textSecondary font-serif italic">
        {bird.nombre_cientifico}
      </p>

      {esAmenazada && (
        <p
          data-testid="uicn-badge"
          className="mt-2 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded px-2 py-1 inline-block"
        >
          {bird.estado_conservacion_uicn} · {UICN_LABELS[bird.estado_conservacion_uicn ?? ""]} (UICN)
        </p>
      )}

      <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-textSecondary">
        <span>Tamaño: {atributos.tamano_cm} cm</span>
        <span>Peso: {atributos.peso_g} g</span>
        <span>Rareza: {atributos.rareza}/10</span>
      </div>
    </div>
  );
}
