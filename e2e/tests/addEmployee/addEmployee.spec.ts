import { test, expect } from "../../fixtures/base.fixture";
import { Env } from "../../frameworkConfig/env";

test("Verify if employee exists", async ({ page, homePage, pimPage }) => {
  // Navigate to your application
  await page.goto(Env.URL);

  // Verify you're already logged in (optional but recommended)
  await expect(page).toHaveURL(/dashboard/);

  await homePage.navigateToPIM();

  await pimPage.searchEmployeeById("0888");
  console.log("No records found:", await pimPage.isNoRecordsFoundVisible());

  if (await pimPage.isNoRecordsFoundVisible()) {
    await pimPage.addEmployee("firstname", "middelName", "lastName", "0888");
  } else {
    await pimPage.removeEmployeeById("0888");
  }
});

test("Verify no records found for invalid employee ID", async ({
  page,
  homePage,
  pimPage,
}) => {
  // Navigate to your application
  await page.goto(Env.URL);

  // Verify you're already logged in (optional but recommended)
  await expect(page).toHaveURL(/dashboard/);

  await homePage.navigateToPIM();
  
  await pimPage.searchEmployeeById("999999");

  await pimPage.isNoRecordsFoundVisible();
});
