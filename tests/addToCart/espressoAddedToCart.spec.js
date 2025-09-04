import { test } from '@playwright/test';
import { MenuPage } from '../../src/pages/MenuPage';
import { CartPage } from '../../src/pages/CartPage';

test('Espresso correctly added to the Cart', async ({ page }) => {
  const menuPage = new MenuPage(page);
  const cartPage = new CartPage(page);

  await menuPage.open();
  await menuPage.clickCup('Espresso');
  await menuPage.clickCartLink();
  await cartPage.waitForLoading();
  await cartPage.assertItemColumnContainsCorrectText('Espresso');
  await cartPage.assertUnitColumnContainsCorrectText('Espresso', '$10.00 x 1');
  await cartPage.assertTotalColumnContainsCorrectText('Espresso', '$10.00');
});
