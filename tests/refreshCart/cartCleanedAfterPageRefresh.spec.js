import { test } from '@playwright/test';
import { MenuPage } from '../../src/pages/MenuPage';
import { CartPage } from '../../src/pages/CartPage';

test('Cart cleaned after page refresh', async ({ page }) => {
  const menuPage = new MenuPage(page);
  const cartPageCappuccino = new CartPage(page, 'Cappuccino');

  await menuPage.open();
  await menuPage.clickCup('Cappuccino');
  await menuPage.clickCup('Espresso');
  await menuPage.clickCartLink();
  await cartPageCappuccino.waitForLoading();
  await cartPageCappuccino.assertItemIsVisible();
  await cartPageCappuccino.reloadPage();
  await cartPageCappuccino.assertItemIsHidden();
  await cartPageCappuccino.assertEmptyCartShowsCorrectMessage();
});
