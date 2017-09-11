/* tslint:disable:no-unused-expression */
import { expect } from 'chai';

import { Nav } from './nav';
import { Pagination } from './pagination';

describe('model', () => {
  describe('pagination', () => {
    describe('Pagination', () => {

      describe('(basics)', () => {
        const pagination = new Pagination(66, 66, 2);
        const paginationB = pagination.nth(5);

        it('should paginate given list', () => {
          expect(pagination.currentPage).to.equal(2);
          expect(pagination.limit).to.equal(10);
          expect(pagination.offset).to.equal(20);
          expect(pagination.pageCount).to.equal(7);
        });

        it('should create new pagination on page change (not changing original)', () => {
          expect(pagination).to.not.equal(paginationB);
          expect(pagination.currentPage).to.equal(2);
          expect(pagination.limit).to.equal(10);
          expect(pagination.offset).to.equal(20);
          expect(pagination.pageCount).to.equal(7);
          expect(paginationB.currentPage).to.equal(5);
          expect(paginationB.offset).to.equal(50);
          expect(paginationB.limit).to.equal(10);
          expect(paginationB.pageCount).to.equal(7);
        });

      });

      describe('(edges)', () => {
        const pagination = new Pagination(42, 42, 0, 3);
        const paginationB = pagination.nth(13);

        it('should render properly lower bound navs', () => {
          expect(pagination.navs.length).to.equal(5);
          expect(pagination.navs[0]).to.deep.equal(new Nav(0, true, false));
          expect(pagination.navs[1]).to.deep.equal(new Nav(1, false, false));
        });

        it('should render properly upper bound navs', () => {
          expect(paginationB.navs.length).to.equal(5);
          expect(paginationB.navs[3]).to.deep.equal(new Nav(12, false, false));
          expect(paginationB.navs[4]).to.deep.equal(new Nav(13, true, false));
        });

      });

    });
  });
});
