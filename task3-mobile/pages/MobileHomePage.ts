import { Page, Locator } from '@playwright/test';

export class MobileHomePage {
  readonly searchTrigger: Locator;
  readonly menuToggle: Locator;
  readonly menuDrawer: Locator;

  constructor(private readonly page: Page) {
    this.searchTrigger = page.locator('header').getByRole('button', { name: /search/i }).first();
    this.menuToggle = page.locator('#main-menu-input');
    this.menuDrawer = page.locator('.toggle-list__list, #mw-mf-page-left, nav.menu').first();
  }

  async open() {
    await this.page.goto('/');
  }

  async openMenu() {
    await this.menuToggle.click();
  }
}
