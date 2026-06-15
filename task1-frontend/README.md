# Task 1 - Frontend automation (saucedemo)

Playwright + TypeScript, Page Object Model, fixtures.
Four tests covering the main user journeys on https://www.saucedemo.com.

## Why these tests

1. **Login - standard_user** - the gate to every other flow. Most hit code path on the site.
2. **Login - locked_out_user** - negative auth path. If it regresses, blocked accounts get back in.
3. **Add to cart** - core e-commerce primitive. No cart, no revenue.
4. **End-to-end checkout** - smoke test for the full purchase funnel.

## Run

```bash
npm install
npx playwright install chromium
npm test
```

Other commands:

| Command | What it does |
| --- | --- |
| `npm test` | Headless run, list + HTML reporter |
| `npm run test:headed` | Visible browser |
| `npm run test:ui` | Interactive UI mode |
| `npm run report` | Open the last HTML report |

## Structure

```
pages/        Page Objects (one file per page)
fixtures/     Playwright fixtures wiring the POMs together
tests/        Spec files, grouped by feature
```

## Selector strategy

Uses `data-test` attributes via `page.getByTestId(...)`. Selectors that follow the
visible DOM (CSS classes, `nth()`, deep paths) are avoided - they break on every
small markup change.
