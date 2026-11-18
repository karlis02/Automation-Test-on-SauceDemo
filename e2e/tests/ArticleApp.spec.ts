import { expect, test } from "@playwright/test"
import { getCredentials } from "../config/credentials"
import { ArticlePage } from "../pages/ArticlePage"
import { LoginPage } from "../pages/LoginPage"
import { ProductsPage } from "../pages/ProductsPage"
import PRODUCTS from "../data/products.json"

const testSuite = "SauceDemo_articles"
let loginPage: LoginPage
let articlePage: ArticlePage
let productsPage: ProductsPage

test.describe(testSuite, () => {
  test.beforeEach(async ({ page }) => {
    // Arrange
    const credentials = getCredentials()
    loginPage = new LoginPage(page)
    articlePage = new ArticlePage(page)
    productsPage = new ProductsPage(page)
    // Act
    await loginPage.goto()
    await loginPage.login(
      credentials.username,
      credentials.password,
    )
    // Assert
    await expect(articlePage.page).toHaveURL(/inventory\.html$/)
  })

  test.afterEach(async ({ page }) => {
    await page.context().clearCookies()
  })

  for (const product of PRODUCTS) {
    test(`shows details for ${product.name}`, async () => {
      // Act
      await productsPage.openProduct(product.name)
      // Assert
      await expect(articlePage.page).toHaveURL(/inventory-item\.html/)
      await expect(articlePage.productName).toHaveText(product.name)
      await expect(articlePage.productDescription).toHaveText(
        product.description,
      )
      await expect(articlePage.productPrice).toHaveText(product.price)
      await expect(articlePage.productImage(product.name)).toBeVisible()
    })
  }

  test("adds the product to the cart from its detail page", async () => {
    // Arrange
    await productsPage.openProduct(PRODUCTS[0].name)
    // Act
    await articlePage.addToCart()
    // Assert
    await expect(articlePage.removeButton).toBeVisible()
    await expect(articlePage.cartBadge).toHaveText("1")
  })

  test("removes the product from the cart on its detail page", async () => {
    // Arrange
    await productsPage.openProduct(PRODUCTS[0].name)
    await articlePage.addToCart()
    // Act
    await articlePage.removeFromCart()
    // Assert
    await expect(articlePage.addToCartButton).toBeVisible()
    await expect(articlePage.cartBadge).toHaveCount(0)
  })

  test("returns to the products page", async () => {
    // Arrange
    await productsPage.openProduct(PRODUCTS[0].name)
    // Act
    await articlePage.backToProducts()
    // Assert
    await expect(articlePage.page).toHaveURL(/inventory\.html$/)
    await expect(productsPage.productNames).toHaveCount(PRODUCTS.length)
  })
})
