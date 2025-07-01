import { expect } from '@playwright/test';
import loginData from '../utils/login.json';

class LoginPage {
    private selectors = {
        email: '[id="Email"]',
        password: '[id="Password"]',
        loginButton: 'button[type="submit"], [role="button"][name="Log in"]',
    };

    async fillEmail(page: any, email: string) {
        await page.locator(this.selectors.email).waitFor({ state: 'visible' });
        await page.fill(this.selectors.email, email);
    }

    async fillPassword(page: any, password: string) {
        await page.locator(this.selectors.password).waitFor({ state: 'visible' });
        await page.fill(this.selectors.password, password);
    }

    async loginWithAdminCredentials(page: any, loginUrl: string, email: string, password: string) {
        await page.goto(loginUrl);
        await this.fillEmail(page, email);
        await this.fillPassword(page, password);
        await page.click(this.selectors.loginButton);
        await page.waitForSelector('h1:has-text("Dashboard")', { state: 'visible' });
    }
}

export { LoginPage };