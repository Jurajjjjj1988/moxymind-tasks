# task3

Playwright device emulation on the mobile Wikipedia site (`en.m.wikipedia.org`).
2 projects in the config: iPhone 13 (WebKit) and Pixel 5 (Chromium), so each spec runs twice, once per device.

Mobile web instead of a native app.
No Android SDK, no Appium server in the loop.

```bash
npm install
npx playwright install chromium webkit
npm test
```

`npm run report` opens the HTML report.

`tests/article.spec.ts` opens the Playwright article and checks the heading, the header search trigger, and that the hamburger toggle is in the DOM.
`tests/menu.spec.ts` taps the hamburger on the home page and asserts the drawer opens with the Home and Random links visible.

POMs live in `pages/` (`MobileHomePage`, `MobileArticlePage`).
