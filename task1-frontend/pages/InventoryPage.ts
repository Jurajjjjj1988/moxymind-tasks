import { Page } from '@playwright/test';

export class InventoryPage {
  constructor(private readonly page: Page) {}

  items = () => this.page.getByTestId('inventory-item');
  cartBadge = () => this.page.getByTestId('shopping-cart-badge');
  cartLink = () => this.page.getByTestId('shopping-cart-link');

  async addItem(name: string) {
    const slug = name.toLowerCase().replaceAll(' ', '-');
    await this.page.getByTestId(`add-to-cart-${slug}`).click();
  }

  async openCart() {
    await this.cartLink().click();
  }
}
