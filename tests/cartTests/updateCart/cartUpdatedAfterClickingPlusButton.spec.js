import { test, expect } from '@playwright/test';

test('Assert cart updated correctly after clicking plus for drinks', async ({ page }) => {
/*
Test:
  1. Open the Coffee Cart menu page https://coffee-cart.app/
  2. Click on the "Cappuccino" cup
  3. Click on the "Espresso" cup
  4. Click one the "Cart" link
  5. Wait for the URL https://coffee-cart.app/cart 
  6. Assert Total Cost for Espresso is '$10.00'
  7. Click + for Espresso
  8. Assert that Total Cost for Espresso is '$20.00'
  9. Assert Total Cost for Cappuccino is '$19.00'
  10. Click + for Cappucino
  11. Assert Total Cost for Cappuccino is '$38.00'
  12. Assert the Total cost of the Cart is $58.00
   */

  await page.goto('https://coffee-cart.app/'); 
  await page.getByTestId('Cappuccino').click();
  await page.getByTestId('Espresso').click();
  await page.getByLabel('Cart page').click();
  await page.waitForURL('https://coffee-cart.app/cart');

  const cartLocator = page.getByRole('list').nth(1);
  const espressoItem = cartLocator.getByRole('listitem').filter({ hasText: "Espresso"});
  const espressoTotalCost = espressoItem.locator('div').nth(3); 
  const cappuccinoItem = cartLocator.getByRole('listitem').filter({ hasText: "Cappuccino"});
  const cappuccinoTotalCost = cappuccinoItem.locator('div').nth(3); 

  await expect(espressoTotalCost).toContainText('$10.00');

  await page.getByRole('button', { name: 'Add one Espresso' }).click();
  
  await expect(espressoTotalCost).toContainText('$20.00');
  await expect(cappuccinoTotalCost).toContainText('$19.00');

  await page.getByRole('button', { name: 'Add one Cappuccino' }).click();
  
  await expect(cappuccinoTotalCost).toContainText('$38.00');
  await expect(espressoTotalCost).toContainText('$20.00');
  await expect(page.getByTestId('checkout')).toContainText('$58.00');
});