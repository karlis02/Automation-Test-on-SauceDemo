import { expect, test } from "@playwright/test"
import { getCredentials } from "../config/credentials"
import { LoginPage } from "../pages/LoginPage"

const CREDENTIALS = getCredentials()
const USERS = {
  standard: CREDENTIALS.username,
  lockedOut: "locked_out_user",
}
const INVALID_PASSWORD = "invalid_password"
const testSuite = "SauceDemo_login"
let loginPage: LoginPage

test.describe(testSuite, () => {
  test.beforeEach(async ({ page }) => {
    // Arrange
    loginPage = new LoginPage(page)
    await loginPage.goto()
  })

  test.afterEach(async ({ page }) => {
    await page.context().clearCookies()
  })

  test("Logs in with valid credentials", async ({ page }) => {
    // Act
    await loginPage.login(USERS.standard, CREDENTIALS.password)
    // Assert
    await expect(page).toHaveURL(/inventory\.html$/)
  })

  test("shows an error for an incorrect password", async ({ page }) => {
    // Act
    await loginPage.login(USERS.standard, INVALID_PASSWORD)
    // Assert
    await expect(loginPage.errorMessage).toHaveText(
      "Epic sadface: Username and password do not match any user in this service",
    )
  })

  test("shows an error when the username is missing", async ({ page }) => {
    // Act
    await loginPage.login("", CREDENTIALS.password)
    // Assert
    await expect(loginPage.errorMessage).toHaveText(
      "Epic sadface: Username is required",
    )
  })

  test("shows an error for a locked-out user", async ({ page }) => {
    // Act
    await loginPage.login(USERS.lockedOut, CREDENTIALS.password)
    // Assert
    await expect(loginPage.errorMessage).toHaveText(
      "Epic sadface: Sorry, this user has been locked out.",
    )
  })
})
