import { Either, Left, Right } from 'monet'

import { IEnvelopeId } from './envelope-id'

export class Result<T = any> {

  public static success(id: IEnvelopeId, label?: string) {
    return <V>(data: V) => new Result<V>(Right<any, V>(data), id, label)
  }

  public static fail<V>(id: IEnvelopeId, label?: string) {
    return (error: any) => new Result<V>(Left<any, V>(error), id, label)
  }

  constructor(
    public readonly data: Either<any, T>,
    public readonly id: IEnvelopeId,
    public readonly label?: string,
  ) {}

}
