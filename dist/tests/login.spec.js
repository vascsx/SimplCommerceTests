"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const loginPage_1 = require("../pages/loginPage");
const login_json_1 = __importDefault(require("../utils/login.json"));
const { email: VALID_EMAIL, password: VALID_PASSWORD, loginUrl: LOGIN_URL } = login_json_1.default;
(0, test_1.test)('Should login successfully using Admin profile', async ({ page }) => {
    const loginPage = new loginPage_1.LoginPage();
    await loginPage.login(page, LOGIN_URL, VALID_EMAIL, VALID_PASSWORD);
    await page.waitForSelector('h1:has-text("Dashboard")', { state: 'visible' });
    await (0, test_1.expect)(page.locator('a[title="Manage"]')).toHaveText('Hello Shop Admin!');
});
(0, test_1.test)('Should not login with empty password (Admin profile)', async ({ page }) => {
    const loginPage = new loginPage_1.LoginPage();
    await loginPage.login(page, LOGIN_URL, VALID_EMAIL, '');
    await (0, test_1.expect)(page.locator('#Password-error')).toHaveText('The Password field is required.');
});
(0, test_1.test)('Should not login with empty email (Admin profile)', async ({ page }) => {
    const loginPage = new loginPage_1.LoginPage();
    await loginPage.login(page, LOGIN_URL, '', VALID_PASSWORD);
    await (0, test_1.expect)(page.locator('#Email-error')).toHaveText('The Email field is required.');
});
(0, test_1.test)('Should not login with valid email and invalid password (Admin profile)', async ({ page }) => {
    const loginPage = new loginPage_1.LoginPage();
    await loginPage.login(page, LOGIN_URL, VALID_EMAIL, 'wrongpass');
    await (0, test_1.expect)(page.locator('li:has-text("Invalid login attempt.")')).toBeVisible();
});
(0, test_1.test)('Should not login with valid password and invalid email (Admin profile)', async ({ page }) => {
    const loginPage = new loginPage_1.LoginPage();
    await loginPage.login(page, LOGIN_URL, 'invalid@email.com', VALID_PASSWORD);
    await (0, test_1.expect)(page.locator('li:has-text("Invalid login attempt.")')).toBeVisible();
});
const invalidEmails = ['a', 'a@', 'a@domain', '@domain.com', 'a@.com', 'a@domain.', 'a@domain..com'];
for (const email of invalidEmails) {
    (0, test_1.test)(`Should not login with invalid email format: "${email}"`, async ({ page }) => {
        const loginPage = new loginPage_1.LoginPage();
        await loginPage.login(page, LOGIN_URL, email, VALID_PASSWORD);
        await (0, test_1.expect)(page.locator('#Email-error')).toHaveText('The Email field is not a valid e-mail address.');
    });
}
