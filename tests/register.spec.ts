import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker'
import registerData from '../utils/register.json';
import { RegisterPage } from '../pages/registerPage';

const { fullName: FULL_NAME, password: VALID_PASSWORD, registerUrl: REGISTER_URL } = registerData;

test('Should register successfully using Admin profile', async ({ page }) => {
  const registerPage = new RegisterPage();
  const VALID_EMAIL = faker.internet.email();
  await registerPage.register(page, REGISTER_URL, VALID_EMAIL, FULL_NAME, VALID_PASSWORD, VALID_PASSWORD);
  await page.waitForSelector('h1:has-text("Dashboard")', { state: 'visible' });
});

test('Should not register with already Email', async ({ page }) => {
  const registerPage = new RegisterPage();
  const alreadyEmail = registerData.invalidEmail;
  await registerPage.register(page, REGISTER_URL, alreadyEmail, FULL_NAME, VALID_PASSWORD, VALID_PASSWORD);
  await expect(page.locator(`li:has-text("Username '${alreadyEmail}' is already taken.")`)).toBeVisible();
});

test('Should not register with empty email', async ({ page }) => {
  const registerPage = new RegisterPage();
  await registerPage.register(page, REGISTER_URL, '', FULL_NAME, VALID_PASSWORD, VALID_PASSWORD);
  await expect(page.locator('#Email-error')).toHaveText('The Email field is required.');
});

test('Should not register with empty full name', async ({ page }) => {
  const registerPage = new RegisterPage();
  const VALID_EMAIL = faker.internet.email();
  await registerPage.register(page, REGISTER_URL, VALID_EMAIL, '', VALID_PASSWORD, VALID_PASSWORD);
  await expect(page.locator('#FullName-error')).toHaveText('The Name field is required.');
});

test('Should not register with empty password', async ({ page }) => {
  const registerPage = new RegisterPage();
  const VALID_EMAIL = faker.internet.email();
  
  await registerPage.register(page, REGISTER_URL, VALID_EMAIL, FULL_NAME, '', VALID_PASSWORD);
  await expect(page.locator('#ConfirmPassword-error')).toHaveText('The password and confirmation password do not match.');
  await page.click(registerPage.selectors.registerButton);

  await expect(page.locator('#Password-error')).toHaveText('The Password field is required.');
  await expect(page.locator('#ConfirmPassword-error')).toHaveText('The password and confirmation password do not match.');

  const errors = page.locator('.validation-summary-errors ul > li');

  await expect(errors.nth(0)).toHaveText('The Password field is required.');
  await expect(errors.nth(1)).toHaveText('The password and confirmation password do not match.');

});

test('Should not register with empty confirm password', async ({ page }) => {
  const registerPage = new RegisterPage();
  const VALID_EMAIL = faker.internet.email();
  await registerPage.register(page, REGISTER_URL, VALID_EMAIL, FULL_NAME, VALID_PASSWORD, '');
  await expect(page.locator('#ConfirmPassword-error')).toHaveText('The password and confirmation password do not match.');
});
