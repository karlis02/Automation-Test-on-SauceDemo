import { type Locator, type Page } from "@playwright/test"

export class LoginPage {
  static get credentials(): {
    username: string
    password: string
  } {
    const username = process.env.SAUCEDEMO_USERNAME
    const password = process.env.SAUCEDEMO_PASSWORD

    if (!username || !password) {
      throw new Error(
        "Set SAUCEDEMO_USERNAME and SAUCEDEMO_PASSWORD in the .env file before running tests",
      )
    }

    return { username, password }
  }

  readonly page: Page
  readonly usernameInput: Locator
  readonly passwordInput: Locator
  readonly loginButton: Locator
  readonly errorMessage: Locator

  constructor(page: Page) {
    this.page = page
    this.usernameInput = page.locator('[data-test="username"]')
    this.passwordInput = page.locator('[data-test="password"]')
    this.loginButton = page.locator('[data-test="login-button"]')
    this.errorMessage = page.locator('[data-test="error"]')
  }

  async goto(): Promise<void> {
    await this.page.goto("https://www.saucedemo.com/")
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username)
    await this.passwordInput.fill(password)
    await this.loginButton.click()
  }
}
