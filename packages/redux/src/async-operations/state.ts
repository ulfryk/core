import { IAsyncOperationsDoneAction, IAsyncOperationsFailAction, IAsyncOperationsStartAction } from './action'

export class AsyncOperationsState {

  public static empty() {
    return new AsyncOperationsState([], [])
  }

  constructor(
    public readonly failed: ReadonlyArray<IAsyncOperationsFailAction>,
    public readonly pending: ReadonlyArray<IAsyncOperationsStartAction>,
  ) {}

  public start(action: IAsyncOperationsStartAction) {
    return new AsyncOperationsState(this.failed, [...this.pending, action])
  }

  public fail(action: IAsyncOperationsFailAction) {
    return new AsyncOperationsState(
      [...this.failed, action],
      this.pending.filter(({ id }) => id !== action.id))
  }

  public done(action: IAsyncOperationsDoneAction) {
    return this.removePending(action.id)
  }

  public removePending(actionId: string | Symbol) {
    return new AsyncOperationsState(
        this.failed,
        this.pending.filter(({ id }) => id !== actionId))
  }

  public removeFailed(actionId: string | Symbol) {
    return new AsyncOperationsState(
      this.failed.filter(({ id }) => id !== actionId),
      this.pending)
  }

}
