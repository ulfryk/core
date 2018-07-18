import { Maybe, None, Some } from 'monet'

export const first = <T>(items: T[] | ReadonlyArray<T>): Maybe<T> => items.length > 0 ?
  Some(items[0]) :
  None<T>()
