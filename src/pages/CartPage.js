import { expect } from '@playwright/test';

export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartListLocator = this.page.getByRole('list').nth(1);
    this.emptyCartMessageLocator = this.page.getByText('No coffee, go add some.');
    this.checkoutLocator = this.page.getByTestId('checkout');
  }

  async open() {
    await this.page.goto('https://coffee-cart.app/cart');
  }
  
  async waitForLoading() {
    await this.page.waitForURL('https://coffee-cart.app/cart');
  }

  getItemRowLocator(itemName) {
    return this.cartListLocator.getByRole('listitem').filter({ hasText: itemName });
  }

  getItemNameLocator(itemName) {
    return this.getItemRowLocator(itemName).locator('div').nth(0);
  }

  getItemUnitLocator(itemName) {
    return this.getItemRowLocator(itemName).locator('div').nth(1);
  }

  getItemTotalCostLocator(itemName) {
    return this.getItemRowLocator(itemName).locator('div').nth(3);
  }

  async assertItemColumnContainsCorrectText(itemName) {
    await expect(this.getItemNameLocator(itemName)).toContainText(itemName);
  }

  async assertUnitColumnContainsCorrectText(itemName, unit) {
    await expect(this.getItemUnitLocator(itemName)).toContainText(unit);
  }

  async assertTotalColumnContainsCorrectText(itemName, total) {
    await expect(this.getItemTotalCostLocator(itemName)).toContainText(total);
  }

  async assertEmptyCartShowsCorrectMessage() {
    await expect(this.emptyCartMessageLocator).toBeVisible();
  }

  async assertItemIsVisible(itemName) {
    await expect(this.getItemRowLocator(itemName)).toBeVisible();
  }

  async assertItemIsHidden(itemName) {
    await expect(this.getItemRowLocator(itemName)).toBeHidden();
  }

  async reloadPage() {
    await this.page.reload();
  }

  async removeAll(itemName) {
    await this.page.getByLabel(`Remove all ${itemName}`).click();
  }

  async removeOne(itemName) {
    await this.page.getByRole('button', { name: `Remove one ${itemName}` }).click();
  }

  async addOne(itemName) {
    await this.page.getByRole('button', { name: `Add one ${itemName}` }).click();
  }

  async assertCheckoutContainsCorrectText(checkoutText) {
    await expect(this.checkoutLocator).toContainText(checkoutText);
  }
}
