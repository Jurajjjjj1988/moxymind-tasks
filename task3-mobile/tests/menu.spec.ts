import { expect } from '@playwright/test';
import { test } from '../fixtures/pages';

// The hamburger menu is mobile-only chrome - the desktop skin renders these
// links in a static sidebar instead. The test guards the mobile navigation
// drawer against regressions specific to the mobile skin.
test('mobile hamburger menu opens with primary nav links', async ({ homePage, page }) => {
  await homePage.open();

  await expect(homePage.menuToggle).toBeVisible();
  await homePage.openMenu();

  await expect(homePage.menuDrawer).toBeVisible();
  await expect(page.getByRole('link', { name: /^Home$/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /Random/i })).toBeVisible();
});
