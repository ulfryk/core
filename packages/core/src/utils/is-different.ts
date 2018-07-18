export const isDifferent = <T>(a: T, b: T, fields: (keyof T)[]): boolean =>
  fields.some(propName => a[propName] !== b[propName])
