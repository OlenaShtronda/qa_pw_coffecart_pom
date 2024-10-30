import { test, expect } from '@playwright/test';

test('Check Espresso correctly added to the Cart', async ({ page }) => {
  await page.goto('https://coffee-cart.app/'); 
  await page.getByTestId('Espresso').click();
  await page.getByLabel('Cart page').click();
  await page.waitForURL('https://coffee-cart.app/cart');

  const cartTableLocator = page.getByRole('list').nth(1);
  const cartTableFirstItemLocator = cartTableLocator.getByRole('listitem').nth(1);
  const cartTableFirstItemNameLocator = cartTableFirstItemLocator.locator('div').nth(0); 
  const cartTableFirstItemUnitLocator = cartTableFirstItemLocator.locator('div').nth(1); 
  const cartTableFirstItemTotalLocator = cartTableFirstItemLocator.locator('div').nth(3); 

  await expect(cartTableFirstItemNameLocator).toContainText('Espresso'); 
  await expect(cartTableFirstItemUnitLocator).toContainText('$10.00 x 1'); 
  await expect(cartTableFirstItemTotalLocator).toContainText('$10.00'); 
});