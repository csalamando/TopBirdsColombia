import { defineRailway, github, project, service } from "railway/iac";

// Top Birds Colombia — servicio backend (FastAPI + SQLite en contenedor Docker).
// Build: el builder Docker del servicio compila el Dockerfile de la raíz
// (el DSL de IaC no expone dockerfilePath; es configuración del servicio).
// dockerfile: Dockerfile

export const partial = "TopBirdsColombia";

export default defineRailway(() => {
  const TopBirdsColombia = service("TopBirdsColombia", {
    source: github("csalamando/TopBirdsColombia"),
    start: "",
    healthcheck: "/health",
    healthcheckTimeout: 100,
    env: {
      PORT: "8000",
      DATABASE_URL: "/app/data/topbirds.db",
      CORS_ORIGINS:
        "https://topbirdscolombia-production.up.railway.app,http://localhost:8000",
    },
  });
  return project("incredible-perception", {
    resources: [TopBirdsColombia],
  });
});

