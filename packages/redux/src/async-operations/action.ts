import { RequestState } from '@samwise-tech/core'
import { Action } from 'redux'

export interface IAsyncOperationsActionBase extends Action<string> {
  readonly args: ReadonlyArray<any>,
  readonly id: string
  readonly name: string | Symbol
}

export interface IAsyncOperationsStartAction extends IAsyncOperationsActionBase {
  readonly status: RequestState.Start
}

export interface IAsyncOperationsFailAction<E = any> extends IAsyncOperationsActionBase {
  readonly reason: E
  readonly status: RequestState.Fail
}

export interface IAsyncOperationsDoneAction<D = any> extends IAsyncOperationsActionBase {
  readonly data: D
  readonly status: RequestState.Success
}

export type IAsyncOperationsAction<D = any, E = any> = IAsyncOperationsStartAction
                                                     | IAsyncOperationsFailAction<E>
                                                     | IAsyncOperationsDoneAction<D>

export interface IRemoveAction extends Action<string> {
  readonly id: string
  readonly status: RequestState.Start | RequestState.Fail
}
