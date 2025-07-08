import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import registerData from '../utils/register.json';
import { RegisterPage } from '../pages/RegisterPage';

const { fullName: FULL_NAME, password: VALID_PASSWORD, registerUrl: REGISTER_URL } = registerData;

test('Should register successfully using Admin profile', async ({ page }) => {
  const registerPage = new RegisterPage();
  const VALID_EMAIL = faker.internet.email();

  await registerPage.register(page, REGISTER_URL, VALID_EMAIL, FULL_NAME, VALID_PASSWORD, VALID_PASSWORD);

  await expect(page.locator('a[title="Manage"]')).toHaveText('Hello Shop Admin!');
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

  await expect(registerPage.getEmailError(page)).toHaveText('The Email field is required.');
});

test('Should not register with empty full name', async ({ page }) => {
  const registerPage = new RegisterPage();
  const VALID_EMAIL = faker.internet.email();

  await registerPage.register(page, REGISTER_URL, VALID_EMAIL, '', VALID_PASSWORD, VALID_PASSWORD);

  await expect(registerPage.getFullNameError(page)).toHaveText('The Name field is required.');
});

test('Should not register with empty password', async ({ page }) => {
  const registerPage = new RegisterPage();
  const VALID_EMAIL = faker.internet.email();

  await registerPage.register(page, REGISTER_URL, VALID_EMAIL, FULL_NAME, '', VALID_PASSWORD);

  await page.waitForSelector(registerPage.selectors.confirmPasswordError, { state: 'visible' });

  await expect(registerPage.getConfirmPasswordError(page)).toHaveText('The password and confirmation password do not match.');

  await page.click(registerPage.selectors.registerButton);
  await page.waitForSelector(registerPage.selectors.passwordError, { state: 'visible' });

  const errors = registerPage.getSummaryErrors(page);
  await expect(errors.nth(0)).toHaveText('The Password field is required.');
  await expect(errors.nth(1)).toHaveText('The password and confirmation password do not match.');
});


test('Should not register with empty confirm password', async ({ page }) => {
  const registerPage = new RegisterPage();
  const VALID_EMAIL = faker.internet.email();

  await registerPage.register(page, REGISTER_URL, VALID_EMAIL, FULL_NAME, VALID_PASSWORD, '');

  await expect(registerPage.getConfirmPasswordError(page)).toHaveText('The password and confirmation password do not match.');
});
