import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test('complete a checkout', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  await test.step('Log in as standard_user', async () => {
    await login.open();
    await login.login('standard_user', 'secret_sauce');
    await expect(inventory.items().first()).toBeVisible();
  });

  await test.step('Add Backpack to cart', async () => {
    await inventory.addItem('Sauce Labs Backpack');
  });

  await test.step('Open the cart', async () => {
    await inventory.openCart();
  });

  await test.step('Start checkout', async () => {
    await expect(cart.checkoutButton()).toBeEnabled();
    await cart.checkoutButton().click();
  });

  await test.step('Shipping form is shown', async () => {
    await expect(checkout.firstName()).toBeVisible();
    await expect(checkout.lastName()).toBeVisible();
    await expect(checkout.postalCode()).toBeVisible();
  });

  await test.step('Fill shipping info', async () => {
    await checkout.fillShipping('Juraj', 'K', '81108');
  });

  await test.step('Overview shows item and total', async () => {
    await expect(checkout.orderItem('Sauce Labs Backpack')).toBeVisible();
    await expect(checkout.totalLabel()).toHaveText('Total: $32.39');
  });

  await test.step('Finish the order', async () => {
    await expect(checkout.finishButton()).toBeEnabled();
    await checkout.finishButton().click();
  });

  await test.step('Confirmation page is shown', async () => {
    await expect(checkout.completeHeader()).toHaveText('Thank you for your order!');
  });
});
