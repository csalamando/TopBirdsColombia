// Trazabilidad SDLC: HU-01, HU-02, HU-06, HU-11, HU-13, HU-14, HU-16
import { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "../components/Button";
import { AttributeButton } from "../components/AttributeButton";
import { Card } from "../components/Card";
import { Scoreboard } from "../components/Scoreboard";
import { EmptyState, ErrorState, LoadingState } from "../components/ScreenStates";
import { fetchGame, playRound } from "../services/api";
import type { AttributeKey, Bird, GameMode, RoundResult, Winner } from "../types";

export interface GameScreenProps {
  gameId: string;
  mode: GameMode;
  onGameEnd: (winner: Winner, expedition: Bird[], baraja?: string) => void;
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

function turnLabel(turn: "jugador" | "oponente", mode: GameMode): string {
  if (mode === "hotseat") {
    return turn === "jugador" ? "Turno del Jugador 1" : "Turno del Jugador 2";
  }
  return turn === "jugador" ? "Tu turno" : "Turno de la IA";
}

function ownerLabel(turn: "jugador" | "oponente", mode: GameMode): string {
  if (mode === "hotseat") {
    return turn === "jugador" ? "Carta del Jugador 1" : "Carta del Jugador 2";
  }
  return "Tu carta";
}

export function Game({ gameId, mode, onGameEnd, onExit }: GameScreenProps) {
  const [game, setGame] = useState<Awaited<ReturnType<typeof fetchGame>> | null>(null);
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastResult, setLastResult] = useState<RoundResult | null>(null);
  const [detailBird, setDetailBird] = useState<Bird | null>(null);
  // HU-11 (RN-10): apuesta del bono "¿Macho o hembra?" (una vez por partida)
  const [bonoSexo, setBonoSexo] = useState<"macho" | "hembra" | null>(null);
  // HU-14 (RN-11): la ronda de altitud solo se ofrece una vez por partida
  const [altitudUsada, setAltitudUsada] = useState(false);
  // HU-13: aves vistas en la partida (para el resumen de expedición)
  const expeditionRef = useRef<Bird[]>([]);

  const loadGame = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchGame(gameId);
      setGame(data);
      if (data.estado === "finalizada" && data.ganador) {
        onGameEnd(data.ganador, expeditionRef.current, data.baraja);
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
        const result = await playRound(gameId, attribute, bonoSexo ?? undefined);
        // HU-13: acumular las aves vistas (deduplicadas) para la expedición
        const vistos = [...(result.carta_jugador ? [result.carta_jugador] : []), ...(result.carta_oponente ? [result.carta_oponente] : [])];
        expeditionRef.current = [
          ...expeditionRef.current,
          ...vistos.filter((b) => !expeditionRef.current.some((x) => x.id === b.id)),
        ];
        if (attribute === "altitud_max_msnm") {
          setAltitudUsada(true);
        }
        if (result.bono_ofrecido) {
          setBonoSexo(null);
        }
        setLastResult(result);
        if (result.ganador_partida) {
          onGameEnd(result.ganador_partida, expeditionRef.current, game?.baraja);
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
    [gameId, onGameEnd, bonoSexo, game?.baraja]
  );

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

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-textSecondary capitalize">Modo: {mode}</span>
        <span className="text-sm font-medium text-primary">{turnLabel(game.turno, mode)}</span>
      </div>
      <Scoreboard
        playerCards={game.cartas_jugador}
        opponentCards={game.cartas_oponente}
        turn={game.turno}
      />

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-textPrimary">{ownerLabel(game.turno, mode)}</h2>
            <Button variant="ghost" className="text-sm" onClick={() => activeBird && setDetailBird(activeBird)}>
              Ver detalle
            </Button>
          </div>
          <Card bird={activeBird ?? undefined} loading={loading} />
        </div>

        <div>
          {lastResult && (
            <div className="mb-4 bg-surface rounded-lg shadow p-4">
              <p className="font-semibold text-textPrimary" data-testid="round-result">{resultMessage(lastResult.resultado)}</p>
              <p className="text-sm text-textSecondary">
                Jugador: {lastResult.valor_jugador} vs Oponente: {lastResult.valor_oponente}
              </p>
              {lastResult.bono_ofrecido && (
                <p data-testid="bono-result" className={`mt-2 text-sm font-medium ${lastResult.bono_acierto ? "text-green-700" : "text-amber-700"}`}>
                  {lastResult.bono_acierto
                    ? "¡Acierto! El bono te da la ronda aunque pierdas el atributo."
                    : "Fallaste el bono: la ronda vale por el atributo."}
                </p>
              )}
              {lastResult.combo_bonus && (
                <p data-testid="combo-result" className="mt-2 text-sm font-medium text-primary">
                  Combo taxonómico: dos victorias seguidas con aves del orden {lastResult.combo_orden}. +1 carta del oponente.
                </p>
              )}
              {lastResult.atributo === "altitud_max_msnm" && (
                <p className="mt-2 text-sm text-textSecondary">
                  ¿Quién vive más alto? Jugador: {lastResult.valor_jugador} msnm vs Oponente: {lastResult.valor_oponente} msnm. Gana quien alcanza mayor altitud: las aves de páramo y bosque altoandino resisten donde hay menos oxígeno.
                </p>
              )}
              {lastResult.carta_oponente && (
                <div className="mt-3">
                  <p className="text-xs text-textSecondary mb-1">Carta del oponente</p>
                  <Card bird={lastResult.carta_oponente} />
                </div>
              )}
              <div className="mt-4">
                <Button onClick={() => setLastResult(null)}>Continuar</Button>
              </div>
            </div>
          )}

          {!lastResult && (
            <div>
              <h2 className="text-lg font-semibold text-textPrimary mb-3">Elige un atributo</h2>

              {game.turno === "jugador" && !game.bono_dimorfico_usado && (
                <div data-testid="bono-box" className="mb-4 border border-primary/30 bg-primary/5 rounded-lg p-3">
                  <p className="text-sm text-textSecondary">
                    Bono «¿Macho o hembra?» (RN-10): apuesta el sexo de la carta del
                    oponente. Si aciertas, ganas la ronda aunque pierdas el atributo.
                    Solo una vez por partida.
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    {(["macho", "hembra"] as const).map((s) => (
                      <label key={s} className="flex items-center gap-1 text-sm text-textPrimary cursor-pointer">
                        <input
                          type="radio"
                          name="bono-sexo"
                          checked={bonoSexo === s}
                          onChange={() => setBonoSexo(s)}
                          className="accent-primary"
                        />
                        {s === "macho" ? "Macho" : "Hembra"}
                      </label>
                    ))}
                    {bonoSexo && (
                      <button
                        type="button"
                        onClick={() => setBonoSexo(null)}
                        className="text-xs text-textSecondary underline"
                      >
                        Quitar apuesta
                      </button>
                    )}
                  </div>
                </div>
              )}

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

              {!altitudUsada && (
                <button
                  type="button"
                  onClick={() => handlePlay("altitud_max_msnm")}
                  disabled={!activeBird || playing}
                  className="mt-3 w-full border border-dashed border-primary/50 text-primary rounded-lg px-4 py-3 text-sm font-medium hover:bg-primary/5 disabled:opacity-50"
                >
                  ¿Quién vive más alto? (ronda especial de altitud, una vez por partida)
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {detailBird && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setDetailBird(null)}>
          <div className="bg-surface rounded-lg shadow-lg max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-textPrimary">{detailBird.nombre_comun}</h3>
            <p className="text-textSecondary italic">{detailBird.nombre_cientifico}</p>
            <dl className="mt-4 space-y-2 text-sm">
              <div><dt className="font-semibold inline">Familia:</dt> <dd className="inline">{detailBird.familia ?? "—"}</dd></div>
              <div><dt className="font-semibold inline">Hábitat:</dt> <dd className="inline">{detailBird.habitat ?? "—"}</dd></div>
              <div><dt className="font-semibold inline">Dieta:</dt> <dd className="inline">{detailBird.dieta ?? "—"}</dd></div>
              <div><dt className="font-semibold inline">Atribución:</dt> <dd className="inline">{detailBird.atribucion ?? "—"}</dd></div>
            </dl>
            <div className="mt-6 flex justify-end">
              <Button onClick={() => setDetailBird(null)}>Cerrar</Button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 flex justify-center">
        <Button variant="ghost" onClick={onExit}>
          Salir al inicio
        </Button>
      </div>
    </div>
  );
}
