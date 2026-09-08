import { useState, useEffect } from "react";
import { Home } from "./screens/Home";
import { Game } from "./screens/Game";
import { Result } from "./screens/Result";
import { Ornitologo } from "./screens/Ornitologo";
import type { Bird, GameMode, Winner } from "./types";

type Screen =
  | { name: "home" }
  | { name: "game"; gameId: string; mode: GameMode }
  | { name: "result"; winner: Winner; expedition: Bird[]; baraja?: string }
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
          onStartGame={(gameId, mode) => setScreen({ name: "game", gameId, mode })}
          onStartQuiz={() => setScreen({ name: "quiz" })}
        />
      )}
      {screen.name === "game" && (
        <Game
          gameId={screen.gameId}
          mode={screen.mode}
          onGameEnd={(winner, expedition, baraja) =>
            setScreen({ name: "result", winner, expedition, baraja })
          }
          onExit={() => setScreen({ name: "home" })}
        />
      )}
      {screen.name === "result" && (
        <Result
          winner={screen.winner}
          baraja={screen.baraja}
          expedition={screen.expedition}
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
