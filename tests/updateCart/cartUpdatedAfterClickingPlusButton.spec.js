import { test } from '@playwright/test';
import { MenuPage } from '../../src/pages/MenuPage';
import { CartPage } from '../../src/pages/CartPage';

test('Cart updated correctly after clicking plus for drinks', async ({ page }) => {
  const menuPage = new MenuPage(page, 'Espresso');
  const cartPageCappuccino = new CartPage(page, 'Cappuccino');
  const cartPageEspresso = new CartPage(page, 'Espresso');

  await menuPage.open();
  await menuPage.clickCup('Cappuccino');
  await menuPage.clickCup('Espresso');
  await menuPage.clickCartLink();
  await cartPageEspresso.waitForLoading();
  await cartPageEspresso.assertTotalColumnContainsCorrectText('$10.00');
  await cartPageEspresso.addOneEspresso();
  await cartPageEspresso.assertTotalColumnContainsCorrectText('$20.00');
  await cartPageCappuccino.assertTotalColumnContainsCorrectText('$19.00');
  await cartPageCappuccino.addOneCappuccino();
  await cartPageCappuccino.assertTotalColumnContainsCorrectText('$38.00');
  await cartPageEspresso.assertTotalColumnContainsCorrectText('$20.00');
  await cartPageEspresso.assertCheckoutContainsCorrectText('$58.00');
});
