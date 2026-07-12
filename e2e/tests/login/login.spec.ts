import { test } from "../../fixtures/base.fixture";
import { Env } from "../../frameworkConfig/env";

test.describe("Login testcases", async () => {
  test("Login pass", async ({ loginPage, homePage }) => {
    await loginPage.goToLoginScreen();
    await loginPage.login(Env.LOGIN_USERNAME, Env.LOGIN_PASSWORD);
    await homePage.expectDashboardPage();
  });

  test("Login invalid username", async ({ loginPage }) => {
    await loginPage.goToLoginScreen();
    await loginPage.login("invalidUser", Env.LOGIN_PASSWORD);
    await loginPage.expectInvalidCredentials();
  });

  test("Login invalid password", async ({ loginPage }) => {
    await loginPage.goToLoginScreen();
    await loginPage.login(Env.LOGIN_USERNAME, "invalidPass");
    await loginPage.expectInvalidCredentials();
  });
});
