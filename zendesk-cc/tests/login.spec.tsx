import { test, expect } from '@playwright/test'


//This is a test to check that a user should not be able to login with wrong credentials
test('Should show invalid credentials with wrong login', async ({ page }) => {

  await page.goto('http://localhost:3000/')

  await page.fill('#email', 'test');

  await page.fill('#password', 'invalid');

  await expect(page).toHaveURL('http://localhost:3000/')

  await expect(page.locator('p')).toHaveText("Invalid Credentials")
})