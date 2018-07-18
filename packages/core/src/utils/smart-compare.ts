import { List, Maybe } from 'monet'

const getLeadingNumber = (value: string): Maybe<string> =>
  Maybe.fromNull(value.match(/^[0-9]+/)).map(matches => matches[0])

const compare = <V>(a: V, b: V): number => {
  if (a === b) {
    return 0
  }
  return a < b ? -1 : 1
}

export const smartCompare = (a: string, b: string): number => {
  const numA = Number(a)
  const numB = Number(b)
  if (!isNaN(numA) && !isNaN(numB)) {
    return compare(numA, numB) // comparing numbers is the easiest case
  }
  return List.fromArray([a, b])
    .map(getLeadingNumber) // extracting a numerical part at the beginning of the string...
    .sequenceMaybe<string>()
    .map(values => values.toArray())
    .map(([aLeadingNumber, bLeadingNumber]: string[]) =>
      smartCompare(aLeadingNumber, bLeadingNumber)) // ...so "1a" can come before "100"
    .filter(compareResult => compareResult !== 0)
    .orJust(compare(a, b))
}
