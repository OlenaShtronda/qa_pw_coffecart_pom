import { test } from '@playwright/test';
import { MenuPage } from '../../src/pages/MenuPage';
import { CartPage } from '../../src/pages/CartPage';

test('Espresso correctly added to the Cart', async ({ page }) => {
  const menuPage = new MenuPage(page, 'Espresso');

  await menuPage.open();
  await menuPage.clickCup();
  await menuPage.clickCartLink();

  const cartPageEspresso = new CartPage(page, 'Espresso');

  await cartPageEspresso.waitForLoading();
  await cartPageEspresso.assertItemColumnContainsCorrectText();
  await cartPageEspresso.assertUnitColumnContainsCorrectText('$10.00 x 1');
  await cartPageEspresso.assertTotalColumnContainsCorrectText('$10.00');
});
