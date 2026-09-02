import { useEffect, useState, useCallback } from "react";
import { Button } from "../components/Button";
import { AttributeButton } from "../components/AttributeButton";
import { Card } from "../components/Card";
import { Scoreboard } from "../components/Scoreboard";
import { EmptyState, ErrorState, LoadingState } from "../components/ScreenStates";
import { fetchGame, playRound } from "../services/api";
import type { AttributeKey, Bird, GameMode, RoundResult } from "../types";

export interface GameScreenProps {
  gameId: string;
  mode: GameMode;
  onGameEnd: (winner: "jugador" | "oponente" | "empate") => void;
  onExit: () => void;
}

const attributeMeta: { key: AttributeKey; name: string; unit: string }[] = [
  { key: "tamano_cm", name: "Tamaño", unit: "cm" },
  { key: "peso_g", name: "Peso", unit: "g" },
  { key: "envergadura_cm", name: "Envergadura", unit: "cm" },
  { key: "velocidad_kmh", name: "Velocidad", unit: "km/h" },
  { key: "esperanza_vida_anos", name: "Esperanza de vida", unit: "años" },
  { key: "rareza", name: "Rareza", unit: "/10" },
];

function resultMessage(result: RoundResult["resultado"]): string {
  switch (result) {
    case "gana_jugador":
      return "¡Ganaste la ronda!";
    case "gana_oponente":
      return "Perdiste la ronda";
    case "empate":
      return "Empate";
  }
}

export function Game({ gameId, mode, onGameEnd, onExit }: GameScreenProps) {
  const [game, setGame] = useState<Awaited<ReturnType<typeof fetchGame>> | null>(null);
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastResult, setLastResult] = useState<RoundResult | null>(null);

  const loadGame = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchGame(gameId);
      setGame(data);
      if (data.estado === "finalizada" && data.ganador) {
        onGameEnd(data.ganador);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar la partida");
    } finally {
      setLoading(false);
    }
  }, [gameId, onGameEnd]);

  useEffect(() => {
    loadGame();
  }, [loadGame]);

  const handlePlay = useCallback(
    async (attribute: AttributeKey) => {
      setPlaying(true);
      setError(null);
      try {
        const result = await playRound(gameId, attribute);
        setLastResult(result);
        if (result.ganador_partida) {
          onGameEnd(result.ganador_partida);
          return;
        }
        const updated = await fetchGame(gameId);
        setGame(updated);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al jugar la ronda");
      } finally {
        setPlaying(false);
      }
    },
    [gameId, onGameEnd]
  );

  const handleOpponentTurn = useCallback(async () => {
    const keys = attributeMeta.map((m) => m.key);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    await handlePlay(randomKey);
  }, [handlePlay]);

  if (loading && !game) {
    return <LoadingState message="Cargando partida..." />;
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-12">
        <ErrorState message={error} onRetry={loadGame} />
      </div>
    );
  }

  if (!game) {
    return (
      <div className="max-w-md mx-auto mt-12">
        <EmptyState title="Partida no encontrada" action={{ label: "Volver al inicio", onClick: onExit }} />
      </div>
    );
  }

  const activeBird: Bird | null = game.carta_activa ?? null;
  const isPlayerTurn = game.turno === "jugador";

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-textSecondary capitalize">Modo: {mode}</span>
      </div>
      <Scoreboard
        playerCards={game.cartas_jugador}
        opponentCards={game.cartas_oponente}
        turn={game.turno}
      />

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div>
          <h2 className="text-lg font-semibold text-textPrimary mb-3">Tu carta</h2>
          <Card bird={activeBird ?? undefined} loading={loading} />
        </div>

        <div>
          {lastResult && (
            <div className="mb-4 bg-surface rounded-lg shadow p-4">
              <p className="font-semibold text-textPrimary">{resultMessage(lastResult.resultado)}</p>
              <p className="text-sm text-textSecondary">
                Jugador: {lastResult.valor_jugador} vs Oponente: {lastResult.valor_oponente}
              </p>
            </div>
          )}

          {isPlayerTurn ? (
            <div>
              <h2 className="text-lg font-semibold text-textPrimary mb-3">Elige un atributo</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {attributeMeta.map(({ key, name, unit }) => (
                  <AttributeButton
                    key={key}
                    attributeKey={key}
                    name={name}
                    unit={unit}
                    value={activeBird?.atributos[key] ?? 0}
                    disabled={!activeBird || playing}
                    onClick={handlePlay}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-lg font-semibold text-textPrimary mb-3">Turno del oponente</h2>
              <Button onClick={handleOpponentTurn} loading={playing} disabled={playing}>
                Jugar turno de la IA
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <Button variant="ghost" onClick={onExit}>
          Salir al inicio
        </Button>
      </div>
    </div>
  );
}
