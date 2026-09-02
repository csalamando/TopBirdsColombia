const { test, expect } = require("@playwright/test");

test("flujo completo: crear partida y jugar una ronda", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("button", { name: /Nueva partida/i })).toBeVisible();
  await page.getByRole("button", { name: /Nueva partida/i }).click();

  await expect(
    page.getByText(/Elige un atributo|Turno del oponente/)
  ).toBeVisible({ timeout: 10_000 });

  if (await page.getByText("Turno del oponente").isVisible()) {
    await page.getByRole("button", { name: /Jugar turno de la IA/i }).click();
    await expect(page.getByText("Elige un atributo")).toBeVisible({ timeout: 10_000 });
  }

  await page.getByRole("button", { name: /Tamaño/i }).click();

  await expect(
    page.getByText(/Ganaste la ronda|Perdiste la ronda|Empate/i).first()
  ).toBeVisible({ timeout: 10_000 });
});
