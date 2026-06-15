const PKG = 'com.google.android.calculator';

export class CalculatorPage {
  private digit(n: number) {
    return $(`~${PKG}:id/digit_${n}`);
  }

  private get opAdd() {
    return $(`~${PKG}:id/op_add`);
  }

  private get opDiv() {
    return $(`~${PKG}:id/op_div`);
  }

  private get eq() {
    return $(`~${PKG}:id/eq`);
  }

  private get clr() {
    return $(`~${PKG}:id/clr`);
  }

  async open() {
    // Activity launches via appActivity capability. Wait for a known digit
    // so we don't race the splash.
    await this.digit(0).waitForDisplayed({ timeout: 15000 });
  }

  async clear() {
    // CLR is only visible when there's something to clear, so we ignore misses.
    const btn = this.clr;
    if (await btn.isExisting()) {
      try {
        await btn.click();
      } catch {
        // no-op
      }
    }
  }

  async tapDigits(digits: string) {
    for (const ch of digits) {
      const n = Number(ch);
      if (Number.isNaN(n)) {
        throw new Error(`Not a digit: ${ch}`);
      }
      await this.digit(n).click();
    }
  }

  async add() {
    await this.opAdd.click();
  }

  async divide() {
    await this.opDiv.click();
  }

  async equals() {
    await this.eq.click();
  }

  // Result lives in result_final after `=`, but in result_preview before.
  // We try final first and fall back to preview so the POM survives both
  // calculator versions (older builds skip the final node).
  async resultText(): Promise<string> {
    const final = $(`~${PKG}:id/result_final`);
    if (await final.isExisting()) {
      const txt = await final.getText();
      if (txt && txt.trim().length > 0) {
        return txt.trim();
      }
    }
    const preview = $(`~${PKG}:id/result_preview`);
    if (await preview.isExisting()) {
      return (await preview.getText()).trim();
    }
    // Fallback: the "formula" field shows error strings on some builds.
    const formula = $(`~${PKG}:id/formula`);
    return (await formula.getText()).trim();
  }
}
