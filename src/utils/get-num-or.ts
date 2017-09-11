export const getNumOr = (num: number, orElse: number) =>
  Number(num) === num && isFinite(num) ? num : orElse;
