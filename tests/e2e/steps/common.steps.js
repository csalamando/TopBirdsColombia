const { Given, When, Then } = require("@cucumber/cucumber");
const assert = require("assert");

Given("que el jugador está en la pantalla de inicio", async function () {
  await this.page.goto(this.baseURL);
  await this.page.waitForSelector("button:has-text('Nueva partida')");
});

When("selecciona {string}", async function (label) {
  await this.page.getByText(label, { exact: true }).click();
});

When("presiona {string}", async function (label) {
  const button = this.page.getByRole("button", { name: label });
  await button.waitFor({ state: "visible" });
  await button.click();
});

Then("se crea una partida y se muestra la primera carta con atributos visibles", async function () {
  await this.page.waitForSelector("[data-testid='bird-card']", { timeout: 10_000 });
  const attributeButtons = await this.page.locator("button").filter({ hasText: /^[A-Za-zÁÉÍÓÚáéíóúñÑ]+/ }).count();
  assert(attributeButtons > 0, "No se encontraron botones de atributo");
});

Then("se crea una partida hot-seat y se muestra la primera carta", async function () {
  await this.page.waitForSelector("[data-testid='bird-card']", { timeout: 10_000 });
  const turnText = await this.page.locator("text=Turno del Jugador 1").first();
  assert(await turnText.isVisible().catch(() => false), "No se muestra el turno del Jugador 1");
});

Given("que el jugador abre la aplicación", async function () {
  await this.page.goto(this.baseURL);
});

Then("se muestra el botón de inicio sin datos vacíos", async function () {
  const button = this.page.getByRole("button", { name: "Nueva partida" });
  await button.waitFor({ state: "visible" });
  assert(await button.isEnabled(), "El botón Nueva partida no está habilitado");
});

Given("que el backend no está disponible", async function () {
  await this.page.route("**/api/partidas", async (route) => {
    await route.fulfill({ status: 503, contentType: "application/json", body: JSON.stringify({ detail: "Servicio no disponible" }) });
  });
});

When("el jugador intenta iniciar una partida", async function () {
  await this.page.getByLabel("Un jugador vs IA").check();
  await this.page.getByRole("button", { name: "Nueva partida" }).click();
});

Then("se muestra un mensaje de error y un botón para reintentar", async function () {
  const errorText = this.page.locator("text=/Error|no disponible|Error al crear/").first();
  await errorText.waitFor({ state: "visible", timeout: 10_000 });
  const retryButton = this.page.getByRole("button", { name: /Reintentar|Volver|Retry/i });
  await retryButton.waitFor({ state: "visible", timeout: 10_000 });
});
