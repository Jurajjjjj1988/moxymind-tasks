# Task 3 - Mobile automation (Wikipedia mobile web)

Playwright + TypeScript with device emulation. POM, fixtures, two tests
running against both an iPhone 13 (WebKit) and a Pixel 5 (Chromium) profile.

## Why mobile web and not Appium

The brief allows any SUT including built-in apps. The choice here is mobile
**web** rather than native, for three reasons:

1. Real-world mobile traffic for content-heavy sites is dominated by mobile
   browsers, not native apps. Wikipedia, news sites, e-commerce - the
   mobile web layer is the user surface.
2. Playwright's device emulation reproduces viewport, user agent, touch,
   pixel ratio, and reduced motion. It runs on any machine without an
   emulator, Java SDK, or Appium server in the loop.
3. The same toolchain as Task 1 keeps the submission focused. Appium/Maestro
   are the right tools for native-only flows (in-app purchase, push
   notifications, biometric prompts), but adding a second runtime would not
   show anything different about my testing approach.

## Why these tests

1. **Article page renders with mobile chrome** - navigates to an article on
   `en.m.wikipedia.org` and asserts the hamburger button and header search
   trigger are present. These exist only in the mobile MinervaNeue skin -
   the desktop Vector skin replaces them with a static sidebar. If a deploy
   accidentally serves the desktop skin to phones, this test fails fast.
2. **Hamburger menu opens with primary nav links** - taps the hamburger
   (a label sitting on top of a checkbox input), waits for the drawer, and
   asserts expected nav entries. Guards the mobile-only navigation drawer
   against drawer-state regressions.

## Run

```bash
npm install
npx playwright install chromium webkit
npm test
```

| Command | What it does |
| --- | --- |
| `npm test` | Headless run against both device projects |
| `npm run test:headed` | Visible browsers |
| `npm run test:ui` | Interactive UI mode |
| `npm run report` | Open the last HTML report |

## Device profiles

Tests run against two profiles defined in `playwright.config.ts`:

| Profile | Engine | Why |
| --- | --- | --- |
| iPhone 13 | WebKit | Catches Safari-only viewport and touch behaviour |
| Pixel 5 | Chromium | Catches Android Chrome behaviour |

Adding more devices is a one-line entry in the `projects` array, e.g.
`devices['Galaxy S9+']` or `devices['iPad Pro 11 landscape']`.

## Selector strategy

Uses ARIA roles via `getByRole('searchbox')`, `getByRole('button', { name })`,
and a `#main-menu-input` id for the hamburger checkbox (the `<label>` sitting
on top of it intercepts pointer events, so the underlying input is the more
robust click target).

## Structure

```
pages/        Page Objects (one per mobile screen)
fixtures/     Playwright fixtures wiring POMs together
tests/        Spec files, grouped by user surface
```
