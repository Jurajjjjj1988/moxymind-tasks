import { expect } from '@playwright/test';
import { test, USERS } from '../fixtures/pages';

// Login is the gate to every other flow. If it breaks, the whole site stops.
test.describe('Login', () => {
  test('standard_user lands on inventory after successful login', async ({ loginPage, inventoryPage, page }) => {
    await loginPage.open();
    await loginPage.loginAs(USERS.standard.name, USERS.standard.pass);

    await expect(page).toHaveURL(/.*inventory\.html/);
    await expect(inventoryPage.items).toHaveCount(6);
  });

  // Negative auth path. A regression here would let blocked accounts back in.
  test('locked_out_user is rejected with the lockout message', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.loginAs(USERS.locked.name, USERS.locked.pass);

    await expect(loginPage.error).toBeVisible();
    await expect(loginPage.error).toContainText('locked out');
  });
});
