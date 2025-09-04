import { test } from '@playwright/test';
import { MenuPage } from '../../src/pages/MenuPage';

test('Espresso cost is added to Total on menu page', async ({ page }) => {
  const menuPage = new MenuPage(page);

  await menuPage.open();
  await menuPage.clickCup('Espresso');
  await menuPage.assertCheckoutContainsCorrectText('Total: $10.00');
});
