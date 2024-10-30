import { test, expect } from '@playwright/test';

test('Check Cappuccino correctly added to the Cart', async ({ page }) => {
  await page.goto('https://coffee-cart.app/'); 
  await page.getByTestId('Cappuccino').click();
  await page.getByLabel('Cart page').click();
  await page.waitForURL('https://coffee-cart.app/cart');

  const cartLocator = page.getByRole('list').nth(1);
  const cartFirstItemLocator = cartLocator.getByRole('listitem').nth(1);
  const cartFirstItemNameLocator = cartFirstItemLocator.locator('div').nth(0); 
  const cartFirstItemUnitLocator = cartFirstItemLocator.locator('div').nth(1); 
  const cartFirstItemTotalLocator = cartFirstItemLocator.locator('div').nth(3); 

  await expect(cartFirstItemNameLocator).toContainText('Cappuccino'); 
  await expect(cartFirstItemUnitLocator).toContainText('$19.00 x 1'); 
  await expect(cartFirstItemTotalLocator).toContainText('$19.00'); 
});