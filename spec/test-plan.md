# Plan de pruebas — Top Trumps Aves de Colombia

## Objetivo
Garantizar que todas las historias de usuario del MVP se verifiquen con tests automatizados y que el código cumpla con el umbral de cobertura definido.

## Historias cubiertas
- HU-01 Iniciar partida contra la IA
- HU-02 Seleccionar atributo de carta
- HU-03 Resolver ronda con empate
- HU-04 Determinar ganador de la partida
- HU-05 Ver información de un ave
- HU-06 Jugar en modo hot-seat
- HU-07 Recuperar de estado de carga
- HU-08 Interfaz responsive

## Tipos de tests

### Tests unitarios (backend — pytest)
- **Objetivo**: validar lógica pura de dominio sin dependencias externas.
- **Áreas**: reparto de cartas, comparación de atributos, resolución de empates, determinación de ganador, turnos.
- **Herramienta**: pytest.

### Tests unitarios (frontend — Vitest)
- **Objetivo**: validar componentes y utilidades aisladas.
- **Áreas**: Card, AttributeButton, Scoreboard, ScreenStates (loading/empty/error/success), hooks de juego.
- **Herramienta**: Vitest + React Testing Library.

### Tests de contrato (schemathesis)
- **Objetivo**: validar que el backend cumple `spec/api-contract.yaml`.
- **Áreas**: endpoints `/health`, `/aves`, `/partidas`, `/partidas/{id}/rondas`.
- **Herramienta**: schemathesis.

### Tests E2E (Playwright + Cucumber)
- **Objetivo**: verificar flujos completos desde Gherkin.
- **Áreas**:
  - Iniciar partida y completar ronda.
  - Resolver empate y acumular reserva.
  - Ganar una partida.
  - Estados loading/empty/error.
  - Responsive en móvil.
- **Herramienta**: Playwright con features en Gherkin.

## Cobertura
- Umbral mínimo: 70% de cobertura combinada (backend + frontend), excluyendo código de UI puramente declarativo.

## Responsables
- Backend-dev: tests unitarios backend y contract tests.
- Frontend-dev: tests unitarios frontend.
- QA Automation: tests E2E desde Gherkin.

## Criterios de aceptación para GATE 2
- Todos los tests unitarios y de contrato pasan.
- Todos los tests E2E de historias MVP pasan.
- Cobertura ≥70%.
- Sin vulnerabilidades críticas/alta (GATE 2.5).
