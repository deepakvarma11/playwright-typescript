# Playwright TypeScript Framework Instructions

## 1. Project Overview

This repository is an existing Playwright Test and TypeScript end-to-end
automation framework. Follow its architecture and conventions when generating
or modifying tests. Extend the framework; do not replace or redesign it.

Playwright's configured test directory is `e2e/`. Feature test specifications
are in `e2e/tests/`, and the project uses page objects and shared fixtures.

## 2. Before Writing Code

Before creating or changing a test:

1. Inspect the relevant project structure and read `package.json` and
   `playwright.config.ts`.
2. Find and inspect existing tests for a similar scenario.
3. Identify relevant page objects, fixtures, test data, and helpers.
4. Determine the correct existing location and naming convention for the test.
5. Reuse existing implementations wherever possible.
6. Explore the application with available Playwright tooling when the
   application behavior or locators are not already established.

Do not assume directory names or invent project conventions.

## 3. Test Files

- Use Playwright Test with TypeScript.
- Put feature scenarios under `e2e/tests/`, grouped by feature as the existing
  `login/` and `addEmployee/` directories are.
- Follow existing spec naming conventions, such as `login.spec.ts`.
- Use descriptive test names and `test.describe` when it improves organization.
- Keep scenarios independent and deterministic; do not depend on test execution
  order.
- Check existing tests before adding a scenario to avoid duplication.
- `e2e/seed.spec.ts` and `e2e/auth/auth.setup.ts` have existing project roles;
  do not move or repurpose them without a requirement.

## 4. Page Objects

The framework uses page objects in `e2e/pages/`. Reuse the existing classes,
including `BasePage`, `LoginPage`, `HomePage`, and `PimPage`.

- Keep reusable page interactions and selectors in the appropriate page object
  rather than duplicating them in spec files.
- Add a method to an existing page object when it is the right owner of the
  interaction.
- Create another page object only when justified by the application structure
  and existing conventions.
- Do not duplicate locators or page-object behavior unnecessarily.

## 5. Locators and Assertions

- Use locators verified against the actual application or established by
  existing page objects. Do not guess selectors.
- Prefer accessible locators such as `getByRole()` and `getByLabel()` when
  appropriate and consistent with the application.
- Use CSS or XPath only when needed and verified.
- Prefer Playwright auto-waiting and web-first assertions over fixed waits.
- Use Playwright `expect` assertions to check meaningful outcomes, not merely
  that an action completed.
- Avoid arbitrary timeouts and fragile selectors.

## 6. Fixtures and Authentication

Tests should use the shared fixtures exported by
`e2e/fixtures/base.fixture.ts` when page-object fixtures are needed. Reuse its
`loginPage`, `homePage`, and `pimPage` fixtures rather than setting up duplicate
pages or fixtures.

Follow the existing authentication strategy in `playwright.config.ts` and
`e2e/auth/auth.setup.ts`: the setup project saves storage state to
`playwright/.auth/user.json`, which authenticated Chromium tests reuse. Do not
bypass authentication requirements or hardcode generated browser state.

## 7. Test Data and Environment

- Reuse `e2e/factories/`, `e2e/models/`, and `e2e/testdata/` where suitable.
- Keep tests independent of mutable shared data and execution order.
- Environment configuration is read through `e2e/frameworkConfig/env.ts`.
  Runtime values include `URL`, `LOGIN_USERNAME`, and `LOGIN_PASSWORD`.
- Do not hardcode credentials or commit secrets. `playwright.config.ts` loads
  `.env` by default or `.env.<ENVIRONMENT>` when `ENVIRONMENT` is set.

## 8. Playwright MCP Exploration

When Playwright MCP or other browser tooling is available and needed:

1. Explore the requested application workflow and verify relevant pages,
   elements, and interactions.
2. Gather enough information to implement the requested scenario.
3. Inspect this repository's tests, page objects, fixtures, and helpers.
4. Translate the observed workflow into the project's established structure.
5. Do not copy a standalone generated browser script into the repository as a
   finished test without adapting it to the framework.

Browser exploration and test implementation are separate steps.

## 9. Code Quality

- Follow the existing TypeScript and formatting conventions.
- Use `async`/`await` consistently.
- Avoid `any`, duplicate code, and unnecessary abstractions.
- Do not install dependencies without a clear need.
- Do not change `playwright.config.ts` unless the requested behavior requires
  it.
- Keep changes scoped to the requested functionality.

## 10. Validation

After adding or changing a test:

1. Check imports and TypeScript types.
2. Confirm suitable existing fixtures, page objects, and data helpers are used.
3. Check that the scenario does not duplicate an existing test.
4. Run the relevant test using the project's Playwright configuration when the
   environment permits.
5. Run applicable checks, such as `npm run lint` or
   `npm run format:check`.
6. Fix failures caused by the change where possible and report tests that could
   not be executed.

Useful scripts from `package.json`:

- `npm run test:headless`: Run Playwright tests headlessly.
- `npm run test`: Run Playwright tests headed.
- `npm run lint`: Run ESLint.
- `npm run format:check`: Check formatting with Prettier.

## 11. Final Response

When test code is generated or changed, report:

- Files created or modified.
- Scenarios implemented and existing components reused.
- Commands executed and their results.
- Any assumptions or unresolved issues.
