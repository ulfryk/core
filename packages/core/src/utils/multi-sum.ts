export interface IArrayMultiSum {
  <T>(
    items: T[],
    // tslint:disable-next-line:trailing-comma
    ...accessors: ((item: T, index: number, array: T[]) => number)[]
  ): number[]
  <T>(
    items: ReadonlyArray<T>,
    // tslint:disable-next-line:trailing-comma
    ...accessors: ((item: T, index: number, array: ReadonlyArray<T>) => number)[]
  ): ReadonlyArray<T>
}

export const multiSum: IArrayMultiSum =
  (items: any, ...accessors: any[]) =>
    items.reduce((acc: any, item: any, i: any, array: any) => accessors
        .map((accessor, j) => acc[j] + accessor(item, i, array)),
      accessors.map(() => 0) as any)
