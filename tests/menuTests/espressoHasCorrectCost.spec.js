import { test } from '@playwright/test';
import { MenuPage } from '../../src/pages/MenuPage';

test('Espresso cup has correct cost', async ({ page }) => {
  const menuPage = new MenuPage(page, 'Espresso');

  await menuPage.open();
  await menuPage.assertCupContainsCorrectCost('$10.00');
});
