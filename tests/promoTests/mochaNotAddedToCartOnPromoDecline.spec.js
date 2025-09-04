import { test } from '@playwright/test';
import { MenuPage } from '../../src/pages/MenuPage';
import { CartPage } from '../../src/pages/CartPage';

test('Discounted Mocha not added to the Cart after promo rejecting', async ({ page }) => {
  const menuPage = new MenuPage(page);
  const cartPage = new CartPage(page);

  await menuPage.open();
  await menuPage.clickCup('Cappuccino');
  await menuPage.clickCup('Espresso');
  await menuPage.clickCup('Americano');
  await menuPage.assertPromoTextIsVisible();
  await menuPage.clickNoButton();
  await menuPage.clickCartLink();
  await cartPage.waitForLoading();
  await cartPage.assertItemIsVisible('Espresso');
  await cartPage.assertItemIsHidden('(Discounted) Mocha');
  await cartPage.assertItemIsVisible('Cappuccino');
  await cartPage.assertItemIsVisible('Americano');
});
