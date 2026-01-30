import { Page } from "@playwright/test";

export class BasePage {
    
    constructor(protected page: Page){
        // this.page = page;
    }

    async networkIdle(){
        await this.page.waitForLoadState('networkidle');
    }

    async waitForTimeout(time: number){
        await this.page.waitForTimeout(time);
    }
}

// export { expect, Page } from '@playwright/test';