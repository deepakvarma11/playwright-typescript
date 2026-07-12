import { test, expect } from "../fixtures/base.fixture";
import { Env } from "../frameworkConfig/env";

test("authenticate", async ({ page, loginPage }) => {

  // Navigate to login page
  await page.goto(Env.URL);

  // Login
  await loginPage.login(Env.LOGIN_USERNAME, Env.LOGIN_PASSWORD);

  // Verify login succeeded
  await expect(page).toHaveURL(/dashboard/);

  // Save authenticated session
  await page.context().storageState({
    path: "playwright/.auth/user.json",
  });
});
