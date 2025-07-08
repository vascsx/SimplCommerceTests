import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import loginData from '../utils/login.json';

const { email: VALID_EMAIL, password: VALID_PASSWORD, loginUrl: LOGIN_URL } = loginData;

test('Should login successfully using Admin profile', async ({ page }) => {
  const loginPage = new LoginPage();
  await loginPage.login(page, LOGIN_URL, VALID_EMAIL, VALID_PASSWORD);
  await page.waitForSelector('h1:has-text("Dashboard")', { state: 'visible' });
  await expect(page.locator('a[title="Manage"]')).toHaveText('Hello Shop Admin!');
});

test('Should not login with empty password (Admin profile)', async ({ page }) => {
  const loginPage = new LoginPage();
  await loginPage.login(page, LOGIN_URL, VALID_EMAIL, '');
  const passwordError = await loginPage.getPasswordError(page);
  await expect(passwordError).toHaveText('The Password field is required.');
});

test('Should not login with empty email (Admin profile)', async ({ page }) => {
  const loginPage = new LoginPage();
  await loginPage.login(page, LOGIN_URL, '', VALID_PASSWORD);
  const emailError = await loginPage.getEmailError(page);
  await expect(emailError).toHaveText('The Email field is required.');
});

test('Should not login with valid email and invalid password (Admin profile)', async ({ page }) => {
  const loginPage = new LoginPage();
  await loginPage.login(page, LOGIN_URL, VALID_EMAIL, 'wrongpass');
  const invalidError = await loginPage.getInvalidLoginError(page);
  await expect(invalidError).toBeVisible();
});

test('Should not login with valid password and invalid email (Admin profile)', async ({ page }) => {
  const loginPage = new LoginPage();
  await loginPage.login(page, LOGIN_URL, 'invalid@email.com', VALID_PASSWORD);
  const invalidError = await loginPage.getInvalidLoginError(page);
  await expect(invalidError).toBeVisible();
});

const invalidEmails = ['a', 'a@', 'a@domain', '@domain.com', 'a@.com', 'a@domain.', 'a@domain..com'];
for (const email of invalidEmails) {
  test(`Should not login with invalid email format: "${email}"`, async ({ page }) => {
    const loginPage = new LoginPage();
    await loginPage.login(page, LOGIN_URL, email, VALID_PASSWORD);
    const emailError = await loginPage.getEmailError(page);
    await expect(emailError).toHaveText('The Email field is not a valid e-mail address.');
  });
}
