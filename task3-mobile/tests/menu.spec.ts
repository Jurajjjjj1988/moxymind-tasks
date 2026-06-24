import { test, expect } from '@playwright/test';
import { MobileHomePage } from '../pages/MobileHomePage';

test('mobile hamburger menu opens with primary nav links', async ({ page }) => {
  const home = new MobileHomePage(page);

  await test.step('Open mobile home', async () => {
    await home.open();
  });

  await test.step('Hamburger toggle is present', async () => {
    await expect(home.menuToggle).toBeAttached();
  });

  await test.step('Tap the hamburger', async () => {
    await home.openMenu();
  });

  await test.step('Drawer is shown', async () => {
    await expect(home.menuDrawer).toBeVisible();
  });

  await test.step('Primary nav links are visible', async () => {
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Random' })).toBeVisible();
  });
});
