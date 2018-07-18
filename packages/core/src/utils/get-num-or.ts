export const getNumOr = (num: number | null | undefined, orElse: number) =>
  Number(num) === num && isFinite(num) ? num : orElse
