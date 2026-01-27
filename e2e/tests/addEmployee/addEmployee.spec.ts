import { test, expect } from "@playwright/test";
import { Env } from "../../frameworkConfig/env";

test("Test Add employee", async ({ page }) => {
  await page.goto(Env.URL);
  await page
    .getByRole("textbox", { name: "Username" })
    .fill(Env.LOGIN_USERNAME);
  await page
    .getByRole("textbox", { name: "Password" })
    .fill(Env.LOGIN_PASSWORD);
  await page.getByRole("button", { name: "Login" }).click();
  await page.waitForLoadState('networkidle');
  await page.getByRole("link", { name: "PIM" }).click();
  await page.getByRole("link", { name: "Employee List" }).click();
  await page.getByRole('textbox').nth(2).click();
  await page.getByRole('textbox').nth(2).fill('0888');  
  await page.getByRole('button', { name: 'Search' }).click();
  await page.waitForTimeout(3000);
  console.log(await page.locator('//span[text()="No Records Found"]').isVisible());

  if(await page.locator('//span[text()="No Records Found"]').isVisible()){
      await page.getByRole('link', { name: 'Add Employee' }).click();
      await page.getByRole('textbox', { name: 'First Name' }).fill('iaydgfaid');
      await page.getByRole('textbox', { name: 'Middle Name' }).fill('daikuhdai');
      await page.getByRole('textbox', { name: 'Last Name' }).fill('daskduh');
      await page.getByRole('textbox').nth(4).click();
      await page.getByRole('textbox').nth(4).fill('0888');
      await page.getByRole('button', { name: 'Save' }).click();
      await expect(page.getByText(/Successfully Saved/i)).toBeVisible();
  } else {
          await page
      .locator(
        ".oxd-table-card-cell-checkbox > .oxd-checkbox-wrapper > label > .oxd-checkbox-input > .oxd-icon",
      )
      .click();
      await page.getByRole("button", { name: "" }).click();
      await page.getByRole("button", { name: " Yes, Delete" }).click();
      await expect(page.getByText("Info", { exact: true })).toBeVisible();
  }

});