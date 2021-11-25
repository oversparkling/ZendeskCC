import { test, expect } from '@playwright/test'

test('Should show invalid credentials with wrong login', async ({ page }) => {

  await page.goto('http://localhost:3000/')

  await page.fill('#username', 'test');

  await page.fill('#password', 'invalid');

  await expect(page).toHaveURL('http://localhost:3000/')

  await expect(page.locator('p')).toHaveText("Invalid Credentials")
})