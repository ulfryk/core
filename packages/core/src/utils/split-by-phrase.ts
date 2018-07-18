import { Maybe } from 'monet'

import { indexOf } from './index-of'
import { substring } from './substring'
import { toLower } from './to-lower'

export type SplitText = [Maybe<string>, Maybe<string>, Maybe<string>]

export const splitByPhrase = (phrase: Maybe<string>, text: string): Maybe<SplitText> =>
  phrase
    .flatMap(value => indexOf(toLower(text), toLower(value))
      .map(index => [index, value.length]))
    .map(([start, length]) => [start, start + length])
    .map<SplitText>(([start, end]) => [
      substring(text, 0, start),
      substring(text, start, end),
      substring(text, end),
    ])
