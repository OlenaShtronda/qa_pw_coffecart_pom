import { expect } from '@playwright/test';

export class CartPage {
  constructor(page, itemName) {
    this.page = page;
    this.itemName = itemName;
    this.cartListLocator = this.page.getByRole('list').nth(1);
    this.itemRowLocator = this.cartListLocator.getByRole('listitem').filter({ hasText: itemName });
    this.itemNameLocator = this.itemRowLocator.locator('div').nth(0);
    this.itemUnitLocator = this.itemRowLocator.locator('div').nth(1);
    this.itemTotalCostLocator = this.itemRowLocator.locator('div').nth(3);
    this.emptyCartMessageLocator = this.page.getByText('No coffee, go add some.');
    this.removeAllCappuccinoLocator = this.page.getByLabel('Remove all Cappuccino');
    this.removeAllEspressoLocator = this.page.getByLabel('Remove all Espresso');
    this.removeOneEspressoLocator = this.page.getByRole('button', { name: 'Remove one Espresso' });
    this.removeOneCappuccinoLocator = this.page.getByRole('button', { name: 'Remove one Cappuccino' });
    this.addOneEspressoLocator = this.page.getByRole('button', { name: 'Add one Espresso' });
    this.addOneCappuccinoLocator = this.page.getByRole('button', { name: 'Add one Cappuccino' });
    this.checkoutLocator = this.page.getByTestId('checkout');
  }

  async open() {
    await this.page.goto('https://coffee-cart.app/cart');
  }
  
  async waitForLoading() {
    await this.page.waitForURL('https://coffee-cart.app/cart');
  }

  async assertItemColumnContainsCorrectText() {
    await expect(this.itemNameLocator).toContainText(this.itemName);
  }

  async assertUnitColumnContainsCorrectText(unit) {
    await expect(this.itemUnitLocator).toContainText(unit);
  }

  async assertTotalColumnContainsCorrectText(total) {
    await expect(this.itemTotalCostLocator).toContainText(total);
  }

  async assertEmptyCartShowsCorrectMessage() {
    await expect(this.emptyCartMessageLocator).toBeVisible();
  }

  async assertItemIsVisible() {
    await expect(this.itemRowLocator).toBeVisible();
  }

  async assertItemIsHidden(item) {
    await expect(this.itemRowLocator).toBeHidden(item);
  }

  async reloadPage() {
    await this.page.reload();
  }

  async removeAllCappuccino() {
    await this.removeAllCappuccinoLocator.click();
  }

  async removeAllEspresso() {
    await this.removeAllEspressoLocator.click();
  }

  async removeOneEspresso() {
    await this.removeOneEspressoLocator.click();
  }

  async removeOneCappuccino() {
    await this.removeOneCappuccinoLocator.click();
  }

  async addOneEspresso() {
    await this.addOneEspressoLocator.click();
  }

  async addOneCappuccino() {
    await this.addOneCappuccinoLocator.click();
  }

  async assertCheckoutContainsCorrectText(checkoutText) {
    await expect(this.checkoutLocator).toContainText(checkoutText);
  }
}
