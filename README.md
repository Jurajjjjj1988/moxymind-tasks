# Moxymind tasks

3 small test projects i n 3 folders. Each one installs and runs on its own.

`task1-frontend`

Saucedemo with Playwright (login, cart, full checkout).

`task2-api`

Reqres-shaped API with Vitest with local mock.

`task3-mobile`

Mobile Wikipedia on iPhone 13 + Pixel 5 emulation.





To run everything from a fresh clone:

```bash
cd task1-frontend && npm i && npx playwright install chromium && npm test
cd ../task2-api    && npm i && npm test
cd ../task3-mobile && npm i && npx playwright install chromium webkit && npm test
```

Juraj Kapusansky, juraj.kapusansky@gmail.com
