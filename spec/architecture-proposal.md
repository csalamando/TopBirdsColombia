# Propuesta de arquitectura — Top Trumps Aves de Colombia

## Contexto y objetivo de negocio
La iniciativa busca construir una aplicación web tipo Top Trumps con aves de Colombia para demostrar el arnés SDLC. El sistema debe ser jugable en navegador, barato de operar, fácil de desplegar en demo y mantener TDD estricto.

## Opción A: FastAPI + React SPA
- **Backend**: Python + FastAPI + Pydantic + SQLite.
- **Frontend**: React + TypeScript + Vite + TailwindCSS.
- **Tests**: pytest, Vitest, Playwright + Cucumber.
- **CI/CD**: GitHub Actions.
- **Demo**: GitHub Pages para frontend; backend en contenedor local o serverless ligero.
- **Pros**: ecosistema maduro, contrato OpenAPI automático, fácil TDD.
- **Contras**: dos repositorios de build, más dependencias.

## Opción B: Django + HTMX + templates
- **Backend**: Python + Django + templates server-side.
- **Frontend**: HTMX + Alpine.js + TailwindCSS.
- **Tests**: pytest, Playwright.
- **CI/CD**: GitHub Actions.
- **Demo**: Railway / Render con una sola app.
- **Pros**: un solo stack, menos JavaScript, desarrollo rápido.
- **Contras**: menos separación frontend/backend, contrato API menos explícito para demostrar API-first.

## Opción C: Next.js full-stack (Vercel)
- **Full-stack**: Next.js + TypeScript + Prisma + SQLite/Postgres.
- **Tests**: Vitest, Playwright.
- **CI/CD**: Vercel + GitHub Actions.
- **Demo**: Vercel.
- **Pros**: un solo framework, SSR opcional.
- **Contras**: vendor lock-in, no demuestra claramente separación de backend/frontend.

## Comparativa
| Criterio | Peso | Opción A | Opción B | Opción C |
|---|---|---|---|---|
| Alineación con API-first (P-002) | 25% | 5 | 3 | 3 |
| Facilidad de TDD estricto (P-003) | 25% | 5 | 4 | 4 |
| Costo demo cercano a cero | 20% | 4 | 4 | 3 |
| Madurez y soporte de comunidad | 15% | 5 | 5 | 4 |
| Separación frontend/backend | 15% | 5 | 2 | 3 |
| **Puntaje ponderado** | 100% | **4.80** | **3.65** | **3.45** |

## Recomendación
Adoptar **Opción A: FastAPI + React SPA**. Maximiza la demostración de API-first, TDD por capas y gobierno de contratos (OpenAPI). El costo demo se controla con SQLite y GitHub Pages.

## Decisiones asociadas
- **ADR-P-001**: selección de stack FastAPI + React SPA (enriquecido en Fase 2).

## Estimación de costos
Ver `spec/cost-estimation.md` para CAPEX/OPEX/TCO por escenario.

## Historias técnicas iniciales
Ver `spec/technical-stories.md`.
