import { Maybe } from 'monet'

export interface IArrayFindIndex {
  <T>(items: T[], predicate: (item: T, index: number, array: T[]) => boolean): Maybe<number>
  <T>(
    items: ReadonlyArray<T>,
    predicate: (item: T, index: number, array: ReadonlyArray<T>) => boolean,
  ): Maybe<number>
}

/**
 * @description
 * More friendly version of Array `.findIndex` -- instead of index or -1 it returns a monet Maybe:
 * - None() if nothing found
 * - Some(index) if item was found
 */
export const findIndex: IArrayFindIndex = (items: any, predicate: any) =>
  Maybe.fromNull(items.findIndex(predicate)).filter(index => index > -1)
