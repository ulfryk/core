export const multiSum = <T>(items: T[], ...accessors: ((item: T) => number)[]): number[] =>
  items.reduce((acc: number[], item: T) => accessors
      .map((accessor, index) => acc[index] + accessor(item)),
    accessors.map(() => 0));
