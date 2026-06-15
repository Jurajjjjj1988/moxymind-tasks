import { Page, Locator } from '@playwright/test';

export class MobileHomePage {
  readonly page: Page;
  readonly searchTrigger: Locator;
  readonly searchInput: Locator;
  // The hamburger is a <label> for a checkbox input that sits on top and
  // intercepts pointer events. Click the checkbox directly to flip menu state.
  readonly menuToggle: Locator;
  readonly menuDrawer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchTrigger = page.locator('header').getByRole('button', { name: /search/i }).first();
    this.searchInput = page.getByRole('searchbox').first();
    this.menuToggle = page.locator('#main-menu-input');
    this.menuDrawer = page.locator('.toggle-list__list, #mw-mf-page-left, nav.menu').first();
  }

  async open() {
    await this.page.goto('/');
  }

  async searchFor(term: string) {
    await this.searchTrigger.click();
    await this.searchInput.fill(term);
    await this.searchInput.press('Enter');
  }

  async openMenu() {
    await this.menuToggle.click();
  }
}
