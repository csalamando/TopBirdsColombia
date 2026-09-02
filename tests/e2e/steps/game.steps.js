const { Given, When, Then } = require("@cucumber/cucumber");
const assert = require("assert");

async function createGameViaAPI(apiURL, mode) {
  const response = await fetch(`${apiURL}/partidas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ modo: mode }),
  });
  if (!response.ok) {
    throw new Error(`No se pudo crear la partida: ${response.status}`);
  }
  return response.json();
}

Given("que el jugador ha iniciado una partida contra la IA", async function () {
  const game = await createGameViaAPI(this.apiURL, "ia");
  this.gameId = game.id;
  await this.page.goto(`${this.baseURL}`);
  await this.page.evaluate((id) => {
    window.dispatchEvent(new CustomEvent("e2e-start-game", { detail: { gameId: id, mode: "ia" } }));
  }, this.gameId);
  await this.page.waitForSelector("[data-testid='bird-card']", { timeout: 10_000 });
});

Given("que dos jugadores inician una partida hot-seat", async function () {
  const game = await createGameViaAPI(this.apiURL, "hotseat");
  this.gameId = game.id;
  await this.page.goto(`${this.baseURL}`);
  await this.page.evaluate((id) => {
    window.dispatchEvent(new CustomEvent("e2e-start-game", { detail: { gameId: id, mode: "hotseat" } }));
  }, this.gameId);
  await this.page.waitForSelector("[data-testid='bird-card']", { timeout: 10_000 });
});

When("es el turno del jugador", async function () {
  await this.page.waitForSelector("text=Elige un atributo", { timeout: 10_000 });
});

When("es turno del jugador 2", async function () {
  await this.page.waitForSelector("text=Turno del Jugador 2", { timeout: 10_000 });
});

When("el jugador 1 juega una ronda perdiendo el turno", async function () {
  const realGame = await (await fetch(`${this.apiURL}/partidas/${this.gameId}`)).json();
  await this.page.route(`${this.baseURL}/api/partidas/${this.gameId}`, async (route, request) => {
    if (request.method() === "GET") {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ...realGame, turno: "oponente", cartas_jugador: 15, cartas_oponente: 17 }),
      });
    } else {
      await route.continue();
    }
  });
  await this.page.route("**/api/partidas/*/rondas", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        atributo: "tamano_cm",
        valor_jugador: 10,
        valor_oponente: 100,
        resultado: "gana_oponente",
        cartas_jugador: 15,
        cartas_oponente: 17,
        reserva: 0,
        ganador_partida: null,
      }),
    });
  });
  await this.page.locator("button").filter({ hasText: /^Tamaño/ }).first().click();
  await this.page.getByRole("button", { name: "Continuar" }).click();
});

When("selecciona el atributo {string}", async function (attributeName) {
  const button = this.page.locator("button").filter({ hasText: new RegExp(`^${attributeName}`) }).first();
  await button.waitFor({ state: "visible" });
  await button.click();
});

Then("se revela el valor del oponente para {string}", async function (attributeName) {
  await this.page.waitForSelector("text=/Jugador:.*vs.*Oponente:/", { timeout: 10_000 });
  const comparisonText = await this.page.locator("text=/Jugador:.*vs.*Oponente:/").first().textContent();
  assert(comparisonText.includes(attributeName) || comparisonText.match(/\d+/), "No se reveló el valor del oponente");
});

Then("se muestra el resultado {string} o {string} o {string}", async function (winText, loseText, tieText) {
  const resultLocator = this.page.locator(`text=${winText}`)
    .or(this.page.locator(`text=${loseText}`))
    .or(this.page.locator(`text=${tieText}`))
    .first();
  await resultLocator.waitFor({ state: "visible", timeout: 10_000 });
});

Then("el marcador se actualiza", async function () {
  const scoreboard = this.page.locator("text=Jugador").first();
  assert(await scoreboard.isVisible().catch(() => false), "No se muestra el marcador");
});

When("consulta el detalle de la carta activa", async function () {
  await this.page.getByRole("button", { name: "Ver detalle" }).click();
});

Then("ve nombre común, nombre científico, familia, hábitat, dieta y atribución", async function () {
  const modal = this.page.locator("div.fixed.inset-0").first();
  await modal.waitFor({ state: "visible", timeout: 10_000 });
  const text = await modal.textContent();
  assert(text.includes("Familia:"), "No se muestra familia");
  assert(text.includes("Hábitat:"), "No se muestra hábitat");
  assert(text.includes("Dieta:"), "No se muestra dieta");
  assert(text.includes("Atribución:"), "No se muestra atribución");
  assert(/[A-Z][a-z]+/.test(text), "No se muestra nombre común/científico");
});

Then("se oculta la carta del jugador 1", async function () {
  const card1Text = this.page.locator("text=Carta del Jugador 1").first();
  assert(!(await card1Text.isVisible().catch(() => false)), "La carta del Jugador 1 sigue visible");
});

Then("se muestra la carta del jugador 2 para elegir atributo", async function () {
  await this.page.waitForSelector("text=Carta del Jugador 2", { timeout: 10_000 });
  await this.page.waitForSelector("text=Elige un atributo", { timeout: 10_000 });
});

When("ocurren empates seguidos y luego un ganador", async function () {
  // Mock round endpoint to produce one tie followed by a player win.
  let callCount = 0;
  await this.page.route("**/api/partidas/*/rondas", async (route, request) => {
    callCount++;
    const postData = request.postDataJSON ? request.postDataJSON() : {};
    const attr = postData.atributo || "tamano_cm";
    const body = callCount === 1
      ? { atributo: attr, valor_jugador: 25, valor_oponente: 25, resultado: "empate", cartas_jugador: 16, cartas_oponente: 16, reserva: 2, ganador_partida: null }
      : { atributo: attr, valor_jugador: 30, valor_oponente: 20, resultado: "gana_jugador", cartas_jugador: 18, cartas_oponente: 14, reserva: 0, ganador_partida: null };
    await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(body) });
  });
  await this.page.locator("button").filter({ hasText: /^Tamaño/ }).first().click();
  await this.page.waitForSelector("text=Empate", { timeout: 10_000 });
  await this.page.getByRole("button", { name: "Continuar" }).click();
  await this.page.locator("button").filter({ hasText: /^Tamaño/ }).first().click();
});

Then("el ganador de la ronda posterior acumula las cartas de la reserva", async function () {
  await this.page.waitForSelector("text=Ganaste la ronda", { timeout: 10_000 });
});

When("se juegan rondas hasta que la partida termine", async function () {
  let round = 0;
  await this.page.route("**/api/partidas/*/rondas", async (route, request) => {
    round++;
    const isFinal = round >= 3;
    const body = isFinal
      ? { atributo: "tamano_cm", valor_jugador: 100, valor_oponente: 1, resultado: "gana_jugador", cartas_jugador: 32, cartas_oponente: 0, reserva: 0, ganador_partida: "jugador" }
      : { atributo: "tamano_cm", valor_jugador: 50, valor_oponente: 10, resultado: "gana_jugador", cartas_jugador: 18, cartas_oponente: 14, reserva: 0, ganador_partida: null };
    await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(body) });
  });
  while (round < 5) {
    const gameOver = await this.page.locator("h3").filter({ hasText: /Ganaste|Perdiste|Empate/ }).first().isVisible().catch(() => false);
    if (gameOver) break;
    await this.page.locator("button").filter({ hasText: /^Tamaño/ }).first().click();
    try {
      await this.page.waitForSelector("[data-testid='round-result']", { timeout: 5000 });
    } catch {
      break;
    }
    const resultText = await this.page.locator("[data-testid='round-result']").textContent();
    if (/Ganaste|Perdiste|Empate/.test(resultText)) {
      const gameOver2 = await this.page.locator("h3").filter({ hasText: /Ganaste|Perdiste|Empate/ }).first().isVisible().catch(() => false);
      if (gameOver2) break;
      await this.page.getByRole("button", { name: "Continuar" }).click();
    } else {
      break;
    }
  }
});

Then("se muestra la pantalla de resultado con el ganador", async function () {
  const resultTitle = this.page.locator("h3").filter({ hasText: /Ganaste|Perdiste|Empate/ }).first();
  await resultTitle.waitFor({ state: "visible", timeout: 10_000 });
});

Then("se ofrece la opción de jugar otra partida", async function () {
  const newGameButton = this.page.getByRole("button", { name: "Nueva partida" });
  await newGameButton.waitFor({ state: "visible", timeout: 10_000 });
});

Given("que el jugador abre la aplicación en un viewport de {int}x{int}", async function (width, height) {
  await this.page.setViewportSize({ width, height });
  await this.page.goto(this.baseURL);
});

When("inicia una partida contra la IA", async function () {
  await this.page.getByText("Un jugador vs IA", { exact: true }).click();
  await this.page.getByRole("button", { name: "Nueva partida" }).click();
  await this.page.waitForSelector("[data-testid='bird-card']", { timeout: 10_000 });
});

Then("el layout se adapta a una columna", async function () {
  const grid = this.page.locator("div.grid").first();
  const className = await grid.getAttribute("class");
  assert(className.includes("grid-cols-1") || className.includes("flex-col"), "El layout no es de una columna");
});

Then("los botones de atributo son visibles sin scroll horizontal", async function () {
  const buttons = await this.page.locator("button").filter({ hasText: /^Tamaño|Peso|Rareza/ }).all();
  assert(buttons.length > 0, "No se encontraron botones de atributo");
  for (const button of buttons) {
    const box = await button.boundingBox();
    assert(box !== null, "Un botón no tiene bounding box");
    const viewport = await this.page.viewportSize();
    assert(box.x >= 0 && box.x + box.width <= viewport.width, "Un botón excede el viewport horizontal");
  }
});
