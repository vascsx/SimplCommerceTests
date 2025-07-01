import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import loginData from '../utils/login.json';

const EMAIL = loginData.email;
const PASSWORD = loginData.password;
const LOGIN_URL = loginData.loginUrl;

test('Deve fazer login com sucesso usando perfil Admin', async ({ page }) => {
    const loginPage = new LoginPage();
    await loginPage.loginWithAdminCredentials(page, LOGIN_URL, EMAIL, PASSWORD);
});
