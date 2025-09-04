import { test } from '@playwright/test';
import { MenuPage } from '../../src/pages/MenuPage';
import { CartPage } from '../../src/pages/CartPage';

test('Discounted Mocha added to the Cart after promo accepting', async ({ page }) => {
  const menuPage = new MenuPage(page);
  const cartPageEspresso = new CartPage(page, 'Espresso');
  const cartPageMocha = new CartPage(page, '(Discounted) Mocha');
  const cartPageCappuccino = new CartPage(page, 'Cappuccino');
  const cartPageAmericano = new CartPage(page, 'Americano');

  await menuPage.open();
  await menuPage.clickCup('Cappuccino');
  await menuPage.clickCup('Espresso');
  await menuPage.clickCup('Americano');
  await menuPage.assertPromoTextIsVisible();
  await menuPage.clickYesButton();
  await menuPage.clickCartLink();
  await cartPageEspresso.waitForLoading();
  await cartPageEspresso.assertTotalColumnContainsCorrectText('$10.00');
  await cartPageMocha.assertTotalColumnContainsCorrectText('$4.00');
  await cartPageCappuccino.assertTotalColumnContainsCorrectText('$19.00');
  await cartPageAmericano.assertTotalColumnContainsCorrectText('$7.00');
});
