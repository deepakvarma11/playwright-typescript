import { expect, Locator, Page } from "@playwright/test";

export class BasePage {
  constructor(protected page: Page) {}

  async click(locator: Locator) {
    // await locator.waitFor({ state: "visible" });
    await locator.click();
  }

  async fill(locator: Locator, value: string) {
    // await locator.waitFor({ state: "visible" });
    await locator.fill(value);
  }

  async type(locator: Locator, value: string) {
    // await locator.waitFor({ state: "visible" });
    await locator.pressSequentially(value);
  }

  async getText(locator: Locator): Promise<string> {
    // await locator.waitFor({ state: "visible" });
    return (await locator.innerText()) ?? "";
  }

  async isVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }

  async isVisibleWithTimeout(
    locator: Locator,
    timeout: number,
  ): Promise<boolean> {
    return await locator.isVisible({ timeout: timeout });
  }

  async waitForVisible(locator: Locator) {
    await locator.waitFor({ state: "visible", timeout: 10000 });
  }

  async waitForHidden(locator: Locator) {
    await locator.waitFor({ state: "hidden" });
  }

  async expectVisible(locator: Locator) {
    await expect(locator).toBeVisible();
  }

  async expectHidden(locator: Locator) {
    await expect(locator).toBeHidden();
  }

  async expectText(locator: Locator, value: string) {
    await expect(locator).toHaveText(value);
  }

  async waitForURL(url: RegExp) {
    await this.page.waitForURL(url, { timeout: 10000 });
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async getReplaceLocator(
    selector: string,
    replaceValue: string,
  ): Promise<Locator> {
    return this.page.locator(selector.replace("$REPLACE", replaceValue));
  }
}
