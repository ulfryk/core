import * as uuid from 'uuid';

import { QueueAction } from './action';
import { IEnvelopeId } from './envelope-id';
import { Result } from './result';

export class Envelope<T = any> {

  public static of<V>(action: QueueAction<V>, label?: string) {
    return new Envelope<V>(action, uuid.v4() as IEnvelopeId, label);
  }

  private constructor(
    public readonly action: QueueAction<T>,
    public readonly id: IEnvelopeId,
    public readonly label: string = 'unknown',
  ) {}

  public run(): Promise<Result<T>> {
    const { id, label } = this;
    return this.action().then(Result.success(id, label), Result.fail<T>(id, label));
  }

  public toString() {
    return `Envelope { ${this.label} :: ${this.id} }`;
  }

}
