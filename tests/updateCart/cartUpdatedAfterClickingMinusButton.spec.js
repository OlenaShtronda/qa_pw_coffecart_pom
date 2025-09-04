import { test } from '@playwright/test';
import { MenuPage } from '../../src/pages/MenuPage';
import { CartPage } from '../../src/pages/CartPage';

test('Cart updated correctly after clicking minus for drinks', async ({ page }) => {
  const menuPage = new MenuPage(page);
  const cartPage = new CartPage(page);

  await menuPage.open();
  await menuPage.clickCup('Cappuccino');
  await menuPage.clickCup('Espresso');
  await menuPage.clickCartLink();
  await cartPage.waitForLoading();
  await cartPage.assertItemIsVisible('Espresso');
  await cartPage.removeOne('Espresso');
  await cartPage.assertItemIsHidden('Espresso');
  await cartPage.assertItemIsVisible('Cappuccino');
  await cartPage.removeOne('Cappuccino');
  await cartPage.assertItemIsHidden('Cappuccino');
  await cartPage.assertEmptyCartShowsCorrectMessage();
});
