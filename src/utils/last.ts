import { Maybe, None, Some } from 'monet';

export const last = <T>(items: T[]): Maybe<T> => items.length > 0 ?
  Some(items[items.length - 1]) :
  None<T>();
