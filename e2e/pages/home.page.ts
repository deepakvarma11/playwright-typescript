import { BasePage } from "./base.page";


export class HomePage extends BasePage {

    private readonly pim = this.page.getByRole("link", { name: "PIM" });

    async navigateToPIM() {
        await this.pim.click();
        await this.page.waitForURL(/pim/, { timeout: 10000 }).catch(() => {});
    }
    

}