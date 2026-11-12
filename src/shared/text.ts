/** Text helpers shared by several tools. */

/** Letters that Unicode does not decompose into base letter + accent. */
// prettier-ignore
const SPECIAL_LETTERS: Record<string, string> = {
  ß: 'ss', ẞ: 'SS', æ: 'ae', Æ: 'AE', œ: 'oe', Œ: 'OE', ø: 'o', Ø: 'O', ł: 'l', Ł: 'L',
  đ: 'd', Đ: 'D', ð: 'd', Ð: 'D', þ: 'th', Þ: 'Th', ı: 'i', ħ: 'h', Ħ: 'H', ŧ: 't', Ŧ: 'T',
  ŀ: 'l', Ŀ: 'L', ŋ: 'n', Ŋ: 'N', ĸ: 'k', ſ: 's',
};
const SPECIAL_RE = new RegExp(`[${Object.keys(SPECIAL_LETTERS).join('')}]`, 'g');

export function removeDiacritics(text: string): string {
  return text
    .normalize('NFD')
    .replace(/\p{M}+/gu, '')
    .replace(SPECIAL_RE, (c) => SPECIAL_LETTERS[c] ?? c)
    .normalize('NFC');
}
