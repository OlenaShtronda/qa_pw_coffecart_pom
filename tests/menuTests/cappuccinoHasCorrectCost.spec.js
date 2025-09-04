import { test } from '@playwright/test';
import { MenuPage } from '../../src/pages/MenuPage';

test('Cappuccino cup has correct cost', async ({ page }) => {
  const menuPage = new MenuPage(page, 'Cappuccino');

  await menuPage.open();
  await menuPage.assertCupContainsCorrectCost('$19.00');
});
