import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Locator } from "@playwright/test";
import { Employee } from "../models/Employee";
import { Logger } from "../utils/Logger";

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
    .getByText("No Records Found", { exact: true })
    .first();

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

  private readonly deleteButton = this.page.getByRole("button", { name: "" });
  private readonly confirmDeleteButton = this.page.getByRole("button", {
    name: " Yes, Delete",
  });

  async navigateToEmployeeList() {
    await this.click(this.employeeList);
    Logger.info("Navigated to Employee list");
  }

  async clickAddEmployee() {
    await this.click(this.addEmployeeButton);
  }

  async addEmployeeObject(employee: Employee) {
    await this.click(this.addEmployeeButton);
    await this.waitForVisible(this.firstName);
    await this.fill(this.firstName, employee.firstName);
    await this.fill(this.middleName, employee.middleName);
    await this.fill(this.lastName, employee.lastName);
    await this.click(this.employeeid);
    await this.fill(this.employeeid, employee.employeeId);
    await this.click(this.saveButton);
    await this.waitForURL(/viewPersonalDetails/);
    Logger.info(`Employee Added successfully: ${employee}`);
  }

  async searchEmployeeById(employeeId: string) {
    await this.page.waitForLoadState("domcontentloaded");
    await this.waitForVisible(this.employeeIdInput);
    await this.click(this.employeeIdInput);
    await this.fill(this.employeeIdInput, employeeId);
    await this.click(this.searchButton);

    const employeeRow = this.employeeRowForId(employeeId);
    await employeeRow.or(this.noRecordsFound).waitFor({ state: "visible" });
  }

  async isNoEmployeeExists(): Promise<boolean> {
    return this.isVisible(this.noRecordsFound);
  }

  async expectNoEmployeeExists() {
    await this.expectVisible(this.noRecordsFound);
  }

  async isEmployeePresent(employeeId: string): Promise<boolean> {
    return await this.employeeRowForId(employeeId).isVisible();
  }

  private employeeRowForId(employeeId: string): Locator {
    return this.page
      .locator(".oxd-table-row")
      .filter({ has: this.page.getByText(employeeId, { exact: true }) });
  }

  async removeEmployeeById(employeeId: string) {
    const checkbox = this.employeeRowForId(employeeId).locator(
      ".oxd-checkbox-wrapper",
    );
    await this.waitForVisible(checkbox);
    await this.click(checkbox);
    await this.click(this.deleteButton);
    await this.click(this.confirmDeleteButton);
    await this.page
      .getByText("Info", { exact: true })
      .waitFor({ state: "visible" });

    Logger.success("Employee Deleted Successfully : ${employeeId}");
  }
}
