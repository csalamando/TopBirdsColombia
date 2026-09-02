import type { Turn } from "../types";

interface ScoreboardProps {
  playerCards: number;
  opponentCards: number;
  turn?: Turn;
  loading?: boolean;
}

export function Scoreboard({
  playerCards,
  opponentCards,
  turn = "jugador",
  loading = false,
}: ScoreboardProps) {
  if (loading) {
    return (
      <div
        aria-label="Cargando marcador"
        className="bg-surface rounded-lg shadow p-4 animate-pulse h-24"
      >
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
        <div className="h-8 bg-gray-200 rounded w-1/4" />
      </div>
    );
  }

  const total = playerCards + opponentCards;

  if (total === 0) {
    return (
      <div className="bg-surface rounded-lg shadow p-4 text-center text-textSecondary">
        Sin cartas
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-lg shadow p-4">
      <div className="flex justify-around items-center">
        <div
          className={`text-center p-2 rounded-md ${
            turn === "jugador" ? "ring-2 ring-primary" : ""
          }`}
        >
          <p className="text-sm text-textSecondary">Jugador</p>
          <p className="text-2xl font-bold text-primary">{playerCards}</p>
        </div>
        <div className="text-textSecondary text-sm">VS</div>
        <div
          className={`text-center p-2 rounded-md ${
            turn === "oponente" ? "ring-2 ring-secondary" : ""
          }`}
        >
          <p className="text-sm text-textSecondary">Oponente</p>
          <p className="text-2xl font-bold text-secondary">{opponentCards}</p>
        </div>
      </div>
    </div>
  );
}
