/* tslint:disable:no-unused-expression no-magic-numbers */
import { expect } from 'chai';

import { getNumOr } from './get-num-or';

describe('utils', () => {

  describe('getNumOr(a, b)', () => {

    it('should be a function', () => {
      expect(getNumOr).to.be.an.instanceof(Function);
    });

    it('should return the first arg if it is a finite number', () => {
      expect(getNumOr(12, 9999999999)).to.equal(12);
      expect(getNumOr(0.001, 9999999999)).to.equal(0.001);
      expect(getNumOr(-123.12, 9999999999)).to.equal(-123.12);
      expect(getNumOr(0, 9999999999)).to.equal(0);
    });

    it('should return the second arg if the first is not a finite number', () => {
      expect(getNumOr(null, 12)).to.equal(12);
      expect(getNumOr(undefined, 12)).to.equal(12);
      expect(getNumOr(NaN, 12)).to.equal(12);
      expect(getNumOr(Infinity, 12)).to.equal(12);
    });

  });

});
