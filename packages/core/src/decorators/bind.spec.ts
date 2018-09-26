/* tslint:disable:no-unused-expression no-magic-numbers max-classes-per-file */
import { expect } from 'chai'

import { Bind } from './bind'

class A {

  @Bind.static
  public static hello(a: string) {
    return new this(a)
  }

  constructor(public readonly a: string) {}

}

class B extends A {

  public static hello(a: string) {
    return new B(a, a.length)
  }

  constructor(a: string, public readonly l: number) {
    super(a)
  }

}

class C extends A {}

describe('decorators', () => {

  describe('Bind', () => {

    describe('static', () => {

      it('should correctly work with subclasses (without override)', () => {
        expect(C.hello('c')).to.be.instanceof(C)
        expect(['c'].map(C.hello)[0]).to.be.instanceof(C)
      })

      it('should correctly work with subclasses (with override)', () => {
        expect(B.hello('b')).to.be.instanceof(B)
        expect(['b'].map(B.hello)[0]).to.be.instanceof(B)
      })

      it('should correctly bind this', () => {
        expect(A.hello('a')).to.be.instanceof(A)
        expect(A.hello('a')).not.to.be.instanceof(B)
        expect(A.hello('a')).not.to.be.instanceof(C)

        expect(['a'].map(A.hello)[0]).to.be.instanceof(A)
        expect(['a'].map(A.hello)[0]).not.to.be.instanceof(B)
        expect(['a'].map(A.hello)[0]).not.to.be.instanceof(C)
      })

    })

  })

})
