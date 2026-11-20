/**
 * PAY by square, the Slovak payment QR code, encoded by the specification of the Slovak Banking Association
 * ("by square – PAY specifications 1.2.0", free license for implementations that follow it).
 *
 * Steps (spec chapter 3): field values joined by tabs → CRC32 prepended → LZMA (lc 3, lp 0, pb 2, 128 KiB
 * dictionary) with a 2-byte size header → 4 header nibbles (type, version, document type, reserved) →
 * Base32hex. The text is encoded in a QR code with error correction level L, and every such code has to be
 * shown with the official PAY by square mark (pay-by-square-frame.svg).
 */

import { removeDiacritics } from '@shared/text';
import { compress } from 'lzma1';

/** The official mark every PAY by square code is shown in (loaded together with the encoder). */
export { default as frameSvg } from './pay-by-square-frame.svg?raw';

export interface SkPayment {
  /** Normalised IBAN (see parseIban). */
  iban: string;
  bic: string;
  amount: number | null;
  currency: string;
  /** YYYY-MM-DD from <input type="date">, or empty. */
  dueDate: string;
  vs: string;
  ss: string;
  ks: string;
  note: string;
  /** Required since specification 1.2.0. */
  beneficiaryName: string;
  beneficiaryAddress1: string;
  beneficiaryAddress2: string;
}

/** "25.50" → "25.5", "100.00" → "100" (spec: decimal number with a dot). */
const decimal = (n: number) => n.toFixed(2).replace(/\.?0+$/, '');

/**
 * Tabs separate the fields, so a tab inside a value becomes a space (spec 3.8). Accents are dropped, as the
 * reference library does by default, because SEPA payments only carry basic Latin letters anyway.
 */
const field = (v: string) => removeDiacritics(v.trim().replace(/\t/g, ' '));

/**
 * The field sequence of one simple payment order (spec appendix D, table 15). Standing order and direct
 * debit extensions are marked as absent (0) and their fields are left out; the beneficiary fields come
 * last, after all payments (appendix E).
 */
export function payBySquareSequence(p: SkPayment): string {
  return [
    '', // InvoiceID
    '1', // number of payments
    '1', // PaymentOptions: paymentorder
    p.amount === null ? '' : decimal(p.amount),
    p.currency,
    p.dueDate.replace(/-/g, ''),
    p.vs,
    p.ks,
    p.ss,
    '', // OriginatorsReferenceInformation
    field(p.note),
    '1', // number of bank accounts
    p.iban,
    p.bic,
    '0', // StandingOrderExt absent
    '0', // DirectDebitExt absent
    field(p.beneficiaryName),
    field(p.beneficiaryAddress1),
    field(p.beneficiaryAddress2),
  ].join('\t');
}

let crcTable: Uint32Array | null = null;

/** CRC-32 (IEEE 802.3, polynomial 0xEDB88320), as used by ZIP and PNG. */
export function crc32(bytes: Uint8Array): number {
  if (!crcTable) {
    crcTable = new Uint32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      crcTable[n] = c >>> 0;
    }
  }
  let crc = 0xffffffff;
  for (const b of bytes) crc = crcTable[(crc ^ b) & 0xff]! ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

const BASE32HEX = '0123456789ABCDEFGHIJKLMNOPQRSTUV';

/** Base32hex without "=" padding; the last group is filled with zero bits (spec 3.13). */
export function base32hex(bytes: Uint8Array): string {
  let out = '';
  let buffer = 0;
  let bits = 0;
  for (const b of bytes) {
    buffer = (buffer << 8) | b;
    bits += 8;
    while (bits >= 5) {
      bits -= 5;
      out += BASE32HEX[(buffer >>> bits) & 31];
    }
    buffer &= (1 << bits) - 1;
  }
  if (bits > 0) out += BASE32HEX[(buffer << (5 - bits)) & 31];
  return out;
}

/**
 * Header nibbles: by square type 0 (PAY), type version, document type 0 (pay), reserved 0.
 * Version 1 = the data model with beneficiary fields (spec table 1, 2015). Our data also meets 1.2.0 (name
 * required), which would be version 2, but a reader rejects versions newer than it knows, and banking apps
 * not yet updated for 1.2.0 would then refuse the code. The reference library writes 2 for 1.2.0.
 */
const TYPE_VERSION = 1;
const HEADER = [(0 << 4) | TYPE_VERSION, (0 << 4) | 0];

export function payBySquare(p: SkPayment): string {
  const data = new TextEncoder().encode(payBySquareSequence(p));
  const withCrc = new Uint8Array(4 + data.length);
  new DataView(withCrc.buffer).setUint32(0, crc32(data), true);
  withCrc.set(data, 4);

  // compress() writes the .lzma ("alone") format: 5 bytes of properties and 8 bytes of size, then the raw
  // stream. The spec replaces those 13 bytes with its own 2-byte size, so only the raw stream is kept.
  const lzma = compress(withCrc, { lc: 3, lp: 0, pb: 2, dictSize: 1 << 17 }).subarray(13);

  const out = new Uint8Array(HEADER.length + 2 + lzma.length);
  out.set(HEADER, 0);
  new DataView(out.buffer).setUint16(HEADER.length, withCrc.length, true);
  out.set(lzma, HEADER.length + 2);
  return base32hex(out);
}
