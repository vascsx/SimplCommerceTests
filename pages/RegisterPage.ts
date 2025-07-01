import { expect } from '@playwright/test';
import registerData from '../utils/register.json';

class RegisterPage {
    private selectors = {
        email: '[id="Email"]',
        fullName: '[id="FullName"]',
        password: '[id="Password"]',
        confirmPassword: '[id="ConfirmPassword"]',
        registerButton: 'button.btn.btn-primary:has-text("Register")'
    };

    async fillEmail(page: any, email: string) {
        await page.locator(this.selectors.email).waitFor({ state: 'visible' });
        await page.fill(this.selectors.email, email);
    }

    async fillPassword(page: any, password: string) {
        await page.locator(this.selectors.password).waitFor({ state: 'visible' });
        await page.fill(this.selectors.password, password);
    }

    async fillFullName(page: any, fullName: string) {
        await page.locator(this.selectors.fullName).waitFor({ state: 'visible' });
        await page.fill(this.selectors.fullName, fullName);
    }

    async fillConfirmPassword(page: any, confirmPassword: string) {
        await page.locator(this.selectors.confirmPassword).waitFor({ state: 'visible' });
        await page.fill(this.selectors.confirmPassword, confirmPassword);
    }

    async register(page: any, registerUrl: string, email: string, fullName: string, password: string, confirmPassword: string) {
        await page.goto(registerUrl);
        await this.fillEmail(page, email);
        await this.fillFullName(page, fullName);
        await this.fillPassword(page, password);
        await this.fillConfirmPassword(page, confirmPassword);
        await page.click(this.selectors.registerButton);
    }
}

export { RegisterPage };