import { Set } from 'immutable'
import { Maybe, None, Some } from 'monet'

import { Bind } from '../../decorators'
import { first } from '../../utils'
import { Envelope } from './envelope'
import { IEnvelopeId } from './envelope-id'

export class Accumulator {

  public static empty(concurrencyLimit: number) {
    return new Accumulator(None<Envelope>(), [], Set<IEnvelopeId>(), concurrencyLimit)
  }

  private constructor(
    public readonly current: Maybe<Envelope>,
    public readonly pending: Envelope[],
    public readonly processing: Set<IEnvelopeId>,
    private readonly concurrencyLimit: number,
  ) {
    Bind.to(this)
    if (process.env.NODE_ENV !== 'production') {
      if (processing.size > this.concurrencyLimit) {
        throw Error(`Number of processed actions (${processing.size}) ` +
          `in queue exceeds limit (${this.concurrencyLimit}).`)
      }
    }
  }

  @Bind public next(action: Envelope) {
    return this.processing.size < this.concurrencyLimit ?
      new Accumulator(
        Some(action),
        this.pending,
        this.processing.add(action.id),
        this.concurrencyLimit) :
      new Accumulator(
        None(),
        this.pending.concat(action),
        this.processing,
        this.concurrencyLimit)
  }

  @Bind public done(doneId: IEnvelopeId) {
    const nextToProcess = first(this.pending)
    return new Accumulator(
      nextToProcess,
      this.pending.slice(1),
      nextToProcess.foldLeft(this.processing.remove(doneId))(
        (processing, { id }) => processing.add(id)),
      this.concurrencyLimit)
  }

}
