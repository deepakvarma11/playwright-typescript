import { test } from "@playwright/test";

test("First test", async ({ page }) => {
  await page.goto("https://www.google.com");
  console.log("This is the first test");
  await page.getByRole("button", { name: "Google apps" }).click();
});

test("Second test", () => {
  console.log("This is the second test");
});
