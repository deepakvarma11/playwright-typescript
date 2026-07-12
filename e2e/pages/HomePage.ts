import { BasePage } from "./BasePage";
import { Page } from "@playwright/test";
import { Logger } from "../utils/Logger";
import { Env } from "../frameworkConfig/env";

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private readonly pim = this.page.getByRole("link", { name: "PIM" });

  async navigateToPIM() {
    await this.click(this.pim);
    await this.waitForURL(/pim/);
    Logger.info(`Navigated to PIM page`);
    // await this.page.waitForURL(/pim/, { timeout: 10000 });
  }

  async navigateToDashBoard() {
    await this.goto(Env.URL);
  }

  async expectDashboardPage() {
    await this.expectURL(/dashboard/);
  }
}
