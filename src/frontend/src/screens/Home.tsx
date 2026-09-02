import { useState, useCallback } from "react";
import { Button } from "../components/Button";
import { ErrorState, LoadingState } from "../components/ScreenStates";
import { createGame } from "../services/api";
import type { GameMode } from "../types";

export interface HomeScreenProps {
  onStartGame: (gameId: string, mode: GameMode) => void;
}

const modeLabels: Record<GameMode, string> = {
  ia: "Un jugador vs IA",
  hotseat: "Dos jugadores (hotseat)",
};

export function Home({ onStartGame }: HomeScreenProps) {
  const [mode, setMode] = useState<GameMode>("ia");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStart = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const game = await createGame(mode);
      onStartGame(game.id, game.modo);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al crear la partida");
    } finally {
      setLoading(false);
    }
  }, [mode, onStartGame]);

  if (loading) {
    return <LoadingState message="Creando partida..." />;
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-12">
        <ErrorState message={error} onRetry={() => setError(null)} />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
      <h1 className="text-4xl font-bold text-primary mb-4">
        Top Trumps Aves de Colombia
      </h1>
      <p className="text-textSecondary mb-8 max-w-md">
        Descubre y compite con las aves más emblemáticas de Colombia. Selecciona un modo de juego.
      </p>

      <div className="flex flex-col gap-3 w-full max-w-xs mb-8">
        {(Object.keys(modeLabels) as GameMode[]).map((key) => (
          <label
            key={key}
            className={`flex items-center justify-between px-4 py-3 rounded-md border cursor-pointer transition-colors ${
              mode === key
                ? "border-primary bg-primary/10 ring-1 ring-primary"
                : "border-gray-200 bg-surface hover:border-primary"
            }`}
          >
            <span className="font-medium">{modeLabels[key]}</span>
            <input
              type="radio"
              name="gameMode"
              value={key}
              checked={mode === key}
              onChange={() => setMode(key)}
              className="accent-primary"
            />
          </label>
        ))}
      </div>

      <Button onClick={handleStart} disabled={loading} loading={loading}>
        Nueva partida
      </Button>
    </div>
  );
}
