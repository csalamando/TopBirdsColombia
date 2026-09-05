# Estimación de costos — Top Trumps Aves de Colombia

## Resumen
Aplicación demo con frontend estático (GitHub Pages) y backend ligero (free/hobby tier). Sin PII, sin pagos, sin base de datos gestionada. Los costos se mantienen cercanos a cero en el escenario mínimo viable.

## Supuestos
Ver `spec/cost-assumptions.yaml`. Fecha de validez de precios: 2026-09-02.

## CAPEX (construcción)
Costos únicos durante los 15 sprints:

| Concepto | Costo estimado (USD) | Notas |
|---|---|---|
| Infraestructura de desarrollo | 0 | Uso de máquina local y GitHub gratis. |
| Licencias de software | 0 | Stack open source. |
| Herramientas opcionales | 0 | Penpot, VS Code, pytest, Vitest, Playwright son gratuitos. |
| Dominio demo (opcional) | 12/año | Solo si se compra dominio personalizado. |
| **CAPEX total** | **~0-12** | Sin dominio: 0. |

## OPEX mensual por escenario

### Escenario mínimo viable
| Concepto | Costo mensual (USD) |
|---|---|
| GitHub Pages (frontend) | 0 |
| Backend Railway (crédito trial único de $5) | 0 |
| GitHub Actions (dentro de límite gratis) | 0 |
| Almacenamiento/bandwidth | 0 |
| **Total OPEX/mes** | **0** (hasta agotar el crédito trial de Railway) |

### Escenario crecimiento esperado
| Concepto | Costo mensual (USD) |
|---|---|
| GitHub Pages (frontend) | 0 |
| Backend Railway (plan Hobby, uso por app) | ~5 |
| GitHub Actions (excedentes) | 0-5 |
| Almacenamiento/bandwidth | <1 |
| **Total OPEX/mes** | **~5-11** |

### Escenario pico
| Concepto | Costo mensual (USD) |
|---|---|
| GitHub Pages/CloudFront (frontend) | 0-5 |
| Backend starter (Render/Railway) | 5-15 |
| GitHub Actions (excedentes) | 5-15 |
| Almacenamiento/bandwidth | 1-5 |
| **Total OPEX/mes** | **~11-40** |

## TCO (3 años)
| Escenario | TCO 3 años (USD) |
|---|---|
| Mínimo viable | ~0 |
| Crecimiento esperado | ~216-468 |
| Pico | ~396-1440 |

## Sensibilidad y riesgos
- Si el tráfico supera el free tier de GitHub Actions, los costos de CI pueden crecer.
- Un backend serverless (AWS Lambda) podría reducir costos fijos pero aumentar complejidad operativa.
- El dominio es el único costo fijo opcional.
- Railway no tiene free tier permanente: tras el crédito trial de $5, el plan Hobby cuesta ~$5/mes con límite de uso por app. Si se requiere 0 USD/mes permanente, la alternativa es Render free tier (con cold starts).

## Recomendación de escenario objetivo
Para demostrar el arnés en 15 sprints, operar en **mínimo viable** (0 USD/mes con el crédito trial de Railway) y evaluar pasar a crecimiento esperado (~5 USD/mes, plan Hobby) solo si hay tráfico real post-demo.
