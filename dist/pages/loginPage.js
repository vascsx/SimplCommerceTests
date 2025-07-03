"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginPage = void 0;
class LoginPage {
    selectors = {
        email: '[id="Email"]',
        password: '[id="Password"]',
        loginButton: 'button.btn.btn-primary:has-text("Log in")'
    };
    async fillEmail(page, email) {
        await page.locator(this.selectors.email).waitFor({ state: 'visible' });
        await page.fill(this.selectors.email, email);
    }
    async fillPassword(page, password) {
        await page.locator(this.selectors.password).waitFor({ state: 'visible' });
        await page.fill(this.selectors.password, password);
    }
    async login(page, loginUrl, email, password) {
        await page.goto(loginUrl);
        await this.fillEmail(page, email);
        await this.fillPassword(page, password);
        await page.click(this.selectors.loginButton);
    }
}
exports.LoginPage = LoginPage;
