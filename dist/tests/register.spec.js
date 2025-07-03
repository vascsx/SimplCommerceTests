"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const faker_1 = require("@faker-js/faker");
const register_json_1 = __importDefault(require("../utils/register.json"));
const registerPage_1 = require("../pages/registerPage");
const { fullName: FULL_NAME, password: VALID_PASSWORD, registerUrl: REGISTER_URL } = register_json_1.default;
(0, test_1.test)('Should register successfully using Admin profile', async ({ page }) => {
    const registerPage = new registerPage_1.RegisterPage();
    const VALID_EMAIL = faker_1.faker.internet.email();
    await registerPage.register(page, REGISTER_URL, VALID_EMAIL, FULL_NAME, VALID_PASSWORD, VALID_PASSWORD);
    await page.waitForSelector('h1:has-text("Dashboard")', { state: 'visible' });
});
(0, test_1.test)('Should not register with already Email', async ({ page }) => {
    const registerPage = new registerPage_1.RegisterPage();
    const alreadyEmail = register_json_1.default.invalidEmail;
    await registerPage.register(page, REGISTER_URL, alreadyEmail, FULL_NAME, VALID_PASSWORD, VALID_PASSWORD);
    await (0, test_1.expect)(page.locator(`li:has-text("Username '${alreadyEmail}' is already taken.")`)).toBeVisible();
});
(0, test_1.test)('Should not register with empty email', async ({ page }) => {
    const registerPage = new registerPage_1.RegisterPage();
    await registerPage.register(page, REGISTER_URL, '', FULL_NAME, VALID_PASSWORD, VALID_PASSWORD);
    await (0, test_1.expect)(page.locator('#Email-error')).toHaveText('The Email field is required.');
});
(0, test_1.test)('Should not register with empty full name', async ({ page }) => {
    const registerPage = new registerPage_1.RegisterPage();
    const VALID_EMAIL = faker_1.faker.internet.email();
    await registerPage.register(page, REGISTER_URL, VALID_EMAIL, '', VALID_PASSWORD, VALID_PASSWORD);
    await (0, test_1.expect)(page.locator('#FullName-error')).toHaveText('The Name field is required.');
});
(0, test_1.test)('Should not register with empty password', async ({ page }) => {
    const registerPage = new registerPage_1.RegisterPage();
    const VALID_EMAIL = faker_1.faker.internet.email();
    await registerPage.register(page, REGISTER_URL, VALID_EMAIL, FULL_NAME, '', VALID_PASSWORD);
    await (0, test_1.expect)(page.locator('#ConfirmPassword-error')).toHaveText('The password and confirmation password do not match.');
    await page.click(registerPage.selectors.registerButton);
    await (0, test_1.expect)(page.locator('#Password-error')).toHaveText('The Password field is required.');
    await (0, test_1.expect)(page.locator('#ConfirmPassword-error')).toHaveText('The password and confirmation password do not match.');
    const errors = page.locator('.validation-summary-errors ul > li');
    await (0, test_1.expect)(errors.nth(0)).toHaveText('The Password field is required.');
    await (0, test_1.expect)(errors.nth(1)).toHaveText('The password and confirmation password do not match.');
});
(0, test_1.test)('Should not register with empty confirm password', async ({ page }) => {
    const registerPage = new registerPage_1.RegisterPage();
    const VALID_EMAIL = faker_1.faker.internet.email();
    await registerPage.register(page, REGISTER_URL, VALID_EMAIL, FULL_NAME, VALID_PASSWORD, '');
    await (0, test_1.expect)(page.locator('#ConfirmPassword-error')).toHaveText('The password and confirmation password do not match.');
});
