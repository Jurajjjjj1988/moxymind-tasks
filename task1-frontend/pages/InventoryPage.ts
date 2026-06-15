import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly items: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.items = page.getByTestId('inventory-item');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.cartLink = page.getByTestId('shopping-cart-link');
  }

  addByName(productName: string) {
    const slug = productName.toLowerCase().replace(/\s+/g, '-');
    return this.page.getByTestId(`add-to-cart-${slug}`).click();
  }

  goToCart() {
    return this.cartLink.click();
  }
}
