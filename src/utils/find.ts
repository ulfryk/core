import { Maybe } from 'monet';

/**
 * @description
 * More friendly version of Array `.find` -- instead of value or null it returns a monet Maybe:
 * - None() if nothing found
 * - Some(item) if item was found.
 */
export const find = <T>(items: T[], predicate: (item: T) => boolean): Maybe<T> =>
  Maybe.fromNull(items.find(predicate));
