import { expect, test } from "@playwright/test"
import { getCredentials } from "../config/credentials"
import PRODUCTS from "../data/products.json"
import SORT_CASES from "../data/productSort.json"
import { LoginPage } from "../pages/LoginPage"
import { ProductsPage } from "../pages/ProductsPage"

const testSuite = "SauceDemo_products"
let loginPage: LoginPage
let productsPage: ProductsPage

test.describe(testSuite, () => {
  test.beforeEach(async ({ page }) => {
    // Arrange
    const credentials = getCredentials()
    loginPage = new LoginPage(page)
    productsPage = new ProductsPage(page)
    // Act
    await loginPage.goto()
    await loginPage.login(
      credentials.username,
      credentials.password,
    )
    // Assert
    await expect(page).toHaveURL(/inventory\.html$/)
  })

  test.afterEach(async ({ page }) => {
    await page.context().clearCookies()
  })

  test("shows all products with their prices", async () => {
    // Assert
    await expect(productsPage.productNames).toHaveText(
      PRODUCTS.map((product) => product.name),
    )
    await expect(productsPage.productPrices).toHaveText(
      PRODUCTS.map((product) => product.price),
    )
  })

  test("changes a product label color on hover", async () => {
    // Arrange
    const originalColor = await productsPage.firstProductLabel.evaluate(
      (element) => getComputedStyle(element).color,
    )
    // Act
    await productsPage.firstProductLabel.hover()
    // Assert
    await expect(productsPage.firstProductLabel).not.toHaveCSS(
      "color",
      originalColor,
    )
  })

  for (const sortCase of SORT_CASES) {
    test(`sorts products by ${sortCase.label}`, async () => {
      // Act
      await productsPage.sortProducts(sortCase.label)

      // Assert
      await expect(productsPage.productNames).toHaveText(sortCase.productNames)
    })
  }
})
