import { Either, Left, Right } from 'monet';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Accumulator } from './accumulator';
import { QueueAction } from './action';
import { Envelope } from './envelope';
import { IEnvelopeId } from './envelope-id';
import { Result } from './result';

export class Queue {

  private readonly input = new Subject<Either<IEnvelopeId, Envelope>>();
  private readonly output = new Subject<Result>();

  constructor(concurrencyLimit: number) {
    this.input
      .scan((acc, next) => next.cata(acc.done, acc.next), Accumulator.empty(concurrencyLimit))
      .flatMap(({ current }) => current.cata(
        () => Observable.empty<Result>(),
        action => Observable.fromPromise(action.run())))
      .subscribe(result => {
        this.input.next(Left(result.id));
        this.output.next(result);
      });
  }

  public runTask<O>(action: QueueAction<O>, label?: string): Promise<O> {
    const envelope = Envelope.of(action, label);
    this.input.next(Right(envelope));
    return (this.output as Observable<Result<O>>)
      .share()
      .filter(({ id }) => id === envelope.id)
      .map(({ data }) => data)
      .first()
      .toPromise()
      .then(data => data.cata(
        error => Promise.reject<O>(error),
        success => Promise.resolve(success)));
  }

}
