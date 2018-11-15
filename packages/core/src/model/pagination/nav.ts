export interface IPaginationNavsConfig {
  readonly currentPage: number
  readonly pageCount: number
  readonly wrap?: number
}

// tslint:disable:no-array-mutation
const range = (start: number, end: number): number[] => Array(end - start)
  .fill(0)
  .map((__, i) => i + start)

const DEFAULT_WRAP = 2
const SIDE_BOUND = 3

export class Nav {

  public static create(selected: number, separators: number[] = []) {
    return (index: number) => new Nav(index, selected === index, separators.includes(index))
  }

  public static getNavs(config: IPaginationNavsConfig): Nav[] {
    const { wrap = DEFAULT_WRAP, pageCount, currentPage } = config
    const visibleRange = 2 * wrap + 1 // tslint:disable-line:no-magic-numbers

    //           / --- visibleRange -----\
    //           /-  wrap -\   /-  wrap -\
    // | 0 | ... | 6  | 7  |_8_| 9  | 10 | ... | 23 |   <- nav buttons
    //
    //   ^ first                                  ^ last
    //
    //
    // ----- range ------\
    //  | 0 |_1_| 2  | 3 | ... | 23 |
    //
    //                      ^ clickable separator (upper)
    //
    //           / ------- range ------
    // | 0 | ... | 6  | 7  |_8_| 9  |
    //
    //        ^ lower
    //

    const lowerBoundForSeparators = SIDE_BOUND + visibleRange + SIDE_BOUND

    //       3  +  /-- visibleRange ---\  +  3
    //
    // | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |    <- too short for separators
    //

    return pageCount > lowerBoundForSeparators ? Nav.prepareSeparatedNavs({
      current: currentPage,
      first: 0,
      last: pageCount - 1,
      lower: currentPage - wrap - 1,
      upper: currentPage + wrap + 1,
    }) : Nav.prepareContinuousNavs(pageCount, Nav.create(currentPage))
  }

  private static prepareSeparatedNavs(
    { lower, upper, first, last, current }: { readonly [key: string]: number },
  ): Nav[] {
    // tslint:disable:no-array-mutation
    return Array.from(new Set(range(lower, upper + 1).concat([first, last])))
      .sort((a, b) => a - b)
      .filter(page => page >= 0 && page <= last)
      .map(Nav.create(current, [lower, upper]
        .filter(val => ![first, first + 1, last, last - 1].includes(val))))
  }

  private static prepareContinuousNavs(pageCount: number, creator: (n: number) => Nav): Nav[] {
    return range(0, pageCount).map(creator)
  }

  constructor(
    public readonly index: number,
    public readonly selected: boolean,
    public readonly separator: boolean,
  ) {}

}
