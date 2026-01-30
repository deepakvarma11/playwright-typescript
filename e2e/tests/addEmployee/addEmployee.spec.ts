import { test, expect } from "@playwright/test";
import { Env } from "../../frameworkConfig/env";
import { Pages } from "../../pages/pages";

test("Verify if employee exists", async ({ page }) => {
  const pages = Pages(page);
  const loginPage = pages.loginPage;
  
  await page.goto(Env.URL); 
  await loginPage.login(Env.LOGIN_USERNAME, Env.LOGIN_PASSWORD);
  const homePage = pages.homePage;
  await homePage.navigateToPIM();
  const pimPage = pages.pimPage;

  await pimPage.searchEmployeeById("0888");
  console.log(await pimPage.isNoRecordsFoundVisible());


  if(await pimPage.isNoRecordsFoundVisible()){
      await pimPage.addEmployee();
  } else {
      await pimPage.removeEmployeeById("0888");
      await expect(page.getByText("Info", { exact: true })).toBeVisible();
  }

});