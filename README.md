# Moxymind technical tasks

Three test-automation tasks for the Moxymind QA interview, each in its own folder
with its own README and `npm test`.

| Task | Folder | Stack |
| --- | --- | --- |
| 1. Frontend automation (saucedemo) | [`task1-frontend`](./task1-frontend) | Playwright + TypeScript, POM, fixtures |
| 2. API automation (reqres.in) | [`task2-api`](./task2-api) | Vitest + TypeScript, native fetch, Zod schemas, local mock |
| 3. Mobile automation (Wikipedia mobile web) | [`task3-mobile`](./task3-mobile) | Playwright device emulation, iPhone 13 (WebKit) + Pixel 5 (Chromium) |

## Quick start

Each task is self-contained.

```bash
cd task1-frontend && npm install && npx playwright install chromium && npm test
cd ../task2-api    && npm install && npm test
cd ../task3-mobile && npm install && npx playwright install chromium webkit && npm test
```

## A note on Task 3

The brief allows any SUT, including built-in apps like Calculator. The chosen
target is the mobile web layer of Wikipedia rather than a native Android app
with Appium - the per-task README explains the tradeoff. For native-only
flows (in-app purchase, push notifications, biometric prompts) the right tool
is Appium or Maestro; the submission would not show anything different about
my testing approach by spinning up a second runtime.

## Author

Juraj Kapusansky - juraj.kapusansky@gmail.com
