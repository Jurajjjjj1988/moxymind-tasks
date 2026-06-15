import { test as base } from '@playwright/test';
import { MobileHomePage } from '../pages/MobileHomePage';
import { MobileArticlePage } from '../pages/MobileArticlePage';

type Pages = {
  homePage: MobileHomePage;
  articlePage: MobileArticlePage;
};

export const test = base.extend<Pages>({
  homePage: async ({ page }, use) => {
    await use(new MobileHomePage(page));
  },
  articlePage: async ({ page }, use) => {
    await use(new MobileArticlePage(page));
  },
});
