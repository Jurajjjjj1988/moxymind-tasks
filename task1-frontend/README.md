# Task 1 - Frontend automation (saucedemo)

Playwright + TS. Four tests on https://www.saucedemo.com covering login
(positive and negative), cart, and a full end-to-end checkout. POMs are
wired through a Playwright fixture so a test can just request
`inventoryPage` or `cartPage` and get a ready instance.

## Run

```bash
npm install
npx playwright install chromium
npm test
```

`npm run test:headed` if you want to see it, `npm run test:ui` for the
picker, `npm run report` after a run to open the HTML report.

## The four tests, and why

The login positive test is the gate for everything else. If `standard_user`
can't log in, the whole funnel is dead, so it runs first in CI and fails
loud.

The negative login (`locked_out_user`) guards the lockout message. It's
boring to write but the day it regresses, blocked accounts walk straight
in - that one tends to be the post-incident retro everyone remembers.

Cart and checkout I treated as one logical pair. Cart proves "can the user
collect items", checkout proves "can the user actually finish buying". I
keep them in separate spec files because they fail for very different
reasons (cart = state management, checkout = form + routing), but
conceptually they are the same answer: money flows.

What I considered and skipped: `problem_user` (broken images, would be a
nice visual-regression slot) and `performance_glitch_user` (deliberately
slow login, natural fit for a flake/perf budget test). Both are worth
having in a real suite. Four tests felt like the right size for the brief.

## Selectors

saucedemo exposes a `data-test` attribute on everything useful, so all
locators go through `page.getByTestId(...)`. Playwright defaults to
`data-testid`, hence the `testIdAttribute: 'data-test'` override in the
config. CSS classes and `nth()` are avoided - they break on every markup
change.

## Layout

```
pages/        one POM per screen
fixtures/     Playwright fixture extending base test with the POMs
tests/        one spec per feature
```
