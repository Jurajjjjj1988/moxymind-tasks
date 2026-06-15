// Defaults target a Pixel 6 emulator on API 33. Override via env vars
// when running against a different device or AVD.
export const androidCalculatorCaps = {
  platformName: 'Android',
  'appium:platformVersion': process.env.ANDROID_PLATFORM_VERSION || '13',
  'appium:deviceName': process.env.ANDROID_DEVICE_NAME || 'Pixel_6_API_33',
  'appium:automationName': 'UiAutomator2',
  'appium:appPackage': 'com.google.android.calculator',
  'appium:appActivity': 'com.android.calculator2.Calculator',
  'appium:noReset': true,
  'appium:newCommandTimeout': 120,
};
