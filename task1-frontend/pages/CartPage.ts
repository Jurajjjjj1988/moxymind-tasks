import { Page } from '@playwright/test';

export class CartPage {
  constructor(private readonly page: Page) {}

  items = () => this.page.getByTestId('inventory-item');
  itemByName = (name: string) => this.items().filter({ hasText: name });
  checkoutButton = () => this.page.getByTestId('checkout');
}
