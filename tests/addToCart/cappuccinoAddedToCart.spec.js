import { test } from '@playwright/test';
import { MenuPage } from '../../src/pages/MenuPage';
import { CartPage } from '../../src/pages/CartPage';

test('Cappuccino correctly added to the Cart', async ({ page }) => {
  const menuPage = new MenuPage(page, 'Cappuccino');

  await menuPage.open();
  await menuPage.clickCup();
  await menuPage.clickCartLink();

  const cartPageCappuccino = new CartPage(page, 'Cappuccino');

  await cartPageCappuccino.waitForLoading();
  await cartPageCappuccino.assertItemColumnContainsCorrectText();
  await cartPageCappuccino.assertUnitColumnContainsCorrectText('$19.00 x 1');
  await cartPageCappuccino.assertTotalColumnContainsCorrectText('$19.00');
});
