import { Page } from '@playwright/test';

export class CheckoutPage {
  constructor(private readonly page: Page) {}

  firstName = () => this.page.getByTestId('firstName');
  lastName = () => this.page.getByTestId('lastName');
  postalCode = () => this.page.getByTestId('postalCode');
  continueButton = () => this.page.getByTestId('continue');
  finishButton = () => this.page.getByTestId('finish');
  completeHeader = () => this.page.getByTestId('complete-header');

  async fillShipping(first: string, last: string, zip: string) {
    await this.firstName().fill(first);
    await this.lastName().fill(last);
    await this.postalCode().fill(zip);
    await this.continueButton().click();
  }
}
