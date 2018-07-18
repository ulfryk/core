import { Either, Left, Right } from 'monet'

interface ISerializedLeft<E> {
  readonly isRightValue: false
  readonly value: E
}

interface ISerializedRight<V> {
  readonly isRightValue: true
  readonly value: V
}

type ISerializedEither<E, V> = ISerializedLeft<E> | ISerializedRight<V>

const isRight = <E, V>(e: ISerializedEither<E, V>): e is ISerializedRight<V> => e.isRightValue

const toEither = <E, V>(e: ISerializedEither<E, V>): Either<E, V> =>
  isRight(e) ? Right<E, V>(e.value) : Left<E, V>(e.value)

export { ISerializedEither, ISerializedLeft, ISerializedRight, toEither }
