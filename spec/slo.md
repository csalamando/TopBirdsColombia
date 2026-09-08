# SLOs y Error Budgets

Versión: 1.0 | Emitido: 2026-09-08 | Aprobado por: PO + Architect (demo, sin acuerdo formal de SLA — ref: NFR en `spec/architecture.md`)

## Alcance

Servicio desplegado: API FastAPI (**TopBirdsColombia**) en Railway, health check `GET /health` (configurado en `.railway/railway.ts`). Sin APM/profiling instalado; la medición se apoya en el health check de Railway y un probe externo.

## SLOs

| Servicio | SLI | SLO | Error budget (30d) | Consecuencia al agotarlo |
|---|---|---|---|---|
| API (Railway) | Disponibilidad: requests `2xx` de `/health` / total de probes | **95%** (NFR `spec/architecture.md`) | ~36 h de downtime | Congelar features; solo trabajo de confiabilidad hasta recuperar el budget |
| API (Railway) | Latencia p95 del health check | < 500 ms | — (informativo) | Si se supera 3 ventanas seguidas, abrir item de deuda técnica en `spec/tech-debt.md` |
| Pipeline CI | Disponibilidad: ejecuciones del workflow CI exitosas / totales | ≥ 90% | — | CI rojo bloquea despliegue (ya es frontera dura; el SLO mide salud del pipeline, no del producto) |

Nota de honestidad (v2.15 §4g): no hay APM real (presupuesto demo ~cero). El SLO de latencia es **indicativo**, medido sobre el health check, no sobre endpoints de negocio (`/api/partidas`, `/api/aves`). Si el demo crece, instrumentar Prometheus/Grafana o el observability del proveedor antes de endurecer este SLO.

## Medición

- **Railway**: health check del servicio `TopBirdsColombia` (definido en IaC, `.railway/railway.ts`) — métricas de uptime en el dashboard de Railway.
- **Probe externo gratuito** (recomendado, pendiente de configurar): UptimeRobot o similar sobre `https://<servicio>.up.railway.app/health`, intervalo 5 min, alerta por correo. Acorde a la restricción de presupuesto ~cero de `spec/vision.md`.
- **Verificación manual**:
  ```powershell
  curl https://<servicio>.up.railway.app/health   # {"status":"ok"}
  ```
- Ventana de evaluación: 30 días corridos. Revisión mensual: proponer ajustes al Architect/PO con los datos del probe.

## Playbooks de incidentes

| Alerta | Severidad | Respuesta |
|---|---|---|
| Health check fallando (> 2 probes seguidos) | sev-2 | 1) Verificar estado del servicio en Railway dashboard → 2) Si el deploy actual falló: rollback al deployment anterior (`railway rollback` / redeploy del último commit verde) → 3) Si persiste: revisar logs (`railway logs`) → 4) Postmortem si sev-1/sev-2 con > 30 min de impacto |
| CI en rojo en `main` | sev-3 | No promover despliegue. Corregir con TDD (test que reproduce primero); escalar a humano si el fix excede el alcance del demo |
| Error budget agotado (> 36 h downtime acumulado / 30d) | sev-2 | Congelar features (solo confiabilidad) + revisión de causas con PO/Architect |

## Postmortems

Sin incidentes sev-1/sev-2 registrados a la fecha (2026-09-08). Toda incidente futuro de esas severidades tendrá postmortem sin culpables en < 5 días, usando la plantilla `sdlc-sre/assets/postmortem.md`; sus acciones correctivas se registran en el backlog del PO.

## Deuda técnica de operación

- Falta probe externo de uptime (configurar UptimeRobot — acción inmediata, sin costo).
- Falta APM para latencia de endpoints de negocio (diferido; re-evaluar si el demo recibe tráfico real).
