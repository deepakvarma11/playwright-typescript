import { BasePage } from '../base.page';

export class LoginPage extends BasePage {
    private readonly usernameInput = this.page.getByPlaceholder('Username');
    private readonly passwordInput = this.page.getByRole("textbox", { name: "Password" });
    private readonly loginButton = this.page.getByRole("button", { name: "Login" });
    private readonly errorMessage = this.page.locator('[data-test="error"]');

    async navigateToLoginPage(): Promise<void> {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async performLogin(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async getErrorText(): Promise<string> {
        return await this.errorMessage.textContent() ?? '';
    }

    async isLoginFormVisible(): Promise<boolean> {
        return await this.loginButton.isVisible();

    }

}