// Trazabilidad SDLC: HU-17, RN-14
import { useEffect, useMemo, useState } from "react";
import { Button } from "../components/Button";
import { ErrorState, LoadingState } from "../components/ScreenStates";
import { fetchBirds } from "../services/api";
import type { Bird } from "../types";

const TOTAL_PREGUNTAS = 5;

export interface OrnitologoScreenProps {
  onExit: () => void;
}

/** RN-14: 4 opciones (la correcta + 3 distractores), orden aleatorio. */
function construirOpciones(birds: Bird[], target: Bird): Bird[] {
  const distractores = birds
    .filter((b) => b.id !== target.id)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
  return [...distractores, target].sort(() => Math.random() - 0.5);
}

function fotoPrincipal(bird: Bird): string | null {
  const principal =
    (bird.variantes_imagen ?? []).find((v) => v.es_principal) ??
    (bird.variantes_imagen ?? [])[0];
  return principal?.thumbnail_url ?? bird.imagen_url ?? null;
}

export function Ornitologo({ onExit }: OrnitologoScreenProps) {
  const [birds, setBirds] = useState<Bird[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<{ ok: boolean; target: Bird } | null>(null);

  useEffect(() => {
    fetchBirds()
      .then((items) => {
        if (items.length < 4) {
          setError("Se necesitan al menos 4 aves para el quiz");
        } else {
          setBirds(items);
        }
      })
      .catch(() => setError("No se pudieron cargar las aves"));
  }, []);

  const target = birds && birds.length > 0 ? birds[index % birds.length] : null;
  const opciones = useMemo(
    () => (birds && target ? construirOpciones(birds, target) : []),
    [birds, target]
  );

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-12">
        <ErrorState message={error} onRetry={onExit} />
      </div>
    );
  }

  if (!birds || !target) {
    return <LoadingState message="Preparando el quiz..." />;
  }

  if (index >= TOTAL_PREGUNTAS) {
    return (
      <div className="max-w-md mx-auto mt-12 p-6 text-center">
        <h2 className="text-2xl font-bold text-primary">¡Quiz terminado!</h2>
        <p className="mt-4 text-lg text-textPrimary" data-testid="quiz-final-score">
          Puntaje final: {score}/{TOTAL_PREGUNTAS}
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={() => {
              setIndex(0);
              setScore(0);
              setAnswered(null);
            }}
          >
            Jugar de nuevo
          </Button>
          <Button variant="secondary" onClick={onExit}>
            Volver al inicio
          </Button>
        </div>
      </div>
    );
  }

  const responder = (opcion: Bird) => {
    if (answered) return;
    const ok = opcion.id === target.id;
    if (ok) setScore((s) => s + 1);
    setAnswered({ ok, target });
  };

  const foto = fotoPrincipal(target);
  const credito =
    (target.variantes_imagen ?? []).find((v) => v.es_principal) ??
    (target.variantes_imagen ?? [])[0];

  return (
    <div className="max-w-lg mx-auto mt-8 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-primary">Modo Ornitólogo</h2>
        <span className="text-sm text-textSecondary">
          Puntaje: {score} · Pregunta {index + 1}/{TOTAL_PREGUNTAS}
        </span>
      </div>

      <p className="text-sm text-textSecondary mb-3">¿Cómo se llama esta ave?</p>

      {foto ? (
        <img
          src={foto}
          alt={`Ave misteriosa ${index + 1}`}
          className="w-full aspect-[4/3] object-cover object-center rounded-lg mb-4"
        />
      ) : (
        <div className="w-full aspect-[4/3] bg-primary/10 rounded-lg mb-4 flex items-center justify-center text-primary font-serif text-4xl">
          ?
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {opciones.map((opcion) => (
          <button
            key={opcion.id}
            type="button"
            disabled={!!answered}
            onClick={() => responder(opcion)}
            className={`border rounded-lg px-3 py-2 text-sm text-left transition-colors disabled:cursor-default ${
              answered && opcion.id === target.id
                ? "border-green-500 bg-green-50 text-green-800 font-semibold"
                : answered
                  ? "border-gray-200 text-textSecondary opacity-60"
                  : "border-gray-200 bg-surface text-textPrimary hover:border-primary"
            }`}
          >
            {opcion.nombre_comun} · <span className="font-serif italic">{opcion.nombre_cientifico}</span>
          </button>
        ))}
      </div>

      {answered && (
        <div data-testid="quiz-feedback" className="mt-4 bg-surface rounded-lg shadow p-4">
          <p className={`font-semibold ${answered.ok ? "text-green-700" : "text-amber-700"}`}>
            {answered.ok ? "¡Correcto!" : "Incorrecto."} Es {target.nombre_comun} (
            <span className="font-serif italic">{target.nombre_cientifico}</span>).
          </p>
          <p className="mt-1 text-xs text-textSecondary">
            Foto: {credito?.fotografo ?? target.atribucion ?? "Desconocido"}
            {credito?.licencia ? ` · ${credito.licencia}` : ""}
          </p>
          <div className="mt-3">
            {index < TOTAL_PREGUNTAS - 1 ? (
              <Button
                onClick={() => {
                  setIndex((i) => i + 1);
                  setAnswered(null);
                }}
              >
                Siguiente
              </Button>
            ) : (
              <Button onClick={() => setIndex(TOTAL_PREGUNTAS)}>Ver resultado</Button>
            )}
          </div>
        </div>
      )}

      <div className="mt-6 text-center">
        <Button variant="ghost" onClick={onExit}>
          Salir del quiz
        </Button>
      </div>
    </div>
  );
}
