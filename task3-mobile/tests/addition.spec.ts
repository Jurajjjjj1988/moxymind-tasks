import { CalculatorPage } from '../pages/CalculatorPage';

describe('Calculator - addition', () => {
  const calc = new CalculatorPage();

  beforeEach(async () => {
    await calc.open();
    await calc.clear();
  });

  it('7 + 3 shows 10', async () => {
    await calc.tapDigits('7');
    await calc.add();
    await calc.tapDigits('3');
    await calc.equals();

    await expect(await calc.resultText()).toBe('10');
  });
});
