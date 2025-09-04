import { test } from '@playwright/test';
import { MenuPage } from '../../src/pages/MenuPage';
import { CartPage } from '../../src/pages/CartPage';

test('Discounted Mocha added to the Cart after promo accepting', async ({ page }) => {
  const menuPage = new MenuPage(page);
  const cartPage = new CartPage(page);

  await menuPage.open();
  await menuPage.clickCup('Cappuccino');
  await menuPage.clickCup('Espresso');
  await menuPage.clickCup('Americano');
  await menuPage.assertPromoTextIsVisible();
  await menuPage.clickYesButton();
  await menuPage.clickCartLink();
  await cartPage.waitForLoading();
  await cartPage.assertTotalColumnContainsCorrectText('Espresso', '$10.00');
  await cartPage.assertTotalColumnContainsCorrectText('(Discounted) Mocha', '$4.00');
  await cartPage.assertTotalColumnContainsCorrectText('Cappuccino', '$19.00');
  await cartPage.assertTotalColumnContainsCorrectText('Americano', '$7.00');
});
