import { Maybe } from 'monet';

export interface IArrayFind {
  <T>(items: T[], predicate: (item: T, index: number, array: T[]) => boolean): Maybe<T>;
  <T>(
    items: ReadonlyArray<T>,
    predicate: (item: T, index: number, array: ReadonlyArray<T>) => boolean,
  ): Maybe<T>;
}

/**
 * @description
 * More friendly version of Array `.find` -- instead of value or null it returns a monet Maybe:
 * - None() if nothing found
 * - Some(item) if item was found.
 */
export const find: IArrayFind = (items: any, predicate: any) =>
  Maybe.fromNull(items.find(predicate));
