import { test } from '@playwright/test';
import { MenuPage } from '../../src/pages/MenuPage';
import { CartPage } from '../../src/pages/CartPage';

test('Cappuccino removed from Cart after clicking Remove', async ({ page }) => {
  const menuPage = new MenuPage(page, 'Cappuccino');
  const cartPage = new CartPage(page, 'Cappuccino');

  await menuPage.open();
  await menuPage.clickCup('Cappuccino');
  await menuPage.clickCartLink();
  await cartPage.waitForLoading();
  await cartPage.removeAllCappuccino();
  await cartPage.assertEmptyCartShowsCorrectMessage();
});
