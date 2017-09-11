const thirtyTwoMultiplier = 5;

// tslint:disable-next-line:no-bitwise
const getNewHash = (acc: number, code: number) => ((acc << thirtyTwoMultiplier) - acc) + code;

// tslint:disable-next-line:no-bitwise
const normalizeHash = (hashed: number) => hashed & hashed;

export const hash = (obj: any): number =>
  Array.from(JSON.stringify(obj))
    .map(char => char.charCodeAt(0))
    .reduce((acc, code) => normalizeHash(getNewHash(acc, code)), 0);
