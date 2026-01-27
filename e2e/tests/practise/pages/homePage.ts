import { Page } from "@playwright/test";

export class HomePage {
  private page: Page;

  private static readonly HEADER_BAR = "header .row";

  public constructor(page: Page) {
    this.page = page;
  }
}
