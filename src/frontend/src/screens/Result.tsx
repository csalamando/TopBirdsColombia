// Trazabilidad SDLC: HU-04, HU-13
import { Button } from "../components/Button";
import { SuccessState } from "../components/ScreenStates";
import type { Bird, Winner } from "../types";

export interface ResultScreenProps {
  winner: Winner;
  baraja?: string;
  expedition?: Bird[];
  onNewGame: () => void;
  onHome: () => void;
}

const REGION_LABELS: Record<string, string> = {
  andina: "Andina",
  caribe: "Caribe",
  pacifico: "Pacífico",
  amazonia: "Amazonía",
  orinoquia: "Orinoquía",
};

function expeditionTitle(baraja?: string): string {
  if (baraja && baraja !== "completa" && REGION_LABELS[baraja]) {
    return `Tu expedición por ${REGION_LABELS[baraja]}`;
  }
  return "Tu recorrido por Colombia";
}

function resultTitle(winner: Winner): string {
  switch (winner) {
    case "jugador":
      return "¡Ganaste la partida!";
    case "oponente":
      return "Perdiste la partida";
    case "empate":
      return "Empate";
  }
}

function resultDescription(winner: Winner): string {
  switch (winner) {
    case "jugador":
      return "Conquistaste todas las cartas de aves de Colombia.";
    case "oponente":
      return "El oponente se quedó con todas las cartas. ¡Inténtalo de nuevo!";
    case "empate":
      return "Ambos jugadores terminaron con cartas.";
  }
}

export function Result({ winner, baraja, expedition = [], onNewGame, onHome }: ResultScreenProps) {
  return (
    <div className="max-w-md mx-auto mt-12 p-6 text-center">
      <SuccessState
        title={resultTitle(winner)}
        description={resultDescription(winner)}
      />

      {expedition.length > 0 && (
        <div className="mt-8 text-left" data-testid="expedition-summary">
          <h3 className="text-lg font-semibold text-textPrimary">
            {expeditionTitle(baraja)}
          </h3>
          <p className="text-sm text-textSecondary mb-3">
            Viste {expedition.length} {expedition.length === 1 ? "ave" : "aves"} durante la partida:
          </p>
          <ul className="space-y-1 text-sm text-textPrimary max-h-56 overflow-y-auto">
            {expedition.map((bird) => (
              <li key={bird.id}>
                {bird.nombre_comun}{" "}
                <span className="text-textSecondary font-serif italic">
                  ({bird.nombre_cientifico})
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
        <Button onClick={onNewGame}>Nueva partida</Button>
        <Button variant="secondary" onClick={onHome}>
          Volver al inicio
        </Button>
      </div>
    </div>
  );
}
