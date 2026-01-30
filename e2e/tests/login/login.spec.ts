import { expect, test} from "@playwright/test"
import { Pages } from "../../pages/pages";
import { Env } from "../../frameworkConfig/env";

test('Login pass', async ({ page}) => {
    const pages = Pages(page);
    const login = pages.loginPage;
    await login.goToLoginScreen();
    await login.login(Env.LOGIN_USERNAME, Env.LOGIN_PASSWORD);
    await expect(page).toHaveURL(/dashboard/);
});


test('Login fail', async ({page}) => {
    const pages = Pages(page);
    const login = pages.loginPage;
    await login.goToLoginScreen();
    await login.login("invalidUser", "invalidPass");
    await expect(await login.isLoginErrorVisible()).toBeTruthy();
})


