# Moxymind technical tasks

Three test-automation tasks for the Moxymind QA interview, each in its own folder
with its own README and `npm test`.

| Task | Folder | Stack |
| --- | --- | --- |
| 1. Frontend automation (saucedemo) | [`task1-frontend`](./task1-frontend) | Playwright + TypeScript, POM, fixtures |
| 2. API automation (reqres.in) | [`task2-api`](./task2-api) | Vitest + TypeScript, native fetch, Zod schemas, local mock |
| 3. Mobile automation (Android Calculator) | [`task3-mobile`](./task3-mobile) | WebdriverIO v8 + Appium v2 + Mocha, UIAutomator2 driver |

## Quick start

Each task is self-contained. Open the folder, install, run.

```bash
cd task1-frontend && npm install && npx playwright install chromium && npm test
cd ../task2-api    && npm install && npm test
cd ../task3-mobile && npm install && npm test     # needs Appium + emulator, see README
```

## Why three folders, not three repos

The brief asks for GitHub-published, runnable solutions. A single repo is easier
to clone and review than three. Each task still has an independent `package.json`
and its own README, so any one task can be lifted out and run standalone.

## Author

Juraj Kapusansky - juraj.kapusansky@gmail.com
