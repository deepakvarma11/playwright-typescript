import { test } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://www.makemytrip.com/");
  await page.getByRole("img", { name: "minimize" }).click();
  await page.locator(".commonModal__close").click();
  await page
    .getByRole("textbox", { name: "From DEL, Delhi Airport India" })
    .click();
  await page.getByRole("textbox", { name: "From", exact: true }).fill("hyde");
  await page
    .locator("#react-autowhatever-1-section-0-item-0")
    .getByText("Hyderabad, India")
    .click();
  await page.getByRole("textbox", { name: "To BLR, Bengaluru" }).click();
  await page.getByRole("textbox", { name: "To", exact: true }).fill("vis");
  await page.getByText("Visakhapatnam, India").click();
  await page.getByText("13,901", { exact: true }).click();
  await page.getByText("Search").click();
});
