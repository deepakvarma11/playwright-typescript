# AGENTS.md

## Framework Architecture

This project uses Playwright with TypeScript for end-to-end testing. The
existing framework architecture is the source of truth; extend it rather than
redesigning it.

Playwright discovers tests under `e2e/`, as configured in
`playwright.config.ts`. Tests use page objects from `e2e/pages/` and the custom
fixtures exported by `e2e/fixtures/base.fixture.ts`.

## Directory Responsibilities

- `e2e/`: End-to-end test code and supporting framework code.
- `e2e/tests/`: Test specifications, grouped by feature or workflow.
- `e2e/pages/`: Page objects and reusable page interactions.
- `e2e/fixtures/`: Shared Playwright fixtures that construct page objects.
- `e2e/auth/`: Authentication setup that saves browser storage state for
  authenticated test projects.
- `e2e/frameworkConfig/`: Environment configuration read by the tests.
- `e2e/factories/`: Factories for generating test data.
- `e2e/models/`: TypeScript data contracts used by tests and factories.
- `e2e/testdata/`: Static test data.
- `e2e/utils/`: Shared helpers such as logging.
- `specs/`: Test plans and related specifications; this is not the configured
  Playwright test directory.
- `playwright/`, `playwright-report/`, and `test-results/`: Playwright
  authentication state and generated run artifacts. Do not treat generated
  output as source code.

## Test Generation Workflow

When adding or changing a test:

1. Understand the requested business scenario and expected outcomes.
2. Find a test in `e2e/tests/` or another relevant existing test that covers a
   similar workflow.
3. Inspect the relevant page objects, fixtures, and test-data helpers.
4. Explore the application with the available Playwright tooling when the
   behavior or locators are not established by existing code.
5. Add the test under `e2e/tests/` in the existing feature-oriented structure,
   following the project's naming and import conventions.
6. Reuse the custom fixtures and page-object methods; add methods only when
   needed and keep UI interactions in the appropriate page object.
7. Use meaningful assertions and appropriate test data. Keep credentials and
   environment-specific values in configuration, not test source.
8. Run the relevant test and inspect its result. Also run TypeScript or lint
   checks when available and relevant.

## Architectural Rules

- Do not create a separate standalone test framework.
- Do not duplicate an existing page object or helper unnecessarily.
- Do not create a fixture when an existing fixture is suitable.
- Do not invent or guess application locators; verify them against the
  application or reuse established page-object locators.
- Keep selectors and reusable UI interactions in page objects rather than
  repeating them in test specifications.
- Import `test` and `expect` from `e2e/fixtures/base.fixture.ts` when using the
  project's shared fixtures.
- Follow the existing authentication setup and Playwright project
  configuration; do not hardcode credentials or generated auth state.
- Do not replace the project's conventions with generic Playwright examples.
- Keep changes limited to the requested functionality.

## Configuration and Commands

The project reads `URL`, `LOGIN_USERNAME`, and `LOGIN_PASSWORD` from the
environment. `ENVIRONMENT` can select a `.env.<environment>` file; otherwise
the default `.env` file is loaded. Do not add secrets to source control.

Useful project scripts:

- `npm run test:headless`: Run the Playwright suite headlessly.
- `npm run test`: Run the Playwright suite headed.
- `npm run lint`: Run ESLint.
- `npm run format:check`: Check formatting with Prettier.

The Playwright configuration defines separate setup, Chromium, and login
projects. Authenticated Chromium tests depend on the setup project and reuse
the saved storage state.

## Completion Criteria

A test change is complete when:

- It follows the existing project structure and TypeScript conventions.
- It uses suitable existing fixtures, page objects, and test-data helpers.
- It contains meaningful assertions for the requested behavior.
- Relevant TypeScript checks and linting pass when configured and applicable.
- The new or changed test has been executed when the environment permits.
- Execution results and any unresolved issues are reported.
