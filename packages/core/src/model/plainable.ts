abstract class Plainable<P> {
  public abstract toPlain(): P;
}

interface IPlainableStatic<P, E> {
  fromPlain(plain: P): E;
}

export { IPlainableStatic, Plainable };
