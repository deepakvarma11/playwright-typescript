import { Page } from "@playwright/test";
import { PimPage } from "./PimPage";
import { HomePage } from "./HomePage";
import { LoginPage } from "./LoginPage";

export const Pages = (page: Page) => {
  return {
    loginPage: new LoginPage(page),
    homePage: new HomePage(page),
    pimPage: new PimPage(page),
  };
};
