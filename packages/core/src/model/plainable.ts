abstract class Plainable<P> {
  public abstract toPlain(): P
}

interface IPlainableStatic<P, E> {
  // tslint:disable-next-line:no-method-signature
  fromPlain(plain: P): E
}

export { IPlainableStatic, Plainable }
