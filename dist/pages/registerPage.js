"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterPage = void 0;
class RegisterPage {
    selectors = {
        email: '[id="Email"]',
        fullName: '[id="FullName"]',
        password: '[id="Password"]',
        confirmPassword: '[id="ConfirmPassword"]',
        registerButton: 'button.btn.btn-primary:has-text("Register")'
    };
    async fillEmail(page, email) {
        await page.locator(this.selectors.email).waitFor({ state: 'visible' });
        await page.fill(this.selectors.email, email);
    }
    async fillPassword(page, password) {
        await page.locator(this.selectors.password).waitFor({ state: 'visible' });
        await page.fill(this.selectors.password, password);
    }
    async fillFullName(page, fullName) {
        await page.locator(this.selectors.fullName).waitFor({ state: 'visible' });
        await page.fill(this.selectors.fullName, fullName);
    }
    async fillConfirmPassword(page, confirmPassword) {
        await page.locator(this.selectors.confirmPassword).waitFor({ state: 'visible' });
        await page.fill(this.selectors.confirmPassword, confirmPassword);
    }
    async register(page, registerUrl, email, fullName, password, confirmPassword) {
        await page.goto(registerUrl);
        await this.fillEmail(page, email);
        await this.fillFullName(page, fullName);
        await this.fillPassword(page, password);
        await this.fillConfirmPassword(page, confirmPassword);
        await page.click(this.selectors.registerButton);
    }
}
exports.RegisterPage = RegisterPage;
