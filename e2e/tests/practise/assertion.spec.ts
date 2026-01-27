import { test, expect } from "@playwright/test";

test("Assertions practise", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/v1/");
  await page.locator("input#user-name").fill("standard_user");
  await page.locator("input#password").fill("secret_sauce");
  await page.locator("input.btn_action").click();
  await expect(page.locator("//span[@data-test='title']")).toHaveText(
    "Products",
  );

  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

  await expect(page).toHaveURL(/.*inventory.*/);
  await expect(page).toHaveTitle(/Swag Labs/);

  // await expect.soft(page.locator(".inventory_item")).not.toHaveCount(6);
  await expect(page.locator(".inventory_item")).toHaveCount(6);

  await expect(
    page.locator("//a", { hasText: "Sauce LABS Backpack" }),
  ).toBeVisible();
  await expect(
    page.locator("//a", { hasText: "Sauce LABS Backpack" }),
  ).toBeEnabled();
});
