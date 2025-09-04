import { test } from '@playwright/test';
import { MenuPage } from '../../src/pages/MenuPage';
import { CartPage } from '../../src/pages/CartPage';

test('Cart updated correctly after clicking minus for drinks', async ({ page }) => {
  const menuPage = new MenuPage(page, 'Espresso');
  const cartPageCappuccino = new CartPage(page, 'Cappuccino');
  const cartPageEspresso = new CartPage(page, 'Espresso');

  await menuPage.open();
  await menuPage.clickCup('Cappuccino');
  await menuPage.clickCup('Espresso');
  await menuPage.clickCartLink();
  await cartPageEspresso.waitForLoading();
  await cartPageEspresso.assertItemIsVisible();
  await cartPageEspresso.removeOneEspresso();
  await cartPageEspresso.assertItemIsHidden();
  await cartPageCappuccino.assertItemIsVisible();
  await cartPageCappuccino.removeOneCappuccino();
  await cartPageCappuccino.assertItemIsHidden();
  await cartPageCappuccino.assertEmptyCartShowsCorrectMessage();
});
