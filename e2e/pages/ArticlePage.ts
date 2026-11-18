import { type Locator, type Page } from "@playwright/test"

export class ArticlePage {
  readonly page: Page
  readonly productName: Locator
  readonly productDescription: Locator
  readonly productPrice: Locator
  readonly addToCartButton: Locator
  readonly removeButton: Locator
  readonly cartBadge: Locator
  readonly backToProductsButton: Locator

  constructor(page: Page) {
    this.page = page
    this.productName = page.locator(".inventory_details_name")
    this.productDescription = page.locator(".inventory_details_desc")
    this.productPrice = page.locator(".inventory_details_price")
    this.addToCartButton = page.locator('[data-test="add-to-cart"]')
    this.removeButton = page.locator('[data-test="remove"]')
    this.cartBadge = page.locator(".shopping_cart_badge")
    this.backToProductsButton = page.getByRole("button", {
      name: "Back to products",
    })
  }

  productImage(productName: string): Locator {
    return this.page.getByRole("img", { name: productName })
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click()
  }

  async removeFromCart(): Promise<void> {
    await this.removeButton.click()
  }

  async backToProducts(): Promise<void> {
    await this.backToProductsButton.click()
  }
}
