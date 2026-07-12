import { expect, test } from "../../fixtures/base.fixture";
import { Env } from "../../frameworkConfig/env";

test("Login pass", async ({ page, loginPage }) => {
  await loginPage.goToLoginScreen();
  await loginPage.login(Env.LOGIN_USERNAME, Env.LOGIN_PASSWORD);
  await expect(page).toHaveURL(/dashboard/);
});

test("Login fail", async ({ loginPage }) => {
  await loginPage.goToLoginScreen();
  await loginPage.login("invalidUser", "invalidPass");
  await loginPage.expectInvalidCredentials();
});
