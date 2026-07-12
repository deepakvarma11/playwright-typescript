import { BasePage } from "./BasePage";
import { Page } from "@playwright/test";

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private readonly pim = this.page.getByRole("link", { name: "PIM" });

  async navigateToPIM() {
    await this.click(this.pim);
    await this.waitForURL(/pim/);
    // await this.page.waitForURL(/pim/, { timeout: 10000 });
  }
}
