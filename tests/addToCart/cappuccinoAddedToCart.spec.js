import { test } from '@playwright/test';
import { MenuPage } from '../../src/pages/MenuPage';
import { CartPage } from '../../src/pages/CartPage';

test('Cappuccino correctly added to the Cart', async ({ page }) => {
  const menuPage = new MenuPage(page);
  const cartPage = new CartPage(page);

  await menuPage.open();
  await menuPage.clickCup('Cappuccino');
  await menuPage.clickCartLink();
  await cartPage.waitForLoading();
  await cartPage.assertItemColumnContainsCorrectText('Cappuccino');
  await cartPage.assertUnitColumnContainsCorrectText('Cappuccino', '$19.00 x 1');
  await cartPage.assertTotalColumnContainsCorrectText('Cappuccino', '$19.00');
});
