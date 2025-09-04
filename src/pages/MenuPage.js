import { expect } from '@playwright/test';

export class MenuPage {
  constructor(page) {
    this.page = page;
    this.cartLinkLocator = this.page.getByLabel('Cart page');
    this.checkoutLocator = this.page.getByTestId('checkout');
    this.promoTextLocator = this.page.getByText("It's your lucky day! Get an extra cup of Mocha for $4.");
    this.yesPromoButtonLocator = this.page.getByRole('button', { name: 'Yes, of course!' });
    this.noPromoButtonLocator = this.page.getByRole('button', { name: "Nah, I'll skip." });
  }
  
  async open() {
    await this.page.goto('https://coffee-cart.app/');
  }

  getCupLocator(itemName) {
    return this.page.getByTestId(itemName);
  }

  getCupParentLocator(itemName) {
    return this.page.getByRole('listitem').filter({ has: this.getCupLocator(itemName) });
  }

  async clickCup(itemName) {
    await this.getCupLocator(itemName).click();
  }

  async clickYesButton() {
    await this.yesPromoButtonLocator.click();
  }

  async clickNoButton() {
    await this.noPromoButtonLocator.click();
  }

  async clickCartLink() {
    await this.cartLinkLocator.click();
  }

  async assertCupContainsCorrectCost(itemName, cost) {
  await expect(this.getCupParentLocator(itemName)).toContainText(cost);
}

  async assertCheckoutContainsCorrectText(checkoutText) {
    await expect(this.checkoutLocator).toContainText(checkoutText);
  }

  async assertPromoTextIsVisible() {
    await expect(this.promoTextLocator).toBeVisible();
  }
}
