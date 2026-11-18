import { expect, test } from "@playwright/test"
import PRODUCTS from "../data/products.json"
import { LoginPage } from "../pages/LoginPage"

const PRODUCTS_BY_NAME = [...PRODUCTS].sort((first, second) =>
  first.name.localeCompare(second.name),
)
const SORT_CASES = [
  {
    label: "Name (A to Z)",
    productNames: PRODUCTS_BY_NAME.map((product) => product.name),
  },
  {
    label: "Name (Z to A)",
    productNames: [...PRODUCTS_BY_NAME]
      .reverse()
      .map((product) => product.name),
  },
  {
    label: "Price (low to high)",
    productNames: [...PRODUCTS]
      .sort(
        (first, second) =>
          Number(first.price.slice(1)) - Number(second.price.slice(1)) ||
          first.name.localeCompare(second.name),
      )
      .map((product) => product.name),
  },
  {
    label: "Price (high to low)",
    productNames: [...PRODUCTS]
      .sort(
        (first, second) =>
          Number(second.price.slice(1)) - Number(first.price.slice(1)) ||
          first.name.localeCompare(second.name),
      )
      .map((product) => product.name),
  },
]
const testSuite = "SauceDemo_products"
let loginPage: LoginPage

test.describe(testSuite, () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login(
      LoginPage.credentials.username,
      LoginPage.credentials.password,
    )
    await expect(page).toHaveURL(/inventory\.html$/)
  })

  test.afterEach(async ({ page }) => {
    await page.context().clearCookies()
  })

  test("shows all products with their prices", async ({ page }) => {
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText(
      PRODUCTS.map((product) => product.name),
    )
    await expect(page.locator('[data-test="inventory-item-price"]')).toHaveText(
      PRODUCTS.map((product) => product.price),
    )
  })

  test("changes a product label color on hover", async ({ page }) => {
    const productLabel = page
      .locator('[data-test="inventory-item-name"]')
      .first()
    const originalColor = await productLabel.evaluate(
      (element) => getComputedStyle(element).color,
    )

    await productLabel.hover()

    await expect(productLabel).not.toHaveCSS("color", originalColor)
  })

  for (const sortCase of SORT_CASES) {
    test(`sorts products by ${sortCase.label}`, async ({ page }) => {
      await page
        .locator('[data-test="product-sort-container"]')
        .selectOption({ label: sortCase.label })

      await expect(
        page.locator('[data-test="inventory-item-name"]'),
      ).toHaveText(sortCase.productNames)
    })
  }
})
