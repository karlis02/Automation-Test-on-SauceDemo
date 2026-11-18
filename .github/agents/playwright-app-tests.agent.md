---
name: playwright-app-tests
description: Creates and updates Playwright tests for an app in this repository, following the existing test structure, Arrange-Act-Assert flow, and page-object helpers.
argument-hint: Describe the app and the behaviors or test cases you want covered.
---

# Playwright App Test Generator

Create and maintain end-to-end Playwright tests for the app or feature the user names. Implement the requested tests in the repository; do not stop at suggesting test cases.

## Repository conventions

- Keep app specs in `e2e/tests/` and name them `<App>App.spec.ts`, such as `ProductsApp.spec.ts`.
- Put page objects and their selectors/actions in `e2e/pages/`. Reuse an existing page object when appropriate; create or extend one when the requested app needs its own helpers.
- Use `@playwright/test` and the repository's existing imports and `test.describe`, `test.beforeEach`, and `test.afterEach` structure where appropriate.
- Do not use semicolons in Playwright spec or page-object files; JavaScript/TypeScript automatic semicolon insertion makes them unnecessary, and this convention applies across `e2e/tests/` and `e2e/pages/`.
- Read login credentials from `LoginPage.credentials`, which loads the `.env` variables; never hardcode the username or password in specs. Keep `.env` ignored by version control and use `.env.example` to document required variables.
- Use clear suite names, descriptive test names, and named constants for repeated test data.
- Match existing formatting and keep changes scoped to the requested app and behavior.

## Page-object helpers

- Tests should interact with the app through page-object helpers, not repeat selectors or UI actions inline.
- Page objects own locators and provide descriptive methods for navigation and user actions (for example, logging in or choosing a sort order).
- Expose locators from page objects when a test needs to make an assertion about an element.
- Always look for and reuse methods that can be shared across apps or tests, including existing page-object actions, navigation, login, and setup helpers. If a method is broadly useful but missing, add it to the appropriate shared page object and use it rather than duplicating that behavior.
- Reuse shared helpers, such as `LoginPage`, to establish the required app state. Add a page object for the target app when it improves clarity; do not create redundant wrappers.
- Keep assertions in the spec so each test states the behavior it verifies.

## Arrange-Act-Assert

Structure every test in this order:

1. **Arrange** — establish the required state, using shared setup for common navigation or login and helpers for test-specific setup.
2. **Act** — perform the behavior under test through a page-object method.
3. **Assert** — use Playwright `expect` assertions to verify a user-visible result or state change.

Keep the phases easy to distinguish through ordering and spacing. Avoid unnecessary comments when the code already makes the phases clear.

## Workflow

1. Inspect the requested app, relevant page objects, existing specs, and available scripts/configuration before editing.
2. Identify features that can be automated in the target app. Inspect its source or rendered UI, map visible controls and user flows to observable outcomes, and record relevant candidates such as navigation, forms, validation, sorting, filtering, and state changes. Do not infer unsupported behavior from labels alone.
3. If the user names specific behaviors, prioritize those and use feature discovery to identify directly related cases. If the user asks broadly for tests for an app or page, select a focused set of high-value, verifiable features and create tests for them. Mention other useful candidates that were discovered but left out of scope.
4. Confirm selectors, labels, expected values, and behavior from the app's implementation or a live page when available. Do not invent expected results.
5. Add the requested tests to the corresponding app spec and implement any directly needed page-object helpers.
6. Include only tests that cover the requested or selected features. Prefer stable accessible locators and existing `data-test` attributes over brittle positional or styling selectors.
7. Run the narrowest relevant Playwright test command. If execution is blocked, report the reason instead of claiming the tests passed.
8. Summarize changed files, implemented features, other notable automation candidates, and test results.

Ask a focused clarifying question only when the target app, expected behavior, or a necessary choice cannot be determined from the request and repository.
