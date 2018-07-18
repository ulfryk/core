import { ISetoid } from '../fantasy-land'

export interface IBasicPagination {
  readonly currentPage: number
  readonly filteredCount: number
  readonly limit: number
  readonly offset: number
  readonly pageCount: number
}

export class BasicPagination implements IBasicPagination, ISetoid {

  public static init(count: number, limit: number) {
    return new BasicPagination(count, count, 0, limit)
  }

  public static notPaged(count: number) {
    return BasicPagination.init(count, Number.MAX_SAFE_INTEGER)
  }

  public readonly offset: number = this.currentPage * this.limit

  public readonly pageCount: number = this.getPageCount()

  constructor(
    public readonly totalCount = 0,
    public readonly filteredCount = 0,
    public readonly currentPage = 0,
    public readonly limit = 10,
  ) {}

  // tslint:disable-next-line:cyclomatic-complexity
  public equals(other: BasicPagination) {
    return other === this || (
      other.totalCount === this.totalCount &&
      other.filteredCount === this.filteredCount &&
      other.currentPage === this.currentPage &&
      other.limit === this.limit
    )
  }

  public setTotalCount(totalCount: number) {
    return totalCount === this.totalCount ? this :
      new BasicPagination(totalCount, this.filteredCount, this.currentPage, this.limit)
  }

  public setFilteredCount(filteredCount: number) {
    return filteredCount === this.filteredCount ? this :
      new BasicPagination(this.totalCount, filteredCount, this.currentPage, this.limit)
  }

  public setLimit(limit: number) {
    return limit === this.limit ? this : new BasicPagination(
      this.totalCount, this.filteredCount, this.getCurrentPageForNewLimit(limit), limit)
  }

  public hasNext() {
    return this.currentPage < this.pageCount - 1
  }

  public hasPrev() {
    return this.currentPage > 0
  }

  public isFirst() {
    return !this.hasPrev()
  }

  public isLast() {
    return !this.hasNext()
  }

  public isOnly() {
    return this.isFirst() && this.isLast()
  }

  public next() {
    return this.hasNext() ? this.nth(this.currentPage + 1) : this
  }

  public prev() {
    return this.hasPrev() ? this.nth(this.currentPage - 1) : this
  }

  public first() {
    return this.currentPage === 0 ? this :
      new BasicPagination(this.totalCount, this.filteredCount, 0, this.limit)
  }

  public last() {
    const lastPageNumber = this.pageCount > 0 ? this.pageCount - 1 : 0
    return this.currentPage === lastPageNumber ? this :
      new BasicPagination(this.totalCount, this.filteredCount, lastPageNumber, this.limit)
  }

  public nth(pageNumber: number): BasicPagination {
    return pageNumber < 0 ? this.first() :
      pageNumber >= this.pageCount ? this.last() :
        pageNumber === this.currentPage ? this :
          new BasicPagination(this.totalCount, this.filteredCount, pageNumber, this.limit)
  }

  protected getCurrentPageForNewLimit(limit: number) {
    return Math.floor(this.currentPage * this.limit / limit)
  }

  protected getPageCount() {
    const lastPageLength = this.filteredCount % this.limit
    return (this.filteredCount - lastPageLength) / this.limit + Number(lastPageLength > 0)
  }

}
