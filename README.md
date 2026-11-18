# SauceDemo Playwright Tests

End-to-end tests for the [SauceDemo](https://www.saucedemo.com/) login, product listing, and product detail pages, using Playwright Test and TypeScript.

## Requirements

- Node.js and npm

## Setup

Install the project dependencies:

```bash
npm install
```

Install the Chromium browser used by Playwright:

```bash
npx playwright install chromium
```

Create a local `.env` file from the example. In PowerShell:

```powershell
Copy-Item .env.example .env
```

Set the SauceDemo login values in `.env`:

```dotenv
SAUCEDEMO_USERNAME=standard_user
SAUCEDEMO_PASSWORD=secret_sauce
```

The local `.env` file is ignored by Git. Playwright loads it through `dotenv` in `playwright.config.ts`, and `LoginPage.credentials` validates and exposes the values to the tests.

## Running tests

Run the full suite:

```bash
npx playwright test
```

Run a specific app suite:

```bash
npx playwright test e2e/tests/ShellApp.spec.ts
npx playwright test e2e/tests/ProductsApp.spec.ts
npx playwright test e2e/tests/ArticleApp.spec.ts
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

## Coverage

- **Login** (`ShellApp.spec.ts`): valid credentials, incorrect password, missing username, and locked-out user.
- **Products** (`ProductsApp.spec.ts`): product names and prices, product-name hover color, and all four sort options.
- **Product details** (`ArticleApp.spec.ts`): detail information for all products, adding and removing a product from the cart, and returning to the product listing.

## Project structure

```text
e2e/
  data/
    products.json       Shared product details used by the tests
  pages/
    ArticlePage.ts      Product detail page locators and actions
    LoginPage.ts        Login page locators, actions, and credentials
    ProductsPage.ts     Product listing actions
  tests/
    ArticleApp.spec.ts
    ProductsApp.spec.ts
    ShellApp.spec.ts
playwright.config.ts
```

The specs follow Arrange-Act-Assert and use page-object helpers for UI actions. Product names, descriptions, and prices are kept in `e2e/data/products.json` and reused by the relevant suites.
