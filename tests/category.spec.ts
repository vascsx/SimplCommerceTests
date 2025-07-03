import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import loginData from '../utils/login.json';

const { email: VALID_EMAIL, password: VALID_PASSWORD, loginUrl: LOGIN_URL } = loginData;

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage();
    await loginPage.login(page, LOGIN_URL, VALID_EMAIL, VALID_PASSWORD);
    await page.waitForSelector('h1:has-text("Dashboard")', { state: 'visible' });
});

test('Should show errors when creating category with empty fields', async ({ page }) => {
    await page.click('text=Catalog');
    await page.click('[ui-sref="category"]');
    await expect(page).toHaveURL(/.*\/admin#!\/category/);
    await page.click('[ui-sref="category-create"]');
    await page.click('button:has-text("Save")');

    const errorBox = page.locator('div.bg-danger[ng-show="vm.validationErrors"]');
    await expect(errorBox).toBeVisible();

    const nameError = errorBox.locator('li:has-text("The Name field is required.")');
    const slugError = errorBox.locator('li:has-text("The Slug field is required.")');
    await expect(nameError).toBeVisible();
    await expect(slugError).toBeVisible();
});

test('Should show error for name when only slug is filled', async ({ page }) => {
    await page.click('text=Catalog');
    await page.click('[ui-sref="category"]');
    await expect(page).toHaveURL(/.*\/admin#!\/category/);
    await page.click('[ui-sref="category-create"]');
    await page.fill('input[name="slug"]', 'category-slug');
    await page.click('button:has-text("Save")');

    const errorBox = page.locator('div.bg-danger[ng-show="vm.validationErrors"]');
    await expect(errorBox).toBeVisible();

    const nameError = errorBox.locator('li:has-text("The Name field is required.")');
    await expect(nameError).toBeVisible();
});

test('Should create category when all fields are correct', async ({ page }) => {
    await page.click('text=Catalog');
    await page.click('[ui-sref="category"]');
    await expect(page).toHaveURL(/.*\/admin#!\/category/);
    await page.click('[ui-sref="category-create"]');
    await page.fill('input[name="name"]', 'TesteQA');
    await page.fill('input[name="slug"]', 'category-slug');
    await page.click('button:has-text("Save")');
});

test('Should show error for slug when only name is filled', async ({ page }) => {
    await page.click('text=Catalog');
    await page.click('[ui-sref="category"]');
    await expect(page).toHaveURL(/.*\/admin#!\/category/);
});

