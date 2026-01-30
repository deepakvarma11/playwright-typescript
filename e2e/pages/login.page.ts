import { Page } from '@playwright/test';
import { BasePage, } from './base.page';
import { HomePage } from './home.page';

export class LoginPage extends BasePage {

    private readonly usernameInput = this.page.getByRole("textbox", { name: "Username" });
    private readonly passwordInput = this.page.getByRole("textbox", { name: "Password" });
    private readonly loginButton = this.page.getByRole("button", { name: "Login" });

    async login(username: string, password: string): Promise<HomePage> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        await this.waitForTimeout(6000);
        return new HomePage(this.page);
    }

}