# Pipeline CI/CD (derivado de .github/workflows/)

> Generado por `pipeline_diagram.py`. NO editar a mano: regenerar
> desde los workflows y aprobar el cambio con recibo
> (`receipt.py emit --role devops-engineer`).

## Workflow: Spec Governance

```mermaid
flowchart LR
    T(["push, branches, paths, spec/**, scripts/**, .agents/skills/**, .github/workflows/ci-spec-governance.yml, pull_request, paths, spec/**, scripts/**, .agents/skills/**"])
    spec_governance["spec-governance<br/>(5 steps)"]
    T --> spec_governance
```

Validación: OK — `needs:` íntegros, sin ciclos.

## Workflow: CI

```mermaid
flowchart LR
    T(["push, branches, pull_request, branches"])
    backend_lint["backend-lint<br/>(6 steps)"]
    backend_tests["backend-tests<br/>(5 steps)"]
    frontend_lint["frontend-lint<br/>(5 steps)"]
    frontend_tests["frontend-tests<br/>(4 steps)"]
    frontend_build["frontend-build<br/>(5 steps)"]
    e2e["e2e<br/>(12 steps)"]
    sca_backend["sca-backend<br/>(6 steps)"]
    sca_frontend["sca-frontend<br/>(4 steps)"]
    contract_dast["contract-dast<br/>(7 steps)"]
    T --> backend_lint
    T --> backend_tests
    T --> frontend_lint
    T --> frontend_tests
    T --> frontend_build
    T --> e2e
    T --> sca_backend
    T --> sca_frontend
    T --> contract_dast
```

| Severidad | Hallazgo |
|---|---|
| WARN | CI: job 'backend-lint' no tiene needs (corre en paralelo al inicio — ¿intencional?) |
| WARN | CI: job 'backend-tests' no tiene needs (corre en paralelo al inicio — ¿intencional?) |
| WARN | CI: job 'frontend-lint' no tiene needs (corre en paralelo al inicio — ¿intencional?) |
| WARN | CI: job 'frontend-tests' no tiene needs (corre en paralelo al inicio — ¿intencional?) |
| WARN | CI: job 'frontend-build' no tiene needs (corre en paralelo al inicio — ¿intencional?) |
| WARN | CI: job 'e2e' no tiene needs (corre en paralelo al inicio — ¿intencional?) |
| WARN | CI: job 'sca-backend' no tiene needs (corre en paralelo al inicio — ¿intencional?) |
| WARN | CI: job 'sca-frontend' no tiene needs (corre en paralelo al inicio — ¿intencional?) |
| WARN | CI: job 'contract-dast' no tiene needs (corre en paralelo al inicio — ¿intencional?) |

---
Workflows: 2 · Errores de integridad: 0
