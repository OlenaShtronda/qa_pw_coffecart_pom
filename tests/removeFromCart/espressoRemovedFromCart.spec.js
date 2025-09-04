import { test } from '@playwright/test';
import { MenuPage } from '../../src/pages/MenuPage';
import { CartPage } from '../../src/pages/CartPage';

test('Espresso removed from Cart after clicking Remove', async ({ page }) => {
  const menuPage = new MenuPage(page);
  const cartPage = new CartPage(page);

  await menuPage.open();
  await menuPage.clickCup('Espresso');
  await menuPage.clickCartLink();
  await cartPage.waitForLoading();
  await cartPage.removeAll('Espresso');
  await cartPage.assertEmptyCartShowsCorrectMessage();
});
