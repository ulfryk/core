import { Maybe } from 'monet';

/**
 * @description
 * More friendly version of Array `.findIndex` -- instead of index or -1 it returns a monet Maybe:
 * - None() if nothing found
 * - Some(index) if item was found
 */
export const findIndex = <T>(items: T[], predicate: (item: T) => boolean): Maybe<number> =>
  Maybe.fromNull(items.findIndex(predicate)).filter(index => index > -1);
