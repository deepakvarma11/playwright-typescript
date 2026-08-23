# Project Architecture

This repository is a Playwright + TypeScript end-to-end test suite. It follows a page-object style design, uses custom fixtures for shared test setup, and keeps environment-specific values outside of source control.

## High-Level Structure

- `playwright.config.ts` configures test execution, reporters, browser settings, and project-specific test selection.
- `e2e/` contains all end-to-end test code.
- `e2e/pages/` holds page objects and shared page helpers.
- `e2e/fixtures/` defines custom Playwright fixtures.
- `e2e/auth/` contains the authentication bootstrap test that saves logged-in browser state.
- `e2e/frameworkConfig/` centralizes environment variable access.
- `e2e/factories/` generates test data objects.
- `e2e/models/` defines TypeScript interfaces used by the tests.
- `e2e/testdata/` stores static test data.
- `e2e/utils/` contains lightweight utilities such as logging.

## Folder Structure

```text
playwright-typescript/
├── ARCHITECTURE.md
├── eslint.config.mts
├── package.json
├── playwright.config.ts
├── tsconfig.json
└── e2e/
    ├── auth/
    │   └── auth.setup.ts
    ├── factories/
    │   └── EmployeeFactory.ts
    ├── fixtures/
    │   └── base.fixture.ts
    ├── frameworkConfig/
    │   └── env.ts
    ├── models/
    │   └── Employee.ts
    ├── pages/
    │   ├── BasePage.ts
    │   ├── HomePage.ts
    │   ├── LoginPage.ts
    │   └── PimPage.ts
    ├── testdata/
    │   └── employee.ts
    ├── tests/
    │   ├── addEmployee/
    │   │   └── addEmployee.spec.ts
    │   └── login/
    │       └── login.spec.ts
    └── utils/
        └── Logger.ts
```

## Test Architecture

### Page Object Model

The suite uses a simple page-object layer:

- `BasePage` contains reusable browser actions and Playwright assertions.
- `LoginPage` wraps the login screen.
- `HomePage` wraps the dashboard/home navigation.
- `PimPage` wraps employee search, add, and delete actions.

This keeps selectors and UI behavior in one place and makes tests easier to read.

### Custom Fixtures

`e2e/fixtures/base.fixture.ts` extends Playwright's base `test` object with page-object fixtures:

- `loginPage`
- `homePage`
- `pimPage`

Tests import from this file instead of directly importing `@playwright/test`, which gives them consistent access to the wrapped pages.

### Authentication Flow

The repo uses a two-step auth pattern:

1. `e2e/auth/auth.setup.ts` logs in with the configured credentials.
2. It saves browser storage state to `playwright/.auth/user.json`.

The main Chromium project in `playwright.config.ts` depends on the setup project and reuses that saved state, so authenticated tests do not need to log in every time.

## Secrets and Environment Management

Secrets are not hardcoded in the test files.

### Environment Variables

`e2e/frameworkConfig/env.ts` reads the following values from `process.env`:

- `URL`
- `LOGIN_USERNAME`
- `LOGIN_PASSWORD`

### dotenv Loading

`playwright.config.ts` loads environment variables with `dotenv`:

- If `ENVIRONMENT` is set, it loads `.env.<ENVIRONMENT>` from the project root.
- Otherwise it falls back to the default `.env` file.

That allows local, QA, staging, or other environment-specific configuration without changing code.

### Secret Storage Rules

- `.env`, `.env.local`, and `.env.*.local` are ignored by git in `.gitignore`.
- The code expects a root `.env` file or environment-specific `.env.<name>` file to be present at runtime.
- Auth state is written to `playwright/.auth/user.json`, which should be treated as generated runtime data rather than a source file.

## Test Data Strategy

- `e2e/factories/EmployeeFactory.ts` creates randomized employee data using `@faker-js/faker`.
- `e2e/testdata/employee.ts` stores a static employee fixture for fixed-data scenarios.
- `e2e/models/Employee.ts` defines the TypeScript contract shared by factories and tests.

This gives the suite both repeatable test data and randomized data where uniqueness matters.

## Logging and Diagnostics

`e2e/utils/Logger.ts` provides a small console logger with `info`, `success`, `warn`, and `error` helpers. The page objects use it for lightweight trace output during test runs.

## Runtime and Tooling

- Playwright version: `1.61.1`
- TypeScript uses `NodeNext` module resolution with strict mode enabled.
- ESLint is configured through `eslint.config.mts`.
- Common scripts are defined in `package.json`:
  - `npm run test:headless`
  - `npm run test`
  - `npm run codegen`
  - `npm run lint`
  - `npm run lint:fix`
  - `npm run format:check`
  - `npm run format`

## Notes

- The suite is currently oriented around an application with login, dashboard, and PIM employee management flows.
- `playwright.config.ts` is set up for Chromium-focused execution by default, with Firefox, WebKit, and mobile projects left commented out.
- Screenshots, traces, and videos are configured to help diagnose failures.
