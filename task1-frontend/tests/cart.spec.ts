import { expect } from '@playwright/test';
import { test, USERS } from '../fixtures/pages';

// Cart is the core e-commerce primitive. No cart = no orders = no revenue.
test.describe('Cart', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.loginAs(USERS.standard.name, USERS.standard.pass);
  });

  test('adding two items updates badge and shows them in cart', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addByName('Sauce Labs Backpack');
    await inventoryPage.addByName('Sauce Labs Bike Light');

    await expect(inventoryPage.cartBadge).toHaveText('2');

    await inventoryPage.goToCart();
    await expect(cartPage.items).toHaveCount(2);
    await expect(cartPage.itemByName('Sauce Labs Backpack')).toBeVisible();
    await expect(cartPage.itemByName('Sauce Labs Bike Light')).toBeVisible();
  });
});
