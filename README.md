# SauceDemo Playwright Tests

This repository contains Playwright end-to-end tests for [SauceDemo](https://www.saucedemo.com/).

The tests cover login, inventory, product sorting, product details, and cart state. They use page objects for UI interactions and follow the Arrange-Act-Assert pattern.

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

The local `.env` file is ignored by Git. Playwright loads it through `dotenv` in `playwright.config.ts`; `e2e/config/credentials.ts` validates and exposes the values to the tests.

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
.github/
  agents/
    playwright-app-tests.agent.md  Custom Playwright test agent
e2e/
  config/
    credentials.ts    Loads and validates SauceDemo test credentials
  data/
    products.json       Product details used by the tests
    productSort.json    Expected product order for each sort option
  pages/
    ArticlePage.ts      Product detail page locators and actions
    LoginPage.ts        Login page locators and actions
    ProductsPage.ts     Product listing locators and actions
  tests/
    ArticleApp.spec.ts
    ProductsApp.spec.ts
    ShellApp.spec.ts
playwright.config.ts
```

Product names, descriptions, and prices are stored in `e2e/data/products.json`; expected sorting results are stored in `e2e/data/productSort.json`.

The **Playwright App Test Generator** agent (`.github/agents/playwright-app-tests.agent.md`) helps create and maintain end-to-end tests using this repository's page-object, Arrange-Act-Assert, and validation conventions.
