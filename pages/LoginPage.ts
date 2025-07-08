import { Page, expect } from '@playwright/test';

class LoginPage {
  private selectors = {
    emailInput: '#Email',
    passwordInput: '#Password',
    loginButton: 'button.btn.btn-primary:has-text("Log in")',
    emailError: '#Email-error',
    passwordError: '#Password-error',
    invalidLoginError: 'li:has-text("Invalid login attempt.")'
  };

  async login(page: Page, loginUrl: string, email: string, password: string) {
    await page.goto(loginUrl);
    await page.locator(this.selectors.emailInput).waitFor({ state: 'visible' });
    await page.fill(this.selectors.emailInput, email);
    await page.fill(this.selectors.passwordInput, password);
    await page.click(this.selectors.loginButton);
  }

  async getEmailError(page: Page) {
    return page.locator(this.selectors.emailError);
  }

  async getPasswordError(page: Page) {
    return page.locator(this.selectors.passwordError);
  }

  async getInvalidLoginError(page: Page) {
    return page.locator(this.selectors.invalidLoginError);
  }
}

export { LoginPage };