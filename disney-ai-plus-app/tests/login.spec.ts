import { test, expect } from '@playwright/test'

test.describe('Login Page', () => {
  test('should display login page and take screenshot', async ({ page }) => {
    // Navigate to the login page
    await page.goto('http://localhost:3000/login')

    // Wait for page to load
    await page.waitForLoadState('networkidle')

    // Check if the page title is visible
    await expect(page.getByRole('heading', { name: /welcome back/i })).toBeVisible()

    // Check if email input is visible
    await expect(page.getByLabel(/email address/i)).toBeVisible()

    // Check if password input is visible
    await expect(page.getByLabel(/password/i)).toBeVisible()

    // Check if sign in button is visible
    await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible()

    // Take a screenshot
    await page.screenshot({ path: 'screenshots/login-page.png', fullPage: true })

    console.log('✓ Login page screenshot saved to screenshots/login-page.png')
  })

  test('should toggle between sign in and sign up', async ({ page }) => {
    await page.goto('http://localhost:3000/login')
    await page.waitForLoadState('networkidle')

    // Initially should show Sign In
    await expect(page.getByRole('heading', { name: /welcome back/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible()

    // Click to switch to sign up
    await page.getByRole('button', { name: /don't have an account/i }).click()

    // Should now show Sign Up
    await expect(page.getByRole('heading', { name: /create account/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /sign up/i })).toBeVisible()

    // Take screenshot of sign up form
    await page.screenshot({ path: 'screenshots/signup-page.png', fullPage: true })

    console.log('✓ Sign up page screenshot saved to screenshots/signup-page.png')
  })
})
