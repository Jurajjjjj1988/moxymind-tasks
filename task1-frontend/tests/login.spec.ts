import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Login', () => {
  test('standard user logs in and lands on inventory', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);

    await test.step('Open login page', async () => {
      await login.open();
    });

    await test.step('Login form is shown', async () => {
      await expect(login.username()).toBeVisible();
      await expect(login.password()).toBeVisible();
      await expect(login.loginButton()).toBeEnabled();
    });

    await test.step('Fill credentials for standard_user', async () => {
      await login.username().fill('standard_user');
      await login.password().fill('secret_sauce');
    });

    await test.step('Submit login', async () => {
      await login.loginButton().click();
    });

    await test.step('Inventory page is shown', async () => {
      await expect(page).toHaveURL(/inventory\.html/);
      await expect(inventory.items().first()).toBeVisible();
    });
  });

  test('locked out user sees an error', async ({ page }) => {
    const login = new LoginPage(page);

    await test.step('Open login page', async () => {
      await login.open();
      await expect(login.loginButton()).toBeEnabled();
    });

    await test.step('Fill credentials for locked_out_user', async () => {
      await login.username().fill('locked_out_user');
      await login.password().fill('secret_sauce');
    });

    await test.step('Submit login', async () => {
      await login.loginButton().click();
    });

    await test.step('Error message is shown', async () => {
      await expect(login.error()).toBeVisible();
      await expect(login.error()).toContainText('locked out');
    });
  });
});
