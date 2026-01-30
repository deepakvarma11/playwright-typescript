import { Page } from "@playwright/test"
import { PimPage } from "./pim.page";
import { HomePage } from "./home.page";
import { LoginPage } from "./login.page";

export const Pages = (page:Page) => {
    return {
        loginPage: new LoginPage(page),
        homePage: new HomePage(page),
        pimPage: new PimPage(page)
    };
}