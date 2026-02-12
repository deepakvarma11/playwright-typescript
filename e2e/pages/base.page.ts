import { Page } from "@playwright/test";

export class BasePage {
  constructor(protected page: Page) {
    // this.page = page;
  }

  async gotoUrl(url: string) {
    await this.page.goto(url);
  }

  async waitForTimeout(time: number) {
    await this.page.waitForTimeout(time);
  }

  async getReplaceLocator(selector: string, replaceValue: string) {
    return this.page.locator(selector.replace("$REPLACE", replaceValue));
  }
}

// export { expect, Page } from '@playwright/test';
