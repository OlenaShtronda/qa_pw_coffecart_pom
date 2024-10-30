import { test, expect } from '@playwright/test';

test('Assert discounted Mocha added to the Cart after promo accepting', async ({ page }) => {
/*
Test:
  1. Open the Coffee Cart menu page https://coffee-cart.app/
  2. Click on the "Cappuccino" cup
  3. Click on the "Espresso" cup
  4. Click on the "Americano" cup
  5. Assert the message "It's your lucky day! Get an extra cup of Mocha for $4." is visible on the page
  6. Click the button "Nah, I'll skip."
  7. Click one the "Cart" link
  8. Wait for the URL https://coffee-cart.app/cart 
  9. Assert the "Espresso" listitem is visible in the cart
  10. Assert the "(Discounted) Mocha" listitem is not visible in the cart
  11. Assert the "Cappuccino" listitem is visible in the cart
  12. Assert the "Americano" listitem is visible in the cart
 */

  await page.goto('https://coffee-cart.app/'); 
  await page.getByTestId('Cappuccino').click();
  await page.getByTestId('Espresso').click();
  await page.getByTestId('Americano').click();
  
  await expect(page.getByText("It's your lucky day! Get an extra cup of Mocha for $4.")).toBeVisible();

  await page.getByRole('button', { name: "Nah, I'll skip." }).click();
  await page.getByLabel('Cart page').click();
  await page.waitForURL('https://coffee-cart.app/cart');

  const cartLocator = page.getByRole('list').nth(1);

  // Espresso
  const espressoItem = cartLocator.getByRole('listitem').filter({ hasText: "Espresso"});
  await expect(espressoItem).toBeVisible();

  // (Discounted) Mocha
  const mochaDiscountedItem = cartLocator.getByRole('listitem').filter({ hasText: "(Discounted) Mocha"});
  await expect(mochaDiscountedItem).toBeHidden();

  // Cappuccino
  const cappuccinoItem = cartLocator.getByRole('listitem').filter({ hasText: "Cappuccino"});
  await expect(cappuccinoItem).toBeVisible();

  // Americano
  const americanoItem = cartLocator.getByRole('listitem').filter({ hasText: "Americano"});
  await expect(americanoItem).toBeVisible();
});