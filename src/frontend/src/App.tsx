import { useState, useEffect } from "react";
import { Home } from "./screens/Home";
import { Game } from "./screens/Game";
import { Result } from "./screens/Result";
import { Ornitologo } from "./screens/Ornitologo";
import type { Bird, GameMode, Winner } from "./types";

interface PlayerNames {
  jugador?: string;
  oponente?: string;
}

type Screen =
  | { name: "home" }
  | { name: "game"; gameId: string; mode: GameMode; nombres?: PlayerNames }
  | {
      name: "result";
      winner: Winner;
      expedition: Bird[];
      baraja?: string;
      nombres?: PlayerNames;
    }
  | { name: "quiz" };

function App() {
  const [screen, setScreen] = useState<Screen>({ name: "home" });

  useEffect(() => {
    function handleE2EStart(event: CustomEvent<{ gameId: string; mode: GameMode }>) {
      setScreen({ name: "game", gameId: event.detail.gameId, mode: event.detail.mode });
    }
    window.addEventListener("e2e-start-game", handleE2EStart as EventListener);
    return () => window.removeEventListener("e2e-start-game", handleE2EStart as EventListener);
  }, []);

  return (
    <main className="min-h-screen bg-background text-textPrimary">
      <header className="py-4 text-center">
        <h1 className="text-2xl font-bold text-primary">Top Trumps Aves de Colombia</h1>
      </header>
      {screen.name === "home" && (
        <Home
          onStartGame={(gameId, mode, nombres) =>
            setScreen({ name: "game", gameId, mode, nombres })
          }
          onStartQuiz={() => setScreen({ name: "quiz" })}
        />
      )}
      {screen.name === "game" && (
        <Game
          gameId={screen.gameId}
          mode={screen.mode}
          playerName={screen.nombres?.jugador}
          opponentName={screen.nombres?.oponente}
          onGameEnd={(winner, expedition, baraja) =>
            setScreen({
              name: "result",
              winner,
              expedition,
              baraja,
              nombres: screen.nombres,
            })
          }
          onExit={() => setScreen({ name: "home" })}
        />
      )}
      {screen.name === "result" && (
        <Result
          winner={screen.winner}
          baraja={screen.baraja}
          expedition={screen.expedition}
          playerName={screen.nombres?.jugador}
          opponentName={screen.nombres?.oponente}
          onNewGame={() => setScreen({ name: "home" })}
          onHome={() => setScreen({ name: "home" })}
        />
      )}
      {screen.name === "quiz" && (
        <Ornitologo onExit={() => setScreen({ name: "home" })} />
      )}
    </main>
  );
}

export default App;
