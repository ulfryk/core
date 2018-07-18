import { Maybe } from 'monet';

/**
 * @description
 * More friendly version of `String.prototype.substring` returns:
 * - None() if substring is 0 chars long
 * - Some(foundSubstring) if substring is 1 char or longer
 */
export const substring = (text: string, start = 0, end?: number): Maybe<string> =>
  Maybe.fromNull(text.substring(start, end)).filter(Boolean);
