import { expect } from '@playwright/test';
import { test } from '../fixtures/pages';

// Article page is the dominant landing for mobile traffic. The test exercises
// the mobile MinervaNeue skin: hamburger button and header search trigger
// exist only in the mobile chrome, the desktop Vector skin replaces them
// with a sidebar. If a deploy accidentally serves the desktop skin to
// phones, this fails fast.
test('article page renders with mobile chrome', async ({ page, articlePage, homePage }) => {
  await articlePage.openByPath('/wiki/Playwright_(software)');

  await expect(articlePage.firstHeading).toContainText('Playwright');

  await expect(homePage.searchTrigger).toBeVisible();
  await expect(homePage.menuToggle).toBeAttached();
});
