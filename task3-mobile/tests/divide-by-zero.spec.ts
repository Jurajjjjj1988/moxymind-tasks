import { CalculatorPage } from '../pages/CalculatorPage';

describe('Calculator - divide by zero', () => {
  const calc = new CalculatorPage();

  beforeEach(async () => {
    await calc.open();
    await calc.clear();
  });

  // Google Calculator on Pixel/AOSP shows "Can't divide by 0".
  // Older or vendor-skinned builds may show a different string
  // (e.g. "Error", "Infinity", "undefined"). The assertion accepts
  // any non-numeric, non-empty result so the test stays useful across builds.
  it('7 / 0 displays a non-numeric error result', async () => {
    await calc.tapDigits('7');
    await calc.divide();
    await calc.tapDigits('0');
    await calc.equals();

    const result = await calc.resultText();

    expect(result.length).toBeGreaterThan(0);
    // Reject if the result parses as a finite number.
    const asNumber = Number(result.replace(/[,\s]/g, ''));
    expect(Number.isFinite(asNumber)).toBe(false);
  });
});
