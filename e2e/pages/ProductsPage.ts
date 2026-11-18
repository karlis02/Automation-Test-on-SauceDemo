import { type Locator, type Page } from "@playwright/test"

export class ProductsPage {
  readonly page: Page
  readonly productNames: Locator

  constructor(page: Page) {
    this.page = page
    this.productNames = page.locator('[data-test="inventory-item-name"]')
  }

  async openProduct(productName: string): Promise<void> {
    await this.page
      .getByRole("button", { name: `View details for ${productName}` })
      .first()
      .click()
  }
}
