/**
 * Makes the limits of every <input type="number"> binding, on every page: browsers only use min/max for
 * the arrows and form validation, so "50" could still be typed into a field that allows at most 30.
 *
 * - A value above max (or below min when min is negative or zero) is replaced right away while typing.
 * - A value below a positive min is fixed when the field is left: clamping while typing would turn the
 *   "1" of "16" into 16 before the "6" arrives.
 * - Fields with step="1" or no step drop decimals.
 *
 * Runs in the capture phase, so the tools' own input handlers already see the corrected value. Limits
 * that depend on other values (e.g. how many names there are) are set by the tools as min/max attributes.
 */

let installed = false;

/** The field's limits; a missing or broken attribute means no limit on that side. */
function limits(input: HTMLInputElement): { min: number; max: number } {
  const min = Number(input.min);
  const max = Number(input.max);
  return {
    min: input.min !== '' && Number.isFinite(min) ? min : -Infinity,
    max: input.max !== '' && Number.isFinite(max) ? max : Infinity,
  };
}

const wholeNumbers = (input: HTMLInputElement) => input.step === '' || input.step === '1';

function fix(input: HTMLInputElement, final: boolean): boolean {
  if (input.value === '') return false;
  let v = Number(input.value);
  if (!Number.isFinite(v)) return false;
  const { min, max } = limits(input);
  if (wholeNumbers(input) && !Number.isInteger(v)) v = Math.trunc(v);
  if (v > max) v = max;
  // Below min: at once if typing can never get above it again (min ≤ 0), otherwise when leaving the field.
  if (v < min && (final || min <= 0)) v = min;
  if (String(v) === input.value) return false;
  input.value = String(v);
  return true;
}

export function enforceNumberLimits(): void {
  if (installed) return;
  installed = true;
  const isNumber = (t: EventTarget | null): t is HTMLInputElement => t instanceof HTMLInputElement && t.type === 'number';

  document.addEventListener(
    'input',
    (e) => {
      if (isNumber(e.target)) fix(e.target, false);
    },
    true,
  );
  // Leaving the field: apply a positive min too, and tell the tool about the corrected value.
  document.addEventListener(
    'change',
    (e) => {
      if (isNumber(e.target) && fix(e.target, true)) {
        e.target.dispatchEvent(new Event('input', { bubbles: true }));
      }
    },
    true,
  );
}
