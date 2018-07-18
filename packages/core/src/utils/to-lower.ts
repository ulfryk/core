import { Maybe } from 'monet'

export const toLower = (value: string | null | undefined) =>
  Maybe.fromNull(value).fold('')(text => text.toLowerCase())
