/* tslint:disable:no-unused-expression strict-boolean-expressions no-magic-numbers */
import { expect } from 'chai'

import { multiSum } from './multi-sum'

interface ITestItem {
  readonly a?: number
  readonly b?: number
  readonly c?: number
}

const testData: ITestItem[] = [
  { a: 6, b: 4, c: 3 },
  { a: 8, b: 2, c: 1 },
  { b: 2, c: 1 },
]

describe('utils', () => {

  describe('multiSum(a, ...b)', () => {

    it('should be a function', () => {
      expect(multiSum).to.be.an.instanceof(Function)
    })

    it('should return an array consisting of a sum of max values', () => {
      expect(
        multiSum<ITestItem>(testData, ({ a, b, c }) => Math.max(...[a || 0, b || 0, c || 0])),
      ).to.deep.equal([16])
    })

    it('should return an array consisting of sums of values returned by provided functions', () => {
      expect(multiSum<ITestItem>(testData,
        ({ a }: ITestItem) => a || 0,
        ({ b }: ITestItem) => b || 0,
        ({ c }: ITestItem) => c || 0,
      )).to.deep.equal([14, 8, 5])
    })

  })

})
