import { test, expect } from "@playwright/test";

test("Locators practise", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/v1/");
  await page.locator("//*[@placeholder='Username']").fill("standard_user");
  await page.locator("#password").fill("secret_sauce");
  await page.locator("input.btn_action").click();
  await expect(page.getByText("Products")).toHaveText("Products");
  await page.locator("text=Sauce LABS Backpack").click();
  await page.locator(".btn_primary.btn_inventory").click();
});

test("Locator method", async ({ page }) => {
  await page.goto("https://demo.nopcommerce.com/login");
  await page
    .getByLabel("Email:", { exact: true })
    .fill("deepakavarma@gmail.com");
  await page.getByPlaceholder("Search store").pressSequentially("app");
  console.log(await page.getByText("creating").textContent());
  await page.getByAltText("nopCommerce demo store").click();
  await page
    .getByTitle("Show products in category Electronics")
    .first()
    .click();
  await page.getByRole("link", { name: "Picture for category Camera" }).click();
});

test("Practise locators method with options", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/v1/");
  await page
    .locator(".form_group", { has: page.locator("input#user-name") })
    .click();
  await page
    .locator(".form_group", { has: page.locator("input#user-name") })
    .pressSequentially("standard_user");
  // await page.locator('.form_group', { has: page.locator('input#password') }).click();
  // await page.locator('.form_group', { has: page.locator('input#password') }).pressSequentially('secret_sauce', { delay: 100 });
  await page
    .locator(".form_group", { hasNot: page.locator("input#user-name") })
    .click();
  await page
    .locator(".form_group", { hasNot: page.locator("input#user-name") })
    .pressSequentially("secret_sauce", { delay: 10 });
  await page.locator("input.btn_action").click();
  await expect(page.getByText("Products")).toHaveText("Products");
  await page.locator("//a", { hasText: "Sauce LABS Backpack" }).click();
});

test("Test Make My trip", async ({ page }) => {
  await page.goto("https://www.makemytrip.com/");
  await page.locator("//span[@data-cy='closeModal']").click();
  await page.getByPlaceholder("From").fill("Hyderabad");
  await page.getByPlaceholder("To").fill("Visakhapatnam");

  // Click on departure date to open date picker
  // await page.locator('[data-cy="departureDate"]').click();

  // Click next month button
  await page.locator(".DayPicker-NavButton--next").click();

  // Select the 1st of the next month
  await page.locator('.DayPicker-Day[aria-label*="1,"]').first().click();

  // Optionally, select return date as 1st of the month after that
  await page.locator('[data-cy="returnDate"]').click();
  await page.locator(".DayPicker-NavButton--next").click();
  await page.locator('.DayPicker-Day[aria-label*="1,"]').first().click();
});
