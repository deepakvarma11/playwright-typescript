import { Page } from '@playwright/test';
import { BasePage, } from './base.page';
import { HomePage } from './home.page';
import { Env } from '../frameworkConfig/env';

export class LoginPage extends BasePage {

    private readonly usernameInput = this.page.getByRole("textbox", { name: "Username" });
    private readonly passwordInput = this.page.getByRole("textbox", { name: "Password" });
    private readonly loginButton = this.page.getByRole("button", { name: "Login" });
    private readonly loginError = this.page.getByText("Invalid credentials");

    async goToLoginScreen(){
        await this.gotoUrl(Env.URL);
        await this.waitForTimeout(6000);
    }

    async login(username: string, password: string){
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        // await this.waitForTimeout(6000);
        await this.page.waitForURL(/dashboard/, { timeout: 10000 }).catch(() => {});
    }

    async isLoginErrorVisible(): Promise<boolean> {
        return await this.loginError.isVisible({ timeout: 5000 });
    }

}