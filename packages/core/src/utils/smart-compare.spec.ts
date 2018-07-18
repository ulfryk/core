/* tslint:disable:no-unused-expression */
import { expect } from 'chai'

import { smartCompare } from './smart-compare'

describe('Common - smartCompare()', () => {

  it('should be a function', () => {
    expect(smartCompare).to.be.an.instanceof(Function)
  })

  it('should return 0 if arguments are the same', () => {
    [['0', '0'], ['1', '1'], ['111', '111'], ['abc', 'abc'], ['11a', '11a']]
      .forEach(([a, b]) => {
        expect(smartCompare(a, b)).to.equal(0)
      })
  })

  it('should return -1 if the first argument should come earlier', () => {
    [['0', '1'], ['1', '2'], ['44', '111'], ['abc', 'def'], ['1a', '1b'], ['2a', '10']]
      .forEach(([a, b]) => {
        expect(smartCompare(a, b)).to.equal(-1)
      })
  })

  it('should return 1 if the first argument should come later', () => {
    [['1', '0'], ['2', '1'], ['111', '44'], ['def', 'abc'], ['1c', '1a'], ['10', '2a']]
      .forEach(([a, b]) => {
        expect(smartCompare(a, b)).to.equal(1)
      })
  })

})
