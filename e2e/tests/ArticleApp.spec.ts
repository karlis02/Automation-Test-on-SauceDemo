import { expect, test } from "@playwright/test"
import { ArticlePage } from "../pages/ArticlePage"
import { LoginPage } from "../pages/LoginPage"
import { ProductsPage } from "../pages/ProductsPage"
import PRODUCTS from "../data/products.json"

const testSuite = "SauceDemo_articles"

test.describe(testSuite, () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page)
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

  for (const product of PRODUCTS) {
    test(`shows details for ${product.name}`, async ({ page }) => {
      const productsPage = new ProductsPage(page)
      const articlePage = new ArticlePage(page)

      await productsPage.openProduct(product.name)

      await expect(page).toHaveURL(/inventory-item\.html/)
      await expect(articlePage.productName).toHaveText(product.name)
      await expect(articlePage.productDescription).toHaveText(
        product.description,
      )
      await expect(articlePage.productPrice).toHaveText(product.price)
      await expect(articlePage.productImage(product.name)).toBeVisible()
    })
  }

  test("adds the product to the cart from its detail page", async ({
    page,
  }) => {
    const productsPage = new ProductsPage(page)
    const articlePage = new ArticlePage(page)

    await productsPage.openProduct(PRODUCTS[0].name)
    await articlePage.addToCart()

    await expect(articlePage.removeButton).toBeVisible()
    await expect(articlePage.cartBadge).toHaveText("1")
  })

  test("removes the product from the cart on its detail page", async ({
    page,
  }) => {
    const productsPage = new ProductsPage(page)
    const articlePage = new ArticlePage(page)

    await productsPage.openProduct(PRODUCTS[0].name)
    await articlePage.addToCart()
    await articlePage.removeFromCart()

    await expect(articlePage.addToCartButton).toBeVisible()
    await expect(articlePage.cartBadge).toHaveCount(0)
  })

  test("returns to the products page", async ({ page }) => {
    const productsPage = new ProductsPage(page)
    const articlePage = new ArticlePage(page)

    await productsPage.openProduct(PRODUCTS[0].name)
    await articlePage.backToProducts()

    await expect(page).toHaveURL(/inventory\.html$/)
    await expect(productsPage.productNames).toHaveCount(PRODUCTS.length)
  })
})
