import { test } from '@playwright/test';
import { MenuPage } from '../../src/pages/MenuPage';
import { CartPage } from '../../src/pages/CartPage';

test('Cart cleaned after page refresh', async ({ page }) => {
  const menuPage = new MenuPage(page);
  const cartPage = new CartPage(page);

  await menuPage.open();
  await menuPage.clickCup('Cappuccino');
  await menuPage.clickCup('Espresso');
  await menuPage.clickCartLink();
  await cartPage.waitForLoading();
  await cartPage.assertItemIsVisible('Cappuccino');
  await cartPage.reloadPage();
  await cartPage.assertItemIsHidden('Cappuccino');
  await cartPage.assertEmptyCartShowsCorrectMessage();
});
