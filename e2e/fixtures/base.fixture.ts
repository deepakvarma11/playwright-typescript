import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import { PimPage } from "../pages/PimPage";


type PageFixtures = {
    loginPage: LoginPage;
    homePage: HomePage;
    pimPage: PimPage;
}

export const test = base.extend<PageFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },

    pimPage: async ({ page }, use) => {
        await use(new PimPage(page));
    }
})

export { expect };