import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}

  username = () => this.page.getByTestId('username');
  password = () => this.page.getByTestId('password');
  loginButton = () => this.page.getByTestId('login-button');
  error = () => this.page.getByTestId('error');

  async open() {
    await this.page.goto('/');
  }

  async login(user: string, pass: string) {
    await this.username().fill(user);
    await this.password().fill(pass);
    await this.loginButton().click();
  }
}
