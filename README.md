# Moxymind tasks

3 small test projects in 3 folders. Each one installs and runs on its own.

`task1-frontend`

Saucedemo with Playwright (login, cart, full checkout with an order-total check).

`task2-api`

Real reqres.in API with Vitest. Keys in `.env` (gitignored).

`task3-mobile`

Mobile Wikipedia on iPhone 13 + Galaxy S24 emulation.

To run from a fresh clone:

```bash
cd task1-frontend && npm i && npx playwright install chromium && npm test
cd ../task3-mobile && npm i && npx playwright install chromium webkit && npm test
```

`task2-api` needs reqres API keys:

```bash
cd task2-api && npm i
# create a .env with your reqres key(s), then:
npm test
```

Juraj Kapusansky, juraj.kapusansky@gmail.com
