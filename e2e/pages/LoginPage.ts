import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Env } from "../frameworkConfig/env";

export class LoginPage extends BasePage {


  constructor(page: Page) {
    super(page);
  }

  private readonly usernameInput = this.page.getByRole("textbox", {
    name: "Username",
  });
  private readonly passwordInput = this.page.getByRole("textbox", {
    name: "Password",
  });
  private readonly loginButton = this.page.getByRole("button", {
    name: "Login",
  });
  private readonly loginError =
    this.page.getByText("Invalid credentials", { exact: true });

  async goToLoginScreen() {
    await this.goto(Env.URL);
    await this.page.waitForLoadState("domcontentloaded");
  }

  async login(username: string, password: string) {
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
    // await this.page.waitForURL(/dashboard/, { timeout: 10000 }).catch(() => { });
  }

  async expectInvalidCredentials() {
    await this.expectVisible(this.loginError);
  }
}
