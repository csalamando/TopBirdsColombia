# Sprint 8 — Frontend TDD: design system y componentes base

## Rol
`sdlc-frontend-dev-tdd`

## Objetivo
Iniciar el frontend React con Vite, TypeScript y TailwindCSS; implementar el design system con tokens y los componentes base necesarios para el flujo de juego.

## Entregables

| Entregable | Ubicación | Estado |
|---|---|---|
| Proyecto Vite + React + TS | `src/frontend/` | Completado |
| Configuración Tailwind con tokens | `tailwind.config.js`, `src/index.css` | Completado |
| Configuración Vitest + jsdom | `vite.config.ts`, `src/test/setup.ts` | Completado |
| Tipos de dominio | `src/types.ts` | Completado |
| Componente Button | `src/components/Button.tsx` + test | Completado |
| Componente Card | `src/components/Card.tsx` + test | Completado |
| Componente AttributeButton | `src/components/AttributeButton.tsx` + test | Completado |
| Componente Scoreboard | `src/components/Scoreboard.tsx` + test | Completado |
| Componentes de estado Loading/Empty/Error/Success | `src/components/ScreenStates.tsx` + test | Completado |
| Pantalla demo App.tsx | `src/App.tsx` + test | Completado |

## Trazabilidad

- **HU-02** (Seleccionar atributo): `AttributeButton` con estados selected/disabled.
- **HU-03** (Resolver ronda): `Scoreboard` muestra cartas restantes y turno activo.
- **PANT-01 / PANT-02** (Inicio / Juego): `Card`, `Button`, estados de pantalla.
- **Design System**: colores, tipografías, espaciado y bordes redondeados de `spec/tokens.json`.

## Validación

```powershell
cd 'D:\AI Projects\TopBirdsColombia\src\frontend'
npm test
npm run build
```

Resultado:
- **22 tests pasados** en Vitest + React Testing Library.
- **Cobertura: 95.45%** (umbral 70% alcanzado).
- `npm run build` exitoso, genera `dist/` con assets listos para despliegue estático.

## Notas técnicas

- Se usó `lucide-react` para iconografía según el design system.
- Se configuró `vitest/config` para reconocer la sección `test` en `vite.config.ts`.
- Se agregaron types de `@testing-library/jest-dom` en `tsconfig.app.json`.
- Los componentes son puros y sin lógica de negocio; reciben props explícitas para facilitar tests.

## Deuda técnica

- No se conecta con backend aún (Sprint 10).
- No se implementa routing ni gestión de estado global.

## Próximo paso

Sprint 9 — Frontend TDD: pantallas y flujo de juego.
