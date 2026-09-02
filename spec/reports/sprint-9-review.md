# Sprint 9 — Frontend TDD: pantallas y flujo de juego

## Rol
`sdlc-frontend-dev-tdd`

## Objetivo
Complementar el frontend con servicios de API, mocks basados en el contrato OpenAPI y las pantallas completas de inicio, juego y resultado; validar con tests TDD y build de producción.

## Entregables

| Entregable | Ubicación | Estado |
|---|---|---|
| Configuración MSW | `src/frontend/src/mocks/handlers.ts`, `src/frontend/src/mocks/server.ts` | Completado |
| Servicios API (aves, partidas, rondas) | `src/frontend/src/services/api.ts` + test | Completado |
| Pantalla Home (modo de juego, crear partida) | `src/frontend/src/screens/Home.tsx` | Completado |
| Pantalla Game (cartas, atributos, rondas, errores) | `src/frontend/src/screens/Game.tsx` | Completado |
| Pantalla Result (ganador, acciones) | `src/frontend/src/screens/Result.tsx` | Completado |
| Navegación entre pantallas | `src/frontend/src/App.tsx` + test | Completado |
| Tests TDD de pantallas y servicios | `src/frontend/src/screens/screens.test.tsx`, `src/frontend/src/services/api.test.ts` | Completado |

## Trazabilidad

- **HU-01** (Crear partida): `Home` permite elegir modo y crear la partida vía `createGame`.
- **HU-02** (Seleccionar atributo): `Game` renderiza `AttributeButton` por cada atributo de la carta activa y llama `playRound`.
- **HU-03** (Resolver ronda): `Game` muestra resultado con valores jugador/oponente y actualiza el marcador.
- **HU-04** (Ver resultado): `Result` presenta el ganador y opciones de reinicio.
- **PANT-01 / PANT-02 / PANT-03**: Home, Game y Result con estados loading/empty/error según `ux-flows.md`.
- **api-contract.yaml**: MSW responde con las mismas formas de payload (`items`, `RoundResult`, `Game`).

## Validación

```powershell
cd 'D:\AI Projects\TopBirdsColombia\src\frontend'
npm test
npm run test:coverage
npm run build
```

Resultado:
- **40 tests pasados** en Vitest + React Testing Library + MSW.
- **Cobertura global: 83.67% statements, 81.66% branches, 78.57% functions, 84.82% lines** (umbral 70% alcanzado).
- `npm run build` exitoso, genera `dist/` con assets listos para despliegue estático.

## Notas técnicas

- `VITE_API_BASE_URL` permite apuntar al backend real; por defecto `/api` para MSW y proxy en desarrollo.
- MSW intercepta todas las rutas usadas por la app; el test setup resetea handlers entre tests.
- `Home`, `Game` y `Result` son puros y reciben callbacks para navegación, manteniendo `App.tsx` como orquestador de estado.
- La pantalla `Game` maneja el turno del oponente con un botón de simulación IA.

## Deuda técnica

- No hay gestión de estado global ni React Router; la navegación es local a `App.tsx` y bastará para el demo.
- El flujo multi-ronda con turnos alternos reales se implementará cuando se integre con el backend real.

## Próximo paso

Sprint 10 — Integración frontend-backend y despliegue.
