# QA Report — Sprint 11: E2E formal y GATE 2

## Alcance

Este reporte resume la validación formal de calidad realizada en el Sprint 11 para el demo **Top Trumps Aves de Colombia**. El objetivo fue cerrar el GATE 2 mediante una suite E2E con Cucumber + Playwright, además de confirmar que las pruebas unitarias y el build de producción siguen verdes.

## Entorno de pruebas

- **Sistema operativo**: Windows 11 (PowerShell 5.1)
- **Backend**: Python 3.11, FastAPI, SQLite
- **Frontend**: Node.js, Vite + React + TypeScript + Tailwind CSS
- **E2E**: `@cucumber/cucumber` 10.3.1, `@playwright/test` 1.42.0

## Suite E2E

### Estructura

Ubicación: `tests/e2e/`

- `features/`: 8 archivos `.feature` con historias de usuario de HU-01 a HU-08.
- `steps/`: definiciones de pasos reutilizables (`common.steps.js`, `game.steps.js`).
- `world.js`: inicialización de Playwright y ciclo de vida de backend y frontend.
- `cucumber.js`: configuración de paths, require y timeout (20 s).

### Escenarios ejecutados

| Feature | Escenarios | Resultado |
|---|---|---|
| `iniciar_partida.feature` | 2 | ✅ |
| `jugar_ronda.feature` | 1 | ✅ |
| `empate.feature` | 1 | ✅ |
| `ganar_partida.feature` | 1 | ✅ |
| `informacion_ave.feature` | 1 | ✅ |
| `hotseat.feature` | 1 | ✅ |
| `estados_ui.feature` | 2 | ✅ |
| `responsive.feature` | 1 | ✅ |

**Resumen**: 10 escenarios, 60 steps, todos pasaron.

```powershell
cd 'D:\AI Projects\TopBirdsColombia\tests\e2e'
npx cucumber-js
```

### Cobertura funcional

- **HU-01 / HU-02**: Inicio de partida contra IA y hot-seat.
- **HU-03 / HU-07**: Selección de atributo, revelación de carta oponente, resultado de ronda y continuación.
- **HU-04**: Empate simulado y acumulación de reserva.
- **HU-05**: Finalización de partida y pantalla de resultado.
- **HU-06**: Consulta de detalle del ave (nombre común, científico, familia, hábitat, dieta, atribución).
- **HU-08**: Alternancia de turnos en hot-seat.
- **Estados UI**: Pantalla de inicio, error al crear partida con backend caído.
- **Responsive**: Layout de una columna y botones visibles en viewport móvil 375x667.

## Pruebas unitarias

### Backend

```powershell
& 'D:\AI Projects\TopBirdsColombia\.venv\Scripts\python' -m pytest 'D:\AI Projects\TopBirdsColombia\src\backend\tests' -q
```

- **Tests**: 45 pasados.
- **Cobertura**: 94.74 % (323 sentencias, 17 no cubiertas).

### Frontend

```powershell
cd 'D:\AI Projects\TopBirdsColombia\src\frontend'
npm test
```

- **Tests**: 40 pasados.
- **Build**: exitoso (`npm run build` genera `dist/`).

## Defectos encontrados y resueltos

| Defecto | Causa raíz | Solución |
|---|---|---|
| Escenarios de empate/ganar partida no deterministas | Resultados aleatorios del backend | Mock de respuestas de `/api/partidas/*/rondas` para forzar empate y victoria. |
| Hot-seat no permitía jugar turno del oponente | UI mostraba botón "Jugar turno de la IA" | `Game.tsx` ahora renderiza botones de atributo en cualquier turno. |
| Test unitario `shows opponent turn button when turn is opponent` fallaba | Se eliminó el botón de IA | Actualizado a `shows attribute selection on opponent turn`. |
| `defaultTimeout` de Cucumber no se aplicaba en algunos steps | Configuración vía `cucumber.js` inconsistente | Añadido `setDefaultTimeout(20000)` en `world.js`. |
| Estado de error no se mostraba al simular backend caído | Orden de pasos y esperas | Reordenada la feature y usado `waitFor` en la verificación del estado de error. |

## Estado GATE 2

- **Criterio de entrada**: backend y frontend integrados desde Sprint 10. ✅
- **E2E formal**: 10/10 escenarios verdes. ✅
- **Cobertura backend**: ≥ 70 % (94.74 %). ✅
- **Tests frontend**: 40/40 verdes. ✅
- **Build producción**: exitoso. ✅

**Veredicto**: GATE 2 aprobado. La aplicación cumple con los criterios de calidad definidos y está lista para continuar a la fase de documentación y cierre del sprint.

## Riesgos residuales

- Los escenarios de empate y victoria usan mocks controlados para garantizar determinismo; en un entorno con semilla real deberían revalidarse con datos reales.
- No hay pipeline CI/CD aún; la ejecución local depende de tener el entorno virtual de Python y Node correctamente configurados.

## Próximo paso

Sprint 12: ajustes de UX, accesibilidad y preparación de release notes.
