import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

test('add 2 items to cart', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);

  await test.step('Log in as standard_user', async () => {
    await login.open();
    await login.login('standard_user', 'secret_sauce');
    await expect(inventory.items().first()).toBeVisible();
  });

  await test.step('Add Backpack to cart', async () => {
    await inventory.addItem('Sauce Labs Backpack');
  });

  await test.step('Add Bike Light to cart', async () => {
    await inventory.addItem('Sauce Labs Bike Light');
  });

  await test.step('Cart badge shows 2', async () => {
    await expect(inventory.cartBadge()).toHaveText('2');
  });

  await test.step('Open the cart', async () => {
    await inventory.openCart();
  });

  await test.step('Both items are in the cart', async () => {
    await expect(cart.itemByName('Sauce Labs Backpack')).toBeVisible();
    await expect(cart.itemByName('Sauce Labs Bike Light')).toBeVisible();
  });

  await test.step('Each item shows its correct price', async () => {
    await expect(cart.itemByName('Sauce Labs Backpack')).toContainText('$29.99');
    await expect(cart.itemByName('Sauce Labs Bike Light')).toContainText('$9.99');
  });
});
