import { EmployeeFactory } from "../../factories/EmployeeFactory";
import { test, expect } from "../../fixtures/base.fixture";
import { Env } from "../../frameworkConfig/env";

test("Verify if employee exists", async ({ page, homePage, pimPage }) => {
  test.step("Navigate to URL", async () => {
    await page.goto(Env.URL);
    await expect(page).toHaveURL(/dashboard/);
  });

  test.step("Navigate to Pim Page", async () => {
    await homePage.navigateToPIM();
  });

  const employee = EmployeeFactory.create();
  console.log(employee);

  await pimPage.searchEmployeeById(employee.employeeId);

  if (await pimPage.isNoRecordsFoundVisible()) {
    await pimPage.addEmployeeObject(employee);
  } else {
    await pimPage.removeEmployeeById(employee.employeeId);
  }
});

test("Verify no records found for invalid employee ID", async ({
  page,
  homePage,
  pimPage,
}) => {
  test.step("Navigate to URL", async () => {
    await page.goto(Env.URL);
    await expect(page).toHaveURL(/dashboard/);
  });

  test.step("Navigate to Pim Page", async () => {
    await homePage.navigateToPIM();
  });

  await pimPage.searchEmployeeById("999999");
  await pimPage.expectNoRecordsFoundVisible();
});
