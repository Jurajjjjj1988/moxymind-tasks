import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly items: Locator;
  readonly checkout: Locator;

  constructor(page: Page) {
    this.page = page;
    this.items = page.getByTestId('inventory-item');
    this.checkout = page.getByTestId('checkout');
  }

  itemByName(name: string) {
    return this.items.filter({ hasText: name });
  }
}
