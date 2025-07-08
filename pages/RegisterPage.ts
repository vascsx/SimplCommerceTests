import { expect, Page } from '@playwright/test';
import registerData from '../utils/register.json';

class RegisterPage {
    public selectors = {
        email: '[id="Email"]',
        fullName: '[id="FullName"]',
        password: '[id="Password"]',
        confirmPassword: '[id="ConfirmPassword"]',
        registerButton: 'button.btn.btn-primary:has-text("Register")'
    };

    async fillEmail(page: Page, email: string): Promise<this> {
        await page.locator(this.selectors.email).waitFor({ state: 'visible' });
        await page.fill(this.selectors.email, email);
        return this;
    }

    async fillPassword(page: Page, password: string): Promise<this> {
        await page.locator(this.selectors.password).waitFor({ state: 'visible' });
        await page.fill(this.selectors.password, password);
        return this;
    }

    async fillFullName(page: Page, fullName: string): Promise<this> {
        await page.locator(this.selectors.fullName).waitFor({ state: 'visible' });
        await page.fill(this.selectors.fullName, fullName);
        return this;
    }

    async fillConfirmPassword(page: Page, confirmPassword: string): Promise<this> {
        await page.locator(this.selectors.confirmPassword).waitFor({ state: 'visible' });
        await page.fill(this.selectors.confirmPassword, confirmPassword);
        return this;
    }

    async gotoRegister(page: Page, url: string): Promise<this> {
        await page.goto(url);
        return this;
    }

    async register(page: Page, registerUrl: string, email: string, fullName: string, password: string, confirmPassword: string): Promise<void> {
        await this.gotoRegister(page, registerUrl);
        await this.fillEmail(page, email);
        await this.fillFullName(page, fullName);
        await this.fillPassword(page, password);
        await this.fillConfirmPassword(page, confirmPassword);
        await page.click(this.selectors.registerButton);
    }
}

export { RegisterPage };