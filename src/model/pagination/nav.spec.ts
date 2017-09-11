/* tslint:disable:no-unused-expression no-magic-numbers */
import { expect } from 'chai';

import { Nav } from './nav';

describe('model', () => {
  describe('pagination', () => {
    describe('Nav', () => {
      describe('static method getNavs()', () => {

        describe('(wide navs)', () => {
          const navs8of23 = Nav.getNavs({ currentPage: 8, pageCount: 23 });

          it('should create wide navs', () => {
            expect(navs8of23.length).to.equal(9);
          });

          it('should create wide navs with proper start and end', () => {
            expect(navs8of23[0]).to.deep.equal(new Nav(0, false, false));
            expect(navs8of23[8]).to.deep.equal(new Nav(22, false, false));
          });

          it('should create wide navs with proper splitters', () => {
            expect(navs8of23[1]).to.deep.equal(new Nav(5, false, true));
            expect(navs8of23[7]).to.deep.equal(new Nav(11, false, true));
          });

          it('should create wide navs with proper central group', () => {
            expect(navs8of23[2]).to.deep.equal(new Nav(6, false, false));
            expect(navs8of23[3]).to.deep.equal(new Nav(7, false, false));
            expect(navs8of23[4]).to.deep.equal(new Nav(8, true, false)); // <- selected
            expect(navs8of23[5]).to.deep.equal(new Nav(9, false, false));
            expect(navs8of23[6]).to.deep.equal(new Nav(10, false, false));
          });

        });

        describe('(wide navs - only right splitter)', () => {
          const navs3of25 = Nav.getNavs({ currentPage: 3, pageCount: 25 });
          const navs4of25 = Nav.getNavs({ currentPage: 4, pageCount: 25 });

          it('should create navs', () => {
            expect(navs3of25.length).to.equal(8);
            expect(navs4of25.length).to.equal(9);
          });

          it('should create navs with proper splitters', () => {
            expect(navs3of25[0]).to.deep.equal(new Nav(0, false, false)); // <-- not a splitter !!
            expect(navs4of25[1]).to.deep.equal(new Nav(1, false, false)); // <-- not a splitter !!
            expect(navs3of25[6]).to.deep.equal(new Nav(6, false, true));
            expect(navs4of25[7]).to.deep.equal(new Nav(7, false, true));
          });

          it('should create navs with proper selected nav', () => {
            expect(navs3of25[3]).to.deep.equal(new Nav(3, true, false)); // <- selected
            expect(navs4of25[4]).to.deep.equal(new Nav(4, true, false)); // <- selected
          });

        });

        describe('(wide navs - only left splitter)', () => {
          const navs20of25 = Nav.getNavs({ currentPage: 20, pageCount: 25 });
          const navs21of25 = Nav.getNavs({ currentPage: 21, pageCount: 25 });

          it('should create navs', () => {
            expect(navs20of25.length).to.equal(9);
            expect(navs21of25.length).to.equal(8);
          });

          it('should create navs with proper splitters', () => {
            expect(navs20of25[1]).to.deep.equal(new Nav(17, false, true));
            expect(navs21of25[1]).to.deep.equal(new Nav(18, false, true));
            expect(navs20of25[7]).to.deep.equal(new Nav(23, false, false)); // <-- not a splitter !!
            expect(navs21of25[7]).to.deep.equal(new Nav(24, false, false)); // <-- not a splitter !!
            expect(navs20of25[8]).to.deep.equal(new Nav(24, false, false)); // <-- not a splitter !!
          });

          it('should create navs with proper selected nav', () => {
            expect(navs20of25[4]).to.deep.equal(new Nav(20, true, false)); // <- selected
            expect(navs21of25[4]).to.deep.equal(new Nav(21, true, false)); // <- selected
          });

        });

        describe('(simple navs - no splitters)', () => {
          const navs4of11 = Nav.getNavs({ currentPage: 4, pageCount: 11 });

          it('should create navs', () => {
            expect(navs4of11.length).to.equal(11);
          });

          it('should create navs with no splitters', () => {
            expect(navs4of11[0]).to.deep.equal(new Nav(0, false, false));
            expect(navs4of11[1]).to.deep.equal(new Nav(1, false, false));
            expect(navs4of11[2]).to.deep.equal(new Nav(2, false, false));
            expect(navs4of11[3]).to.deep.equal(new Nav(3, false, false));
            expect(navs4of11[4]).to.deep.equal(new Nav(4, true, false)); // <- selected
            expect(navs4of11[5]).to.deep.equal(new Nav(5, false, false));
            expect(navs4of11[6]).to.deep.equal(new Nav(6, false, false));
            expect(navs4of11[7]).to.deep.equal(new Nav(7, false, false));
            expect(navs4of11[8]).to.deep.equal(new Nav(8, false, false));
            expect(navs4of11[9]).to.deep.equal(new Nav(9, false, false));
            expect(navs4of11[10]).to.deep.equal(new Nav(10, false, false));
          });

        });

      });
    });
  });
});
