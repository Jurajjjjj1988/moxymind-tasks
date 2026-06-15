# Moxymind technical tasks

Three test-automation pieces for the Moxymind interview. Each task lives in
its own folder with its own README and `npm test`.

- **task1-frontend** - Playwright + TS, saucedemo, 4 tests (login pos/neg, cart, end-to-end checkout)
- **task2-api** - Vitest + Zod, reqres.in. Six tests including the bonuses; runs against a bundled local mock by default because reqres closed the free tier in late 2024 (details in `task2-api/README.md`)
- **task3-mobile** - Playwright device emulation, mobile web layer of Wikipedia, 2 tests x 2 device profiles (iPhone 13 WebKit + Pixel 5 Chromium)

## Run

```bash
cd task1-frontend && npm i && npx playwright install chromium && npm test
cd ../task2-api    && npm i && npm test
cd ../task3-mobile && npm i && npx playwright install chromium webkit && npm test
```

Each task is self-contained, nothing to install at the repo root.

## Notes on the choices

**Task 2 mock server.** The brief assumes a working live reqres.in, but the
service has required a paid API key since late 2024. To keep `npm test`
working out of the box I shipped a small Node http mock that returns the
exact shapes from the PDF. Live mode is wired through `REQRES_BASE_URL` and
`REQRES_API_KEY` env vars.

**Task 3 mobile web instead of native.** The brief allows any SUT, so Appium
against the Android Calculator was an option. I picked mobile web via
Playwright device emulation because (a) it shares the toolchain with Task 1
so the submission stays focused on one mental model, (b) most real-world
mobile traffic for content sites flows through mobile browsers rather than
native apps, (c) device emulation runs on any laptop without an Android SDK
or emulator. For native-only flows (in-app purchase, biometrics) I would
reach for Maestro or Appium - this submission would not show anything
additional by spinning up a second runtime.

---

Juraj Kapusansky, juraj.kapusansky@gmail.com
