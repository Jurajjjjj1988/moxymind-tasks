# task1

Playwright + TypeScript against https://www.saucedemo.com, Chromium only.

```bash
npm install
npx playwright install chromium
npm test
```

`npm run test:headed` if you want to watch the browser.
`npm run report` after a run to open the HTML report.

There are 4 tests across 3 specs.

`login.spec.ts`

`standard_user` lands on `/inventory.html`.
`locked_out_user` gets the "locked out" error.

`cart.spec.ts`

Add Backpack + Bike Light, badge reads 2, both items show up on the cart page.

`checkout.spec.ts`

Login through to the "Thank you for your order!" confirmation.

1 POM per screen in `pages/` (Login, Inventory, Cart, Checkout).
1 spec per feature in `tests/`.
Selectors go through `getByTestId`. The `testIdAttribute` override in the config makes it match Saucedemo's `data-test`.
