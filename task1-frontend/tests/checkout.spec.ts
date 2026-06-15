import { expect } from '@playwright/test';
import { test, USERS } from '../fixtures/pages';

// End-to-end purchase. If this passes, login + inventory + cart + checkout all work.
// This is the smoke test that proves "money flows".
test('end-to-end checkout completes successfully', async ({
  loginPage,
  inventoryPage,
  cartPage,
  checkoutPage,
  page,
}) => {
  await loginPage.open();
  await loginPage.loginAs(USERS.standard.name, USERS.standard.pass);

  await inventoryPage.addByName('Sauce Labs Backpack');
  await inventoryPage.goToCart();
  await cartPage.checkout.click();

  await checkoutPage.fillShippingInfo('Juraj', 'K', '811 08');
  await checkoutPage.finish.click();

  await expect(page).toHaveURL(/.*checkout-complete\.html/);
  await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
});
