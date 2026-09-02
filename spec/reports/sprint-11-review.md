# Sprint 11 — QA E2E formal y GATE 2

## Rol

`sdlc-qa-automation`, `sdlc-frontend-dev-tdd`, `sdlc-backend-dev-tdd`

## Objetivo

Cerrar el GATE 2 de calidad mediante una suite E2E formal con Cucumber y Playwright, asegurando que todas las historias de usuario de la fase de análisis tienen escenarios automatizados y que backend, frontend y build de producción siguen verdes.

## Entregables

| Entregable | Ubicación | Estado |
|---|---|---|
| Suite E2E con Cucumber + Playwright | `tests/e2e/` | Completado |
| Features Gherkin (HU-01 a HU-08) | `tests/e2e/features/` | Completado |
| Step definitions reutilizables | `tests/e2e/steps/` | Completado |
| Mundo Cucumber con lifecycle de servicios | `tests/e2e/world.js` | Completado |
| Configuración de timeouts de Cucumber | `tests/e2e/cucumber.js`, `tests/e2e/world.js` | Completado |
| Ajustes de UI para flujos E2E | `src/frontend/src/screens/Game.tsx` | Completado |
| Soporte para hot-seat en turno oponente | `src/frontend/src/screens/Game.tsx` | Completado |
| Modal de detalle del ave | `src/frontend/src/screens/Game.tsx` | Completado |
| Pantalla de resultado de ronda con botón Continuar | `src/frontend/src/screens/Game.tsx` | Completado |
| Ajuste a tests unitarios del frontend | `src/frontend/src/screens/screens.test.tsx` | Completado |
| Informe de QA GATE 2 | `spec/qa-report.md` | Completado |

## Trazabilidad

- **HU-01 / HU-02**: `iniciar_partida.feature` cubre partidas contra IA y hot-seat.
- **HU-03 / HU-07**: `jugar_ronda.feature` valida selección de atributo, revelación de carta oponente y actualización del marcador.
- **HU-04**: `empate.feature` simula empate seguido de victoria con reserva.
- **HU-05**: `ganar_partida.feature` verifica la pantalla final y opción de nueva partida.
- **HU-06**: `informacion_ave.feature` consulta el detalle de la carta activa.
- **HU-08**: `hotseat.feature` alterna turnos entre Jugador 1 y Jugador 2.
- **PANT-01 / Estados UI**: `estados_ui.feature` cubre inicio y error con backend caído.
- **Responsive**: `responsive.feature` valida layout móvil.

## Validación

### E2E

```powershell
cd 'D:\AI Projects\TopBirdsColombia\tests\e2e'
npx cucumber-js
```

- **10 escenarios pasados**, **60 steps pasados**.
- Timeout global configurado a 20 s para estabilidad.

### Backend

```powershell
& 'D:\AI Projects\TopBirdsColombia\.venv\Scripts\python' -m pytest 'D:\AI Projects\TopBirdsColombia\src\backend\tests' -q
```

- **45 tests pasados**.
- **Cobertura: 94.74 %**.

### Frontend

```powershell
cd 'D:\AI Projects\TopBirdsColombia\src\frontend'
npm test
npm run build
```

- **40 tests pasados**.
- Build exitoso (`dist/` generado).

## Notas técnicas

- `tests/e2e/world.js` levanta el backend (`uvicorn app.main:app --port 8000`) y el frontend (`npm run dev`) antes de todos los escenarios y los detiene al finalizar.
- La suite usa `page.route` de Playwright para simular empates, victorias y errores de backend, garantizando determinismo sin afectar la base de datos.
- `Game.tsx` fue refactorizado para mostrar siempre los botones de atributo del turno actual, permitiendo el flujo hot-seat y simplificando la prueba del turno oponente.
- Se añadió un modal de detalle de ave con nombre común, científico, familia, hábitat, dieta y atribución.
- El resultado de cada ronda se muestra en un panel con el valor del oponente, la carta oponente y un botón "Continuar" para avanzar.

## Deuda técnica

- Los escenarios de empate y victoria final dependen de mocks de ronda para garantizar determinismo; sería ideal validarlos también contra datos reales con semilla controlada.
- No hay pipeline CI/CD aún; se implementará en Sprint 13.

## Próximo paso

Sprint 12 — Ajustes de UX, accesibilidad y preparación de release notes.
