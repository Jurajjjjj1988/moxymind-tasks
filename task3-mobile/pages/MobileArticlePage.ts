import { Page, Locator } from '@playwright/test';

export class MobileArticlePage {
  readonly firstHeading: Locator;

  constructor(private readonly page: Page) {
    this.firstHeading = page.locator('#firstHeading');
  }

  async openByPath(path: string) {
    await this.page.goto(path);
  }
}
