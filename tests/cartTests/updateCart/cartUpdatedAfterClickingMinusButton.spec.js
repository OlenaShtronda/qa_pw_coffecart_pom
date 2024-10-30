import { test, expect } from '@playwright/test';

test('Assert cart updated correctly after clicking minus for drinks', async ({ page }) => {
  /*
  Test:
    1. Open the Coffee Cart menu page https://coffee-cart.app/
    2. Click on the "Cappuccino" cup
    3. Click on the "Espresso" cup
    4. Click one the "Cart" link
    5. Wait for the URL https://coffee-cart.app/cart 
    6. Assert that Espresso is visible in the cart
    6. Click "-" for Espresso
    7. Assert that Espresso is removed from the cart
    9. Assert that Cappucion is viisble in the cart
    10. Click - for Cappucion
    11. Assert that Cappucion is removed from the cart
    12. Assert the message "No coffee, go add some" is visible
  */

  await page.goto('https://coffee-cart.app/'); 
  await page.getByTestId('Cappuccino').click();
  await page.getByTestId('Espresso').click();
 
  await page.getByLabel('Cart page').click();
  await page.waitForURL('https://coffee-cart.app/cart');

  const cartLocator = page.getByRole('list').nth(1);
  const espressoItem = cartLocator.getByRole('listitem').filter({ hasText: "Espresso"});
  const cappuccinoItem = cartLocator.getByRole('listitem').filter({ hasText: "Cappuccino"});

  await expect(espressoItem).toBeVisible();

  await page.getByRole('button', { name: 'Remove one Espresso' }).click();

  await expect(espressoItem).toBeHidden();
  await expect(cappuccinoItem).toBeVisible();

  await page.getByRole('button', { name: 'Remove one Cappuccino' }).click();

  await expect(cappuccinoItem).toBeHidden();
  await expect(page.getByText('No coffee, go add some.')).toBeVisible();
});