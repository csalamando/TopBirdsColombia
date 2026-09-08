import { useState, useCallback, useEffect } from "react";
import { Button } from "../components/Button";
import { ErrorState, LoadingState } from "../components/ScreenStates";
import { createGame, fetchDecks } from "../services/api";
import type { DeckInfo, GameMode } from "../types";

export interface HomeScreenProps {
  onStartGame: (gameId: string, mode: GameMode) => void;
  onStartQuiz?: () => void;
}

const modeLabels: Record<GameMode, string> = {
  ia: "Un jugador vs IA",
  hotseat: "Dos jugadores (hotseat)",
};

const optionClass = (selected: boolean) =>
  `flex items-center justify-between px-4 py-3 rounded-md border cursor-pointer transition-colors ${
    selected
      ? "border-primary bg-primary/10 ring-1 ring-primary"
      : "border-gray-200 bg-surface hover:border-primary"
  }`;

type DecksStatus = "loading" | "error" | "ready";

export function Home({ onStartGame, onStartQuiz }: HomeScreenProps) {
  const [mode, setMode] = useState<GameMode>("ia");
  const [baraja, setBaraja] = useState<string>("aleatoria");
  const [decks, setDecks] = useState<DeckInfo[]>([]);
  const [decksStatus, setDecksStatus] = useState<DecksStatus>("loading");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadDecks = useCallback(async () => {
    setDecksStatus("loading");
    try {
      setDecks(await fetchDecks());
      setDecksStatus("ready");
    } catch {
      setDecksStatus("error");
    }
  }, []);

  useEffect(() => {
    void loadDecks();
  }, [loadDecks]);

  const handleStart = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const game = await createGame(mode, baraja);
      onStartGame(game.id, game.modo);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al crear la partida");
    } finally {
      setLoading(false);
    }
  }, [mode, baraja, onStartGame]);

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
          <label key={key} className={optionClass(mode === key)}>
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

      <div className="flex flex-col gap-3 w-full max-w-xs mb-8">
        <p className="text-left font-semibold text-textSecondary">Baraja</p>
        <label className={optionClass(baraja === "aleatoria")}>
          <span className="font-medium">Aleatoria</span>
          <input
            type="radio"
            name="gameDeck"
            value="aleatoria"
            checked={baraja === "aleatoria"}
            onChange={() => setBaraja("aleatoria")}
            className="accent-primary"
          />
        </label>
        {decksStatus === "loading" && (
          <p className="text-textSecondary text-sm">Cargando barajas...</p>
        )}
        {decksStatus === "error" && (
          <ErrorState
            message="No se pudieron cargar las barajas"
            onRetry={loadDecks}
          />
        )}
        {decksStatus === "ready" &&
          decks.map((deck) => (
            <label key={deck.id} className={optionClass(baraja === deck.id)}>
              <span className="font-medium">
                {deck.nombre} · {deck.cantidad} aves
              </span>
              <input
                type="radio"
                name="gameDeck"
                value={deck.id}
                checked={baraja === deck.id}
                onChange={() => setBaraja(deck.id)}
                className="accent-primary"
              />
            </label>
          ))}
      </div>

      <Button onClick={handleStart} disabled={loading} loading={loading}>
        Nueva partida
      </Button>

      {onStartQuiz && (
        <div className="mt-4">
          <Button variant="secondary" onClick={onStartQuiz}>
            Modo Ornitólogo
          </Button>
        </div>
      )}
    </div>
  );
}
