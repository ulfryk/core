import { Maybe } from 'monet';

/**
 * @description
 * More friendly version of String `.indexOf` -- instead of index or -1 it returns a monet Maybe:
 * - None() if nothing found
 * - Some(index) if item was found
 */
export const indexOf = (text: string, searchValue: string, fromIndex?: number): Maybe<number> =>
  Maybe.fromNull(text.indexOf(searchValue, fromIndex)).filter(index => index > -1);
