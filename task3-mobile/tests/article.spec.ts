import { test, expect } from '@playwright/test';
import { MobileHomePage } from '../pages/MobileHomePage';
import { MobileArticlePage } from '../pages/MobileArticlePage';

test('article page renders with mobile chrome', async ({ page }) => {
  const home = new MobileHomePage(page);
  const article = new MobileArticlePage(page);

  await test.step('Open Playwright article', async () => {
    await article.openByPath('/wiki/Playwright_(software)');
  });

  await test.step('Article heading is shown', async () => {
    await expect(article.firstHeading).toBeVisible();
    await expect(article.firstHeading).toContainText('Playwright');
  });

  await test.step('Search trigger is in header', async () => {
    await expect(home.searchTrigger).toBeVisible();
  });

  await test.step('Hamburger toggle is present', async () => {
    await expect(home.menuToggle).toBeAttached();
  });
});
