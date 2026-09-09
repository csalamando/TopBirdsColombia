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
- HU-18 Identificarse con nombre al iniciar la partida
- HU-19 Presentación visual y copy amigable
- HU-20 Ver imágenes de las cartas en calidad original

## Tipos de tests

### Tests unitarios (backend — pytest)
- **Objetivo**: validar lógica pura de dominio sin dependencias externas.
- **Áreas**: reparto de cartas, comparación de atributos, resolución de empates, determinación de ganador, turnos; `GET /barajas` devuelve `imagen_url` representativa por baraja (HU-09 esc. 4/6, RN-20); las cartas referencian imágenes originales sin pérdida (HU-20, RN-19).
- **Herramienta**: pytest.

### Tests unitarios (frontend — Vitest)
- **Objetivo**: validar componentes y utilidades aisladas.
- **Áreas**: Card (incl. imagen en proporción 4:3), AttributeButton, Scoreboard (incl. nombres personalizados), ScreenStates (loading/empty/error/success), flujo de nicknames Home → Game → Result (HU-18), panel de resultado con tono según ganador (HU-19), tarjetas de baraja con imagen representativa en Home (HU-09 esc. 6) y placeholder en "Aleatoria".
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
  - Hot-seat con nombres por defecto: turno y carta anunciados como "Turno de Jugador 1/2" y "Carta de Jugador 1/2" (HU-18).
- **Herramienta**: Playwright con features en Gherkin.

### Chequeo de copy (RN-18)
- **Objetivo**: garantizar que ningún texto visible expone códigos de trazabilidad (HU-, RN-, PANT-).
- **Áreas**: strings de UI del frontend.
- **Herramienta**: grep automatizable en CI sobre `src/frontend/src` excluyendo comentarios (`//`, `/* */`).

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
