// Trazabilidad SDLC: HU-04
import { Button } from "../components/Button";
import { SuccessState } from "../components/ScreenStates";
import type { Winner } from "../types";

export interface ResultScreenProps {
  winner: Winner;
  onNewGame: () => void;
  onHome: () => void;
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

export function Result({ winner, onNewGame, onHome }: ResultScreenProps) {
  return (
    <div className="max-w-md mx-auto mt-12 p-6 text-center">
      <SuccessState
        title={resultTitle(winner)}
        description={resultDescription(winner)}
      />
      <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
        <Button onClick={onNewGame}>Nueva partida</Button>
        <Button variant="secondary" onClick={onHome}>
          Volver al inicio
        </Button>
      </div>
    </div>
  );
}
