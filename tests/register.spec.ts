import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker'
import registerData from '../utils/register.json';
import { RegisterPage } from '../pages/RegisterPage';

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
