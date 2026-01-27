import { Page } from "@playwright/test";
import { AbstractPanel } from "./AbstractPanel";

export class BasePage extends AbstractPanel {
  protected page: Page;

  public constructor(page: Page) {
    super(page);
    this.page = page;
  }
  public getPage(): Page {
    return this.page;
  }
}
