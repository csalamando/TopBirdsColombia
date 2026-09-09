import { useState, useCallback, useEffect } from "react";
import { Button } from "../components/Button";
import { ErrorState, LoadingState } from "../components/ScreenStates";
import { createGame, fetchDecks } from "../services/api";
import type { DeckInfo, GameMode } from "../types";

export interface HomeScreenProps {
  onStartGame: (
    gameId: string,
    mode: GameMode,
    nombres?: { jugador?: string; oponente?: string }
  ) => void;
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
  const [nombreJugador, setNombreJugador] = useState("");
  const [nombreOponente, setNombreOponente] = useState("");
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
      const jugador = nombreJugador.trim() || undefined;
      const oponente = nombreOponente.trim() || undefined;
      const game = await createGame(mode, baraja, jugador || oponente ? { jugador, oponente } : undefined);
      onStartGame(game.id, game.modo, jugador || oponente ? { jugador, oponente } : undefined);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al crear la partida");
    } finally {
      setLoading(false);
    }
  }, [mode, baraja, nombreJugador, nombreOponente, onStartGame]);

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

      <div className="flex flex-col gap-3 w-full max-w-xs mb-8 text-left">
        <p className="font-semibold text-textSecondary">
          {mode === "ia" ? "¿Cómo te llamas?" : "¿Cómo se llaman?"}
        </p>
        <label className="flex flex-col gap-1 text-sm text-textPrimary">
          {mode === "ia" ? "Tu nombre" : "Nombre del Jugador 1"}
          <input
            type="text"
            value={nombreJugador}
            onChange={(e) => setNombreJugador(e.target.value)}
            placeholder={mode === "ia" ? "Jugador" : "Jugador 1"}
            maxLength={20}
            className="px-3 py-2 rounded-md border border-gray-200 bg-surface focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </label>
        {mode === "hotseat" && (
          <label className="flex flex-col gap-1 text-sm text-textPrimary">
            Nombre del Jugador 2
            <input
              type="text"
              value={nombreOponente}
              onChange={(e) => setNombreOponente(e.target.value)}
              placeholder="Jugador 2"
              maxLength={20}
              className="px-3 py-2 rounded-md border border-gray-200 bg-surface focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </label>
        )}
        <p className="text-xs text-textSecondary">
          Puedes dejarlo en blanco y usar los nombres por defecto.
        </p>
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
