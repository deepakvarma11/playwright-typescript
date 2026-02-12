import { BasePage } from "./base.page";
import { Locator } from "@playwright/test";

export class PimPage extends BasePage {
  private readonly employeeList = this.page.getByRole("link", {
    name: "Employee List",
  });
  private readonly employeeIdInput = this.page.getByRole("textbox").nth(2);
  private readonly searchButton = this.page.getByRole("button", {
    name: "Search",
  });
  private readonly noRecordsFound = this.page.locator(
    '//span[text()="No Records Found"]',
  );
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
    await this.employeeList.click();
  }

  async clickAddEmployee() {
    await this.addEmployeeButton.click();
  }

  async addEmployee() {
    await this.addEmployeeButton.click();
    await this.firstName.waitFor({ state: "visible" });
    await this.firstName.fill("iaydgfaid");
    await this.middleName.fill("daikuhdai");
    await this.lastName.fill("daskduh");
    await this.employeeid.click();
    await this.employeeid.fill("0888");
    await this.saveButton.click();
    await this.successMessage.isVisible();
  }

  async searchEmployeeById(employeeId: string) {
    await this.employeeIdInput.waitFor({ state: "visible" });
    await this.employeeIdInput.click();
    await this.employeeIdInput.fill(employeeId);
    await this.searchButton.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async isNoRecordsFoundVisible(): Promise<boolean> {
    await this.page.waitForLoadState("domcontentloaded");
    return await this.noRecordsFound.isVisible({ timeout: 5000 });
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
    await this.searchEmployeeById(employeeId);
    const checkbox = await this.checkboxForEmployee(employeeId);
    await checkbox.waitFor({ state: "visible" });
    await checkbox.click();
    await this.deleteButton.click();
    await this.confirmDeleteButton.click();
    await this.page
      .getByText("Info", { exact: true })
      .waitFor({ state: "visible" });
  }
}
