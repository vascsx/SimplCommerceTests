import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import loginData from '../utils/login.json';

const { email: VALID_EMAIL, password: VALID_PASSWORD, loginUrl: LOGIN_URL } = loginData;

test('Should not create category when all fields are empty and must display errors for name and slug', async ({ page }) => {
    const loginPage = new LoginPage();
    await loginPage.login(page, LOGIN_URL, VALID_EMAIL, VALID_PASSWORD);
    await page.waitForSelector('h1:has-text("Dashboard")', { state: 'visible' });
    await page.click('text=Catalog');
    await page.click('[ui-sref="category"]');
    await expect(page).toHaveURL('https://demo.simplcommerce.com/admin#!/category');
    await page.click('[ui-sref="category-create"]');
    await page.click('button:has-text("Save")');

    const errorBox = page.locator('div.bg-danger[ng-show="vm.validationErrors"]');
    await expect(errorBox).toBeVisible();

    const nameError = errorBox.locator('li:has-text("The Name field is required.")');
    const slugError = errorBox.locator('li:has-text("The Slug field is required.")');
    await expect(nameError).toBeVisible();
    await expect(slugError).toBeVisible();
});

test('Should not create category when only slug is filled and must display error for name', async ({ page }) => {
    const loginPage = new LoginPage();
    await loginPage.login(page, LOGIN_URL, VALID_EMAIL, VALID_PASSWORD);
    await page.waitForSelector('h1:has-text("Dashboard")', { state: 'visible' });
    await page.click('text=Catalog');
    await page.click('[ui-sref="category"]');
    await expect(page).toHaveURL('https://demo.simplcommerce.com/admin#!/category');
    await page.click('[ui-sref="category-create"]');
    await page.fill('input[name="slug"]', 'category-slug');
    await page.click('button:has-text("Save")');

    const errorBox = page.locator('div.bg-danger[ng-show="vm.validationErrors"]');
    await expect(errorBox).toBeVisible();

    const nameError = errorBox.locator('li:has-text("The Name field is required.")');
    await expect(nameError).toBeVisible();
});

test.only('Should not create category when only slug is filled and must display error for name', async ({ page }) => {
    const loginPage = new LoginPage();
    await loginPage.login(page, LOGIN_URL, VALID_EMAIL, VALID_PASSWORD);
    await page.waitForSelector('h1:has-text("Dashboard")', { state: 'visible' });
    await page.click('text=Catalog');
    await page.click('[ui-sref="category"]');
    await expect(page).toHaveURL('https://demo.simplcommerce.com/admin#!/category');
    await page.click('[ui-sref="category-create"]');
    await page.fill('input[name="name"]', 'TesteQA');
    await page.fill('input[name="slug"]', 'category-slug');
    await page.click('button:has-text("Save")');
});

// test.only('Should not create category when only name is filled and must display error for slug', async ({ page }) => {
//     const loginPage = new LoginPage();
//     await loginPage.login(page, LOGIN_URL, VALID_EMAIL, VALID_PASSWORD);
//     await page.waitForSelector('h1:has-text("Dashboard")', { state: 'visible' });
//     await page.click('text=Catalog');
//     await page.click('[ui-sref="category"]');
//     await expect(page).toHaveURL('https://demo.simplcommerce.com/admin#!/category');
//     await page.click('[ui-sref="category-create"]');
//     await page.fill('input[name="name"]', 'Category Name');
//     await page.click('button:has-text("Save")');

//     const errorBox = page.locator('div.bg-danger[ng-show="vm.validationErrors"]');
//     await expect(errorBox).toBeVisible();

//     const slugError = errorBox.locator('li:has-text("The Slug field is required.")');
//     await expect(slugError).toBeVisible();
// });
