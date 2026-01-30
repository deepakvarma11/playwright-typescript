import { test, expect } from '@playwright/test';

test.describe('SauceLabs Add Employee Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
    });

    test('login and add items to cart', async ({ page }) => {
        // Login
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');

        // Verify login successful
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await expect(page.locator('.title')).toHaveText('Products');

        // Add items to cart
        await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
        await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
        await page.click('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');

        // Verify cart badge shows correct count
        await expect(page.locator('.shopping_cart_badge')).toHaveText('3');

        // Go to cart and verify items
        await page.click('.shopping_cart_link');
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
        
        const cartItems = page.locator('.cart_item');
        await expect(cartItems).toHaveCount(3);
        
        // Verify specific items are in cart
        await expect(page.locator('[data-test="item-4-title-link"]')).toBeVisible();
        await expect(page.locator('[data-test="item-0-title-link"]')).toBeVisible();
        await expect(page.locator('[data-test="item-1-title-link"]')).toBeVisible();
    });

    test('login with invalid credentials', async ({ page }) => {
        await page.fill('#user-name', 'invalid_user');
        await page.fill('#password', 'wrong_password');
        await page.click('#login-button');

        // Verify error message
        await expect(page.locator('[data-test="error"]')).toBeVisible();
        await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface');
    });
});