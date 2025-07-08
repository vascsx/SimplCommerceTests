import { Page } from '@playwright/test';

class RegisterPage {
  public selectors = {
    email: '#Email',
    fullName: '#FullName',
    password: '#Password',
    confirmPassword: '#ConfirmPassword',
    registerButton: 'button.btn.btn-primary:has-text("Register")',
    emailError: '#Email-error',
    fullNameError: '#FullName-error',
    passwordError: '#Password-error',
    confirmPasswordError: '#ConfirmPassword-error',
    summaryErrors: '.validation-summary-errors ul > li'
  };

  async gotoRegister(page: Page, url: string): Promise<this> {
    await page.goto(url);
    return this;
  }

  async fillEmail(page: Page, email: string): Promise<this> {
    await page.locator(this.selectors.email).waitFor({ state: 'visible' });
    await page.fill(this.selectors.email, email);
    return this;
  }

  async fillFullName(page: Page, fullName: string): Promise<this> {
    await page.fill(this.selectors.fullName, fullName);
    return this;
  }

  async fillPassword(page: Page, password: string): Promise<this> {
    await page.fill(this.selectors.password, password);
    return this;
  }

  async fillConfirmPassword(page: Page, confirmPassword: string): Promise<this> {
    await page.fill(this.selectors.confirmPassword, confirmPassword);
    return this;
  }

  async register(
    page: Page,
    registerUrl: string,
    email: string,
    fullName: string,
    password: string,
    confirmPassword: string
  ): Promise<void> {
    await this.gotoRegister(page, registerUrl);
    await this.fillEmail(page, email);
    await this.fillFullName(page, fullName);
    await this.fillPassword(page, password);
    await this.fillConfirmPassword(page, confirmPassword);
    await page.click(this.selectors.registerButton);
  }

  getEmailError(page: Page) {
    return page.locator(this.selectors.emailError);
  }

  getFullNameError(page: Page) {
    return page.locator(this.selectors.fullNameError);
  }

  getPasswordError(page: Page) {
    return page.locator(this.selectors.passwordError);
  }

  getConfirmPasswordError(page: Page) {
    return page.locator(this.selectors.confirmPasswordError);
  }

  getSummaryErrors(page: Page) {
    return page.locator(this.selectors.summaryErrors);
  }
}

export { RegisterPage };
