"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const loginPage_1 = require("../pages/loginPage");
const login_json_1 = __importDefault(require("../utils/login.json"));
const { email: VALID_EMAIL, password: VALID_PASSWORD, loginUrl: LOGIN_URL } = login_json_1.default;
let loginPage;
test_1.test.beforeEach(async ({ page }) => {
    loginPage = new loginPage_1.LoginPage();
    await loginPage.login(page, LOGIN_URL, VALID_EMAIL, VALID_PASSWORD);
    await page.waitForSelector('h1:has-text("Dashboard")', { state: 'visible' });
});
(0, test_1.test)('Should show errors when creating category with empty fields', async ({ page }) => {
    await page.click('text=Catalog');
    await page.click('[ui-sref="category"]');
    await (0, test_1.expect)(page).toHaveURL(/.*\/admin#!\/category/);
    await page.click('[ui-sref="category-create"]');
    await page.click('button:has-text("Save")');
    const errorBox = page.locator('div.bg-danger[ng-show="vm.validationErrors"]');
    await (0, test_1.expect)(errorBox).toBeVisible();
    const nameError = errorBox.locator('li:has-text("The Name field is required.")');
    const slugError = errorBox.locator('li:has-text("The Slug field is required.")');
    await (0, test_1.expect)(nameError).toBeVisible();
    await (0, test_1.expect)(slugError).toBeVisible();
});
(0, test_1.test)('Should show error for name when only slug is filled', async ({ page }) => {
    await page.click('text=Catalog');
    await page.click('[ui-sref="category"]');
    await (0, test_1.expect)(page).toHaveURL(/.*\/admin#!\/category/);
    await page.click('[ui-sref="category-create"]');
    await page.fill('input[name="slug"]', 'category-slug');
    await page.click('button:has-text("Save")');
    const errorBox = page.locator('div.bg-danger[ng-show="vm.validationErrors"]');
    await (0, test_1.expect)(errorBox).toBeVisible();
    const nameError = errorBox.locator('li:has-text("The Name field is required.")');
    await (0, test_1.expect)(nameError).toBeVisible();
});
(0, test_1.test)('Should create category when all fields are correct', async ({ page }) => {
    await page.click('text=Catalog');
    await page.click('[ui-sref="category"]');
    await (0, test_1.expect)(page).toHaveURL(/.*\/admin#!\/category/);
    await page.click('[ui-sref="category-create"]');
    await page.fill('input[name="name"]', 'TesteQA');
    await page.fill('input[name="slug"]', 'category-slug');
    await page.click('button:has-text("Save")');
});
(0, test_1.test)('Should show error for slug when only name is filled', async ({ page }) => {
    await page.click('text=Catalog');
    await page.click('[ui-sref="category"]');
    await (0, test_1.expect)(page).toHaveURL(/.*\/admin#!\/category/);
});
