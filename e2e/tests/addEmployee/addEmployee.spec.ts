import { EmployeeFactory } from "../../factories/EmployeeFactory";
import { test } from "../../fixtures/base.fixture";

test.beforeEach("Login to the Application", async ({ homePage }) => {
  test.step("Navigate to URL", async () => {
    await homePage.navigateToDashBoard();
    await homePage.expectDashboardPage();
  });

  test.step("Navigate to Pim Page", async () => {
    await homePage.navigateToPIM();
  });
});

test("Verify employee exists and if exists delete the employee", async ({
  pimPage,
}) => {
  const employee = EmployeeFactory.create();
  await pimPage.searchEmployeeById(employee.employeeId);

  if (await pimPage.isNoEmployeeExists()) {
    await pimPage.addEmployeeObject(employee);
  } else {
    await pimPage.removeEmployeeById(employee.employeeId);
  }
});

test("Verify no employee exists for invalid employee ID", async ({
  pimPage,
}) => {
  await pimPage.searchEmployeeById("999999");
  await pimPage.expectNoEmployeeExists();
});
