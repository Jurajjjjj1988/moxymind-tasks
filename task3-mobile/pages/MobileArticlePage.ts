import { Page, Locator } from '@playwright/test';

export class MobileArticlePage {
  readonly page: Page;
  readonly firstHeading: Locator;
  readonly sectionHeadings: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstHeading = page.locator('#firstHeading');
    // On mobile Wikipedia (MinervaNeue skin) section headings double as
    // collapse toggles. The same elements on desktop are static labels.
    this.sectionHeadings = page.locator('.section-heading');
  }

  async openByPath(path: string) {
    await this.page.goto(path);
  }
}
