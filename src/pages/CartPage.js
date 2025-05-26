import { expect } from '@playwright/test';

export class CartPage {
  constructor(page) {
    this.page = page;
  }

  async open() {}

  async waitForLoading() {
    await this.page.waitForURL('https://coffee-cart.app/cart');
  }
}
