import { test } from '@playwright/test';
import { MenuPage } from '../../src/pages/MenuPage';
import { CartPage } from '../../src/pages/CartPage';

test('Cart updated correctly after clicking plus for drinks', async ({ page }) => {
  const menuPage = new MenuPage(page);
  const cartPage = new CartPage(page);

  await menuPage.open();
  await menuPage.clickCup('Cappuccino');
  await menuPage.clickCup('Espresso');
  await menuPage.clickCartLink();
  await cartPage.waitForLoading();
  await cartPage.assertTotalColumnContainsCorrectText('Espresso', '$10.00');
  await cartPage.addOne('Espresso');
  await cartPage.assertTotalColumnContainsCorrectText('Espresso', '$20.00');
  await cartPage.assertTotalColumnContainsCorrectText('Cappuccino', '$19.00');
  await cartPage.addOne('Cappuccino');
  await cartPage.assertTotalColumnContainsCorrectText('Cappuccino', '$38.00');
  await cartPage.assertTotalColumnContainsCorrectText('Espresso', '$20.00');
  await cartPage.assertCheckoutContainsCorrectText('$58.00');
});
