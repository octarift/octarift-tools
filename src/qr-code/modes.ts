/**
 * The kinds of QR code: their form fields and how the field values become the encoded text.
 * Field and mode ids are keys of strings.ts, so a missing label fails the build.
 */

import {
  czechAccountToIban,
  czPayment,
  email,
  euPayment,
  FieldError,
  parseAmount,
  parseBic,
  parseIban,
  parseSymbol,
  paypalLink,
  revolutLink,
  sms,
  vcard,
  webUrl,
  wifi,
  type WifiSecurity,
} from './payloads';
import type { FieldId, ModeId, OptionId } from './strings';

export interface Field {
  id: FieldId;
  type: 'text' | 'textarea' | 'select' | 'checkbox' | 'date' | 'password';
  /** Needed for a code at all; while empty the preview just waits. */
  required?: boolean;
  options?: OptionId[];
  /** First option of a select unless set. */
  initial?: string;
  maxLength?: number;
  inputMode?: 'text' | 'url' | 'email' | 'tel' | 'numeric' | 'decimal';
  autocomplete?: string;
  /** Takes the full row on wide screens. */
  wide?: boolean;
  /** Shown only when this returns true for the current values (e.g. the Wi-Fi password). */
  when?: (v: Values) => boolean;
}

export type Values = Record<string, string | boolean>;

export interface Mode {
  id: ModeId;
  fields: Field[];
  /** The text to encode. Throws FieldError for invalid values. */
  build: (v: Values) => string;
  /** Error correction level required by the format (EPC demands M). */
  ecc?: 'M';
  /** Payment types share one "Payment" chip and are picked in a second row. */
  payment?: true;
}

const str = (v: Values, id: FieldId) => (typeof v[id] === 'string' ? (v[id] as string) : '');

export const modes: Mode[] = [
  {
    id: 'url',
    fields: [{ id: 'url', type: 'text', required: true, inputMode: 'url', autocomplete: 'url', wide: true }],
    build: (v) => webUrl(str(v, 'url')),
  },
  {
    id: 'text',
    fields: [{ id: 'text', type: 'textarea', required: true, wide: true }],
    build: (v) => str(v, 'text'),
  },
  {
    id: 'wifi',
    fields: [
      { id: 'ssid', type: 'text', required: true, autocomplete: 'off' },
      { id: 'security', type: 'select', options: ['WPA', 'WEP', 'nopass'] },
      { id: 'password', type: 'password', autocomplete: 'off', when: (v) => v.security !== 'nopass' },
      { id: 'hidden', type: 'checkbox' },
    ],
    build: (v) =>
      wifi(str(v, 'ssid'), (str(v, 'security') || 'WPA') as WifiSecurity, str(v, 'password'), v.hidden === true),
  },
  {
    id: 'contact',
    fields: [
      { id: 'firstName', type: 'text', autocomplete: 'given-name' },
      { id: 'lastName', type: 'text', autocomplete: 'family-name' },
      { id: 'org', type: 'text', autocomplete: 'organization' },
      { id: 'jobTitle', type: 'text', autocomplete: 'organization-title' },
      { id: 'phone', type: 'text', inputMode: 'tel', autocomplete: 'tel' },
      { id: 'email', type: 'text', inputMode: 'email', autocomplete: 'email' },
      { id: 'web', type: 'text', inputMode: 'url', autocomplete: 'url', wide: true },
    ],
    build: (v) => {
      const c = {
        firstName: str(v, 'firstName'),
        lastName: str(v, 'lastName'),
        org: str(v, 'org'),
        jobTitle: str(v, 'jobTitle'),
        phone: str(v, 'phone'),
        email: str(v, 'email'),
        web: str(v, 'web'),
      };
      // Wait for at least a name or a company.
      if (![c.firstName, c.lastName, c.org].some((x) => x.trim())) return '';
      return vcard(c);
    },
  },
  {
    id: 'email',
    fields: [
      { id: 'emailTo', type: 'text', required: true, inputMode: 'email', autocomplete: 'email', wide: true },
      { id: 'subject', type: 'text', wide: true },
      { id: 'body', type: 'textarea', wide: true },
    ],
    build: (v) => email(str(v, 'emailTo'), str(v, 'subject'), str(v, 'body')),
  },
  {
    id: 'sms',
    fields: [
      { id: 'phone', type: 'text', required: true, inputMode: 'tel', autocomplete: 'tel', wide: true },
      { id: 'smsBody', type: 'textarea', wide: true },
    ],
    build: (v) => sms(str(v, 'phone'), str(v, 'smsBody')),
  },
  {
    id: 'czPayment',
    payment: true,
    fields: [
      { id: 'czAccount', type: 'text', required: true, autocomplete: 'off', wide: true },
      { id: 'amount', type: 'text', inputMode: 'decimal', autocomplete: 'off' },
      { id: 'czCurrency', type: 'select', options: ['CZK', 'EUR'] },
      { id: 'vs', type: 'text', inputMode: 'numeric', maxLength: 10, autocomplete: 'off' },
      { id: 'ss', type: 'text', inputMode: 'numeric', maxLength: 10, autocomplete: 'off' },
      { id: 'ks', type: 'text', inputMode: 'numeric', maxLength: 10, autocomplete: 'off' },
      { id: 'dueDate', type: 'date' },
      { id: 'recipient', type: 'text', maxLength: 35, autocomplete: 'off', wide: true },
      { id: 'czMessage', type: 'text', maxLength: 60, autocomplete: 'off', wide: true },
    ],
    build: (v) =>
      czPayment({
        iban: czechAccountToIban('czAccount', str(v, 'czAccount')),
        amount: parseAmount('amount', str(v, 'amount'), 9_999_999.99),
        currency: str(v, 'czCurrency') === 'EUR' ? 'EUR' : 'CZK',
        vs: parseSymbol('vs', str(v, 'vs'), 10),
        ss: parseSymbol('ss', str(v, 'ss'), 10),
        ks: parseSymbol('ks', str(v, 'ks'), 10),
        dueDate: str(v, 'dueDate'),
        recipient: str(v, 'recipient'),
        message: str(v, 'czMessage'),
      }),
  },
  {
    id: 'euPayment',
    payment: true,
    ecc: 'M',
    fields: [
      { id: 'euName', type: 'text', required: true, maxLength: 70, autocomplete: 'off', wide: true },
      { id: 'iban', type: 'text', required: true, autocomplete: 'off' },
      { id: 'bic', type: 'text', autocomplete: 'off' },
      { id: 'amountEur', type: 'text', inputMode: 'decimal', autocomplete: 'off' },
      { id: 'euMessage', type: 'text', maxLength: 140, autocomplete: 'off', wide: true },
    ],
    build: (v) =>
      euPayment({
        name: str(v, 'euName'),
        iban: parseIban('iban', str(v, 'iban')),
        bic: parseBic('bic', str(v, 'bic')),
        amount: parseAmount('amountEur', str(v, 'amountEur'), 999_999_999.99),
        message: str(v, 'euMessage'),
      }),
  },
  {
    id: 'paypal',
    payment: true,
    fields: [
      { id: 'paypalUser', type: 'text', required: true, autocomplete: 'off', wide: true },
      { id: 'payAmount', type: 'text', inputMode: 'decimal', autocomplete: 'off' },
      { id: 'payCurrency', type: 'select', options: ['EUR', 'USD', 'GBP', 'CZK'] },
    ],
    build: (v) =>
      paypalLink(
        str(v, 'paypalUser'),
        parseAmount('payAmount', str(v, 'payAmount'), 1_000_000),
        str(v, 'payCurrency') || 'EUR',
      ),
  },
  {
    id: 'revolut',
    payment: true,
    fields: [{ id: 'revolutUser', type: 'text', required: true, autocomplete: 'off', wide: true }],
    build: (v) => revolutLink(str(v, 'revolutUser')),
  },
];

/** Whether all required fields (that are shown) have a value. */
export function isComplete(mode: Mode, v: Values): boolean {
  return mode.fields.every((f) => !f.required || (f.when && !f.when(v)) || str(v, f.id).trim() !== '');
}

export { FieldError };
