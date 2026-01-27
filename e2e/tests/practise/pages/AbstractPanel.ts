import { Page, Locator } from "@playwright/test";

export class AbstractPanel {
  private page: Page;
  private component?: Locator;

  constructor(component: string | undefined, page: Page) {
    if (component) {
      this.component = page.locator(component);
    }
    this.page = page;
  }

  async click(locator: string): Promise<void> {
    await this.page.locator(locator).click();
  }

  async getText(locator: string): Promise<string> {
    return (await this.page.locator(locator).textContent()) || "";
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  async fill(locator: string, text: string): Promise<void> {
    await this.page.locator(locator).fill(text);
  }

  async isVisible(locator: string): Promise<boolean> {
    return await this.page.locator(locator).isVisible();
  }

  async isEnabled(locator: string): Promise<boolean> {
    return await this.page.locator(locator).isEnabled();
  }

  async waitForElement(
    locator: string,
    timeout: number = 30000,
  ): Promise<void> {
    await this.page.locator(locator).waitFor({ timeout });
  }

  async getAttribute(
    locator: string,
    attribute: string,
  ): Promise<string | null> {
    return await this.page.locator(locator).getAttribute(attribute);
  }

  async selectOption(locator: string, value: string): Promise<void> {
    await this.page.locator(locator).selectOption(value);
  }

  async hover(locator: string): Promise<void> {
    await this.page.locator(locator).hover();
  }

  async doubleClick(locator: string): Promise<void> {
    await this.page.locator(locator).dblclick();
  }

  async getCount(locator: string): Promise<number> {
    return await this.page.locator(locator).count();
  }
}
