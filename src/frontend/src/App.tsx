import { useState } from "react";
import { Home } from "./screens/Home";
import { Game } from "./screens/Game";
import { Result } from "./screens/Result";
import type { GameMode, Winner } from "./types";

type Screen = { name: "home" } | { name: "game"; gameId: string; mode: GameMode } | { name: "result"; winner: Winner };

function App() {
  const [screen, setScreen] = useState<Screen>({ name: "home" });

  return (
    <main className="min-h-screen bg-background text-textPrimary">
      <header className="py-4 text-center">
        <h1 className="text-2xl font-bold text-primary">Top Trumps Aves de Colombia</h1>
      </header>
      {screen.name === "home" && (
        <Home onStartGame={(gameId, mode) => setScreen({ name: "game", gameId, mode })} />
      )}
      {screen.name === "game" && (
        <Game
          gameId={screen.gameId}
          mode={screen.mode}
          onGameEnd={(winner) => setScreen({ name: "result", winner })}
          onExit={() => setScreen({ name: "home" })}
        />
      )}
      {screen.name === "result" && (
        <Result
          winner={screen.winner}
          onNewGame={() => setScreen({ name: "home" })}
          onHome={() => setScreen({ name: "home" })}
        />
      )}
    </main>
  );
}

export default App;
