# Task 3 - Mobile automation (Android Calculator)

WebdriverIO v8 + Appium v2 + Mocha + TypeScript, UIAutomator2 driver.
Two tests against the built-in Google Calculator on an Android emulator.

## Scenarios

1. **Addition**: `7 + 3 = 10`. Reads the result field and asserts the text is `10`.
2. **Divide by zero**: `7 / 0`. Asserts the result is a non-numeric error string.
   Stock Google Calculator shows `Can't divide by 0`; vendor builds may differ,
   so the assertion accepts any non-numeric non-empty result. See the comment
   in `tests/divide-by-zero.spec.ts`.

## Prerequisites

- Node 18+ and npm
- Java 11+ (Appium UIAutomator2 driver needs it)
- Android SDK + an emulator. Pixel 6, API 33 tested. Any AVD with
  `com.google.android.calculator` preinstalled will do.
- Appium 2 installed globally with the UIAutomator2 driver:

```bash
npm i -g appium
appium driver install uiautomator2
```

## Run

Start the emulator first (`emulator -avd Pixel_6_API_33` or via Android Studio).

Terminal 1:

```bash
npm install
npm run appium
```

Terminal 2:

```bash
npm test
```

## Allure report (optional)

```bash
npm run report
```

Requires `allure-commandline` (declared as a dev dependency). Results land in
`allure-results/` and the rendered report opens in the default browser.

## Configuration

`config/capabilities.ts` holds the emulator capabilities. Override via env:

| Var | Default | Purpose |
| --- | --- | --- |
| `ANDROID_PLATFORM_VERSION` | `13` | Match the API level of your AVD |
| `ANDROID_DEVICE_NAME` | `Pixel_6_API_33` | AVD name |
| `APPIUM_HOST` | `127.0.0.1` | Appium server host |
| `APPIUM_PORT` | `4723` | Appium server port |

Example:

```bash
ANDROID_PLATFORM_VERSION=14 ANDROID_DEVICE_NAME=Pixel_7_API_34 npm test
```

## Structure

```
config/        Capabilities, env-overridable
pages/         Page Object (CalculatorPage)
tests/         Mocha specs
wdio.conf.ts   WDIO runner config (Appium endpoint, reporters)
```

## Selector strategy

Uses Android `resource-id` via the WDIO `~` accessibility selector
(e.g. `~com.google.android.calculator:id/digit_7`). Stable across UI
restyles - only breaks if Google renames the resource id, which is rare.

The result field has two ids (`result_final` after `=`, `result_preview` before).
`CalculatorPage.resultText()` tries both with a `formula` fallback so the POM
survives older calculator builds.

## Device under test

Confirmed against:

- AVD: Pixel 6, API 33 (Android 13)
- Calculator package: `com.google.android.calculator`
- Appium: 2.x
- UIAutomator2 driver: 3.x
