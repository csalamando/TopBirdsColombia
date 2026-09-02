# ADR-001: Selección de stack técnico para Top Trumps Aves de Colombia

## Paso 1: Problem Statement
Necesitamos elegir un stack tecnológico para construir una aplicación web demo de Top Trumps con aves de Colombia. El stack debe permitir desarrollo rápido, TDD estricto, API-first y despliegue de bajo costo, sin sacrificar la capacidad de escalar el demo si hay tracción.

## Paso 2: Last Responsible Moment
La decisión debe tomarse antes del Sprint 4 (inicio de Fase 4 Build). Postergarla generaría retrabajo porque backend y frontend necesitan un contrato estable. Reversar la decisión en Fase 4 tiene costo alto (rewriting de tests y componentes).

## Paso 3: Criterios de Evaluación
| Criterio | Peso |
|---|---|
| Alineación con API-first (P-002) | 25% |
| Facilidad de TDD estricto (P-003) | 25% |
| Costo demo cercano a cero | 20% |
| Madurez y soporte de comunidad | 15% |
| Separación frontend/backend | 15% |
| **Total** | **100%** |

## Paso 4: Opciones Consideradas

### Opción A: FastAPI + React SPA
Backend Python con FastAPI; frontend React + TypeScript + Vite.

### Opción B: Django + HTMX + templates
Backend Django con templates server-side; HTMX para interactividad.

### Opción C: Next.js full-stack (Vercel)
Framework full-stack con Next.js, Prisma y SQLite/Postgres.

## Paso 5: Advice Log
| Rol | Consejo | Fecha | Aplicado |
|---|---|---|---|
| solution-architect | FastAPI genera OpenAPI automático, facilitando API-first y contract testing | 2026-09-02 | Sí |
| enterprise-architect | Todas las tecnologías principales están en ADOPT del Tech Radar | 2026-09-02 | Sí |

## Paso 6: Scorecard
| Criterio | Peso | Opción A | Opción B | Opción C |
|---|---|---|---|---|
| Alineación con API-first (P-002) | 25% | 5 (1.25) | 3 (0.75) | 3 (0.75) |
| Facilidad de TDD estricto (P-003) | 25% | 5 (1.25) | 4 (1.00) | 4 (1.00) |
| Costo demo cercano a cero | 20% | 4 (0.80) | 4 (0.80) | 3 (0.60) |
| Madurez y soporte de comunidad | 15% | 5 (0.75) | 5 (0.75) | 4 (0.60) |
| Separación frontend/backend | 15% | 5 (0.75) | 2 (0.30) | 3 (0.45) |
| **Total** | **100%** | **4.80** | **3.65** | **3.45** |

## Paso 7: Decisión
Adoptar **Opción A: FastAPI + React SPA**. Es la ganadora en la scorecard y maximiza la demostración de API-first y TDD por capas.

### Consecuencias positivas
- Contrato OpenAPI auto-generado facilita contract testing.
- Frontend y backend pueden desarrollarse en paralelo con MSW.
- Ecosistema maduro con pytest y Vitest.

### Consecuencias negativas aceptadas
- Dos proyectos de build que gestionar.
- Mayor complejidad inicial que una solución monolítica server-side.

### Qué NO se decidió
- No se elige proveedor cloud específico para producción; eso se decidirá en Fase 6.
- No se decide migración a Postgres; se mantiene SQLite para el MVP.

## Paso 8: Re-evaluation Triggers
- El costo demo supera 20 USD/mes.
- Se requiere multijugador online real (no hot-seat).
- El equipo no logra cobertura ≥70% con el stack actual.

## Risk Tier
Tier 3 (aplicación de entretenimiento sin PII, pagos ni datos críticos).
