import { BasicPagination, IBasicPagination } from './basic-pagination';
import { Nav } from './nav';

export interface IPagination extends IBasicPagination {
  readonly navs: Nav[];
  readonly wrap: number;
}

export class Pagination extends BasicPagination implements IPagination {

  public readonly navs = this.getNavs();

  constructor(
    totalCount = 0,
    filteredCount = 0,
    currentPage = 0,
    limit = 10,
    public readonly wrap = 2,
  ) {
    super(totalCount, filteredCount, currentPage, limit);
  }

  public setLimit(limit: number) {
    return new Pagination(
      this.totalCount,
      this.filteredCount,
      this.getCurrentPageForNewLimit(limit),
      limit,
      this.wrap);
  }

  public nth(pageNumber: number): Pagination {
    return pageNumber < 0 ? this.first() as Pagination :
      pageNumber > this.pageCount - 1 ? this.last() as Pagination :
        new Pagination(this.totalCount, this.filteredCount, pageNumber, this.limit, this.wrap);
  }

  private getNavs(): Nav[] {
    return Nav.getNavs({
      currentPage: this.currentPage < this.pageCount ? this.currentPage : this.pageCount - 1,
      pageCount: this.pageCount,
      wrap: this.wrap,
    });
  }

}
