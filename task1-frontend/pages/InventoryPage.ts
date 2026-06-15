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

  // saucedemo derives the data-test attribute from the visible name,
  // e.g. "Sauce Labs Backpack" -> "add-to-cart-sauce-labs-backpack".
  // A future product with punctuation or diacritics would need a real slugify here.
  addByName(name: string) {
    const slug = name.toLowerCase().replaceAll(' ', '-');
    return this.page.getByTestId(`add-to-cart-${slug}`).click();
  }

  goToCart() {
    return this.cartLink.click();
  }
}
