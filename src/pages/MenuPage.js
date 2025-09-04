import { expect } from '@playwright/test';

export class MenuPage {
  constructor(page, itemName) {
    this.page = page;
    this.itemName = itemName;
    this.cartLinkLocator = this.page.getByLabel('Cart page');
    this.checkoutLocator = this.page.getByTestId('checkout');
    if (itemName) {
      this.cupLocator = page.getByTestId(itemName);
      this.cupParentLocator = page.getByRole('listitem').filter({ has: this.cupLocator });
    }
    this.promoTextLocator = this.page.getByText("It's your lucky day! Get an extra cup of Mocha for $4.");
    this.yesPromoButtonLocator = this.page.getByRole('button', { name: 'Yes, of course!' });
    this.noPromoButtonLocator = this.page.getByRole('button', { name: "Nah, I'll skip." });
  }
  
  async open() {
    await this.page.goto('https://coffee-cart.app/');
  }

  async clickCup(itemName = this.itemName) {
    await this.page.getByTestId(itemName).click();
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

  async assertCupContainsCorrectCost(cost) {
    await expect(this.cupParentLocator).toContainText(cost);
  }

  async assertCheckoutContainsCorrectText(checkoutText) {
    await expect(this.checkoutLocator).toContainText(checkoutText);
  }

  async assertPromoTextIsVisible() {
    await expect(this.promoTextLocator).toBeVisible();
  }
}
