import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Locator } from "@playwright/test";

export class PimPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private readonly employeeList = this.page.getByRole("link", {
    name: "Employee List",
  });
  private readonly employeeIdInput = this.page.getByRole("textbox").nth(2);
  private readonly searchButton = this.page.getByRole("button", {
    name: "Search",
  });
  private readonly noRecordsFound = this.page
    .locator("span")
    .filter({ hasText: "No Records Found" });

  private readonly addEmployeeButton = this.page.getByRole("link", {
    name: "Add Employee",
  });

  private readonly firstName = this.page.getByRole("textbox", {
    name: "First Name",
  });
  private readonly middleName = this.page.getByRole("textbox", {
    name: "Middle Name",
  });
  private readonly lastName = this.page.getByRole("textbox", {
    name: "Last Name",
  });
  private readonly employeeid = this.page.getByRole("textbox").nth(4);
  private readonly saveButton = this.page.getByRole("button", { name: "Save" });
  private readonly successMessage = this.page.getByText(/Successfully Saved/i);

  private readonly employeeCheckbox = `//div[normalize-space(text())='$REPLACE']/ancestor::div[contains(@class,'oxd-table-row')]//div[contains(@class,'oxd-checkbox-wrapper')]`;
  private readonly deleteButton = this.page.getByRole("button", { name: "" });
  private readonly confirmDeleteButton = this.page.getByRole("button", {
    name: " Yes, Delete",
  });

  async navigateToEmployeeList() {
    await this.click(this.employeeList);
  }

  async clickAddEmployee() {
    await this.click(this.addEmployeeButton);
  }

  async addEmployee(
    firstName: string,
    middleName: string,
    lastName: string,
    employeeId: string,
  ) {
    await this.click(this.addEmployeeButton);
    await this.page.waitForLoadState("domcontentloaded");
    await this.waitForVisible(this.firstName);
    await this.fill(this.firstName, firstName);
    await this.fill(this.middleName, middleName);
    await this.fill(this.lastName, lastName);
    await this.click(this.employeeid);
    await this.fill(this.employeeid, employeeId);
    await this.click(this.saveButton);
    await this.waitForURL(/viewPersonalDetails/);
  }

  async searchEmployeeById(employeeId: string) {
    await this.waitForVisible(this.employeeIdInput);
    await this.click(this.employeeIdInput);
    await this.fill(this.employeeIdInput, employeeId);
    await this.click(this.searchButton);

    // Wait until loading spinner disappears
    const spinner = this.page.locator(".oxd-loading-spinner");
    await spinner.waitFor({ state: "hidden" });

    // Wait until either table OR no-records appears
    await Promise.race([
      this.noRecordsFound.waitFor(),
      this.page.locator(".oxd-table-body").waitFor(),
    ]);
  }

  async isNoRecordsFoundVisible(): Promise<boolean> {
    return this.isVisible(this.noRecordsFound);
  }

  async expectNoRecordsFoundVisible() {
    await this.expectVisible(this.noRecordsFound);
  }

  async isEmployeePresent(employeeId: string): Promise<boolean> {
    const checkbox = await this.checkboxForEmployee(employeeId);
    return await checkbox.isVisible().catch(() => false);
  }

  private async checkboxForEmployee(employeeId: string): Promise<Locator> {
    const chckBox = await this.getReplaceLocator(
      this.employeeCheckbox,
      employeeId,
    );
    // const chckBox = this.employeeCheckbox.replace('$EMPLOYEEID', employeeId);
    // const xpath = `//div[normalize-space(text())='${employeeId}']/ancestor::div[contains(@class,'oxd-table-row')]//div[contains(@class,'oxd-checkbox-wrapper')]`;
    return chckBox;
  }

  async removeEmployeeById(employeeId: string) {
    // await this.searchEmployeeById(employeeId);
    const checkbox = await this.checkboxForEmployee(employeeId);
    await this.waitForVisible(checkbox);
    await this.click(checkbox);
    await this.click(this.deleteButton);
    await this.click(this.confirmDeleteButton);
    await this.page
      .getByText("Info", { exact: true })
      .waitFor({ state: "visible" });
  }
}
