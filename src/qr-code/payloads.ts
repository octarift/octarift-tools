/**
 * Pure builders for the text inside each kind of QR code, plus the bank-account checks they need.
 * Invalid input throws FieldError naming the field and an error key from strings.ts (`errors`).
 */

import { removeDiacritics } from '@shared/text';
import type { ErrorKey, FieldId } from './strings';

export class FieldError extends Error {
  constructor(
    readonly field: FieldId,
    readonly key: ErrorKey,
  ) {
    super(`${field}: ${key}`);
  }
}

const compact = (text: string) => text.replace(/\s+/g, '');

/* ---------- Amounts ---------- */

/**
 * Parses "1 234,50", "1234.5" or "1 234" into a number with at most two decimals.
 * Returns null when empty; throws for anything else that is not a positive amount up to `max`.
 */
export function parseAmount(field: FieldId, text: string, max: number): number | null {
  const clean = compact(text).replace(',', '.');
  if (clean === '') return null;
  if (!/^\d+(\.\d{1,2})?$/.test(clean)) throw new FieldError(field, 'amount');
  const value = Number(clean);
  if (value <= 0 || value > max) throw new FieldError(field, 'amountRange');
  return value;
}

/* ---------- IBAN and Czech account numbers ---------- */

/** ISO 13616 check: move the first four characters to the end, letters to numbers, remainder 1 when divided by 97. */
function ibanChecksumOk(iban: string): boolean {
  const rearranged = iban.slice(4) + iban.slice(0, 4);
  let rest = 0;
  for (const ch of rearranged) {
    const n = ch >= 'A' ? String(ch.charCodeAt(0) - 55) : ch;
    for (const d of n) rest = (rest * 10 + Number(d)) % 97;
  }
  return rest === 1;
}

/** Normalised IBAN ("CZ65 0800…" → "CZ650800…"); throws when the format or the check digits are wrong. */
export function parseIban(field: FieldId, text: string): string {
  const iban = compact(text).toUpperCase();
  if (!/^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/.test(iban)) throw new FieldError(field, 'iban');
  if (!ibanChecksumOk(iban)) throw new FieldError(field, 'ibanChecksum');
  return iban;
}

/** Czech banks' modulo 11 check: weights 1, 2, 4, 8, 5, 10, 9, 7, 3, 6 from the right. */
function czMod11Ok(digits: string): boolean {
  const weights = [6, 3, 7, 9, 10, 5, 8, 4, 2, 1];
  const padded = digits.padStart(10, '0');
  let sum = 0;
  for (let i = 0; i < 10; i++) sum += Number(padded[i]) * weights[i]!;
  return sum % 11 === 0;
}

/**
 * Czech account in either form: "19-2000145399/0800" (prefix optional) or an IBAN.
 * Returns the IBAN, which is what QR Platba carries.
 */
export function czechAccountToIban(field: FieldId, text: string): string {
  const clean = compact(text).toUpperCase();
  if (/^[A-Z]{2}/.test(clean)) return parseIban(field, clean);
  const m = /^(?:(\d{1,6})-)?(\d{2,10})\/(\d{4})$/.exec(clean);
  if (!m) throw new FieldError(field, clean.includes('/') ? 'czAccount' : 'czBankCode');
  const [, prefix = '', number = '', bank = ''] = m;
  if (!czMod11Ok(prefix) || !czMod11Ok(number)) throw new FieldError(field, 'czAccountChecksum');
  const bban = bank + prefix.padStart(6, '0') + number.padStart(10, '0');
  // Check digits: 98 − (BBAN + "CZ00" as digits) mod 97, where C = 12 and Z = 35.
  let rest = 0;
  for (const d of `${bban}123500`) rest = (rest * 10 + Number(d)) % 97;
  return `CZ${String(98 - rest).padStart(2, '0')}${bban}`;
}

/* ---------- Payments ---------- */

export interface CzPayment {
  iban: string;
  amount: number | null;
  currency: 'CZK' | 'EUR';
  vs: string;
  ss: string;
  ks: string;
  message: string;
  recipient: string;
  /** YYYY-MM-DD from <input type="date">, or empty. */
  dueDate: string;
}

/** Values may not contain "*", the field separator; the format encodes it as %2A. Accents are dropped for older bank apps. */
const spdValue = (text: string, max: number) => removeDiacritics(text.trim()).replace(/\*/g, '%2A').slice(0, max);

/** QR Platba, the Short Payment Descriptor of the Czech Banking Association (SPD 1.0). */
export function czPayment(p: CzPayment): string {
  const parts = ['SPD', '1.0', `ACC:${p.iban}`];
  if (p.amount !== null) parts.push(`AM:${p.amount.toFixed(2)}`);
  parts.push(`CC:${p.currency}`);
  if (p.dueDate) parts.push(`DT:${p.dueDate.replace(/-/g, '')}`);
  if (p.message.trim()) parts.push(`MSG:${spdValue(p.message, 60)}`);
  if (p.recipient.trim()) parts.push(`RN:${spdValue(p.recipient, 35)}`);
  if (p.vs) parts.push(`X-VS:${p.vs}`);
  if (p.ss) parts.push(`X-SS:${p.ss}`);
  if (p.ks) parts.push(`X-KS:${p.ks}`);
  return parts.join('*');
}

/** Variable, specific and constant symbols: digits only, up to `max` of them. */
export function parseSymbol(field: FieldId, text: string, max: number): string {
  const clean = compact(text);
  if (clean !== '' && !new RegExp(`^\\d{1,${max}}$`).test(clean)) throw new FieldError(field, 'symbol');
  return clean;
}

export interface EuPayment {
  name: string;
  iban: string;
  bic: string;
  amount: number | null;
  /** Either an RF creditor reference or free text. */
  message: string;
}

/** EPC QR ("SEPA QR") version 002 from the European Payments Council's guideline EPC069-12; euro only. */
export function euPayment(p: EuPayment): string {
  const message = p.message.trim();
  const structured = /^RF\d{2}[A-Z0-9]{1,21}$/i.test(compact(message)) ? compact(message).toUpperCase() : '';
  const lines = [
    'BCD',
    '002',
    '1', // UTF-8
    'SCT',
    p.bic,
    p.name.trim().slice(0, 70),
    p.iban,
    p.amount === null ? '' : `EUR${p.amount.toFixed(2)}`,
    '', // purpose code
    structured,
    structured ? '' : message.slice(0, 140),
  ];
  while (lines.at(-1) === '') lines.pop();
  return lines.join('\n');
}

export function parseBic(field: FieldId, text: string): string {
  const bic = compact(text).toUpperCase();
  if (bic !== '' && !/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/.test(bic)) throw new FieldError(field, 'bic');
  return bic;
}

/* ---------- Everything else ---------- */

/** Adds https:// to "example.com/page"; keeps any other scheme as typed. */
export function webUrl(text: string): string {
  const url = text.trim();
  return /^[a-z][a-z0-9+.-]*:/i.test(url) ? url : `https://${url}`;
}

export type WifiSecurity = 'WPA' | 'WEP' | 'nopass';

/** The de facto Wi-Fi format read by Android and iOS cameras: WIFI:T:WPA;S:name;P:password;H:true;; */
export function wifi(ssid: string, security: WifiSecurity, password: string, hidden: boolean): string {
  const esc = (v: string) => v.replace(/([\\;,:"])/g, '\\$1');
  let out = `WIFI:T:${security};S:${esc(ssid)};`;
  if (security !== 'nopass') out += `P:${esc(password)};`;
  if (hidden) out += 'H:true;';
  return `${out};`;
}

export interface Contact {
  firstName: string;
  lastName: string;
  org: string;
  jobTitle: string;
  phone: string;
  email: string;
  web: string;
}

/** vCard 3.0, which phone cameras offer to save as a new contact. */
export function vcard(c: Contact): string {
  const esc = (v: string) => v.trim().replace(/([\\,;])/g, '\\$1').replace(/\r?\n/g, '\\n');
  const full = [c.firstName, c.lastName].map((v) => v.trim()).filter(Boolean).join(' ');
  const lines = ['BEGIN:VCARD', 'VERSION:3.0', `N:${esc(c.lastName)};${esc(c.firstName)};;;`, `FN:${esc(full || c.org)}`];
  if (c.org.trim()) lines.push(`ORG:${esc(c.org)}`);
  if (c.jobTitle.trim()) lines.push(`TITLE:${esc(c.jobTitle)}`);
  if (c.phone.trim()) lines.push(`TEL;TYPE=CELL:${compact(c.phone)}`);
  if (c.email.trim()) lines.push(`EMAIL:${c.email.trim()}`);
  if (c.web.trim()) lines.push(`URL:${webUrl(c.web)}`);
  lines.push('END:VCARD');
  return lines.join('\r\n');
}

export function email(to: string, subject: string, body: string): string {
  const query = [
    subject.trim() && `subject=${encodeURIComponent(subject.trim())}`,
    // A trailing Enter would become an empty line at the end of the e-mail.
    body.trim() && `body=${encodeURIComponent(body.trimEnd())}`,
  ].filter(Boolean);
  return `mailto:${to.trim()}${query.length ? `?${query.join('&')}` : ''}`;
}

export const sms = (phone: string, message: string) => `SMSTO:${compact(phone)}:${message}`;

/** "@jan", "jan" or a pasted profile link "https://paypal.me/jan/10" → "jan". */
const profileName = (user: string) =>
  encodeURIComponent(user.trim().replace(/^@/, '').replace(/^https?:\/\/[^/]+\//i, '').replace(/\/.*$/, ''));

/** PayPal.Me link; an amount and currency can be added to the path. */
export function paypalLink(user: string, amount: number | null, currency: string): string {
  const amountPart = amount === null ? '' : `/${amount.toFixed(2).replace(/\.00$/, '')}${currency}`;
  return `https://paypal.me/${profileName(user)}${amountPart}`;
}

/**
 * Revolut.me profile link (the payer enters the amount). A pasted revolut.me link is kept whole, because
 * payment requests with a fixed amount are separate links created in the Revolut app.
 */
export function revolutLink(user: string): string {
  const pasted = user.trim();
  if (/^(https?:\/\/)?(www\.)?revolut\.me\/\S+/i.test(pasted)) return pasted.replace(/^(?!https?:)/i, 'https://');
  return `https://revolut.me/${profileName(user)}`;
}
