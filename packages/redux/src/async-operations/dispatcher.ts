import { RequestState } from '@samwise-tech/core'
import { AnyAction, Dispatch } from 'redux'

import { Reducer } from '../reducer-dispatcher/reducer'
import { DISPATCH } from '../reducer-dispatcher/tokens'

import { IAsyncOperationsAction, IRemoveAction } from './action'
import { AsyncOperationsState } from './state'

export class AsyncOperationsDispatcher extends Reducer<AsyncOperationsState> {

  public static readonly ACTION = '@SAMWISE-TECH/REDUX/ASYNC'
  public static readonly REMOVE_ACTION = '@SAMWISE-TECH/REDUX/ASYNC_REMOVE'

  private static readonly __instance = new AsyncOperationsDispatcher()

  public static instance() {
    return this.__instance
  }

  public readonly [DISPATCH]!: Dispatch

  constructor() {
    super(AsyncOperationsState.empty())
    this.reduce = this.reduce.bind(this)
  }

  public removeFailed(id: string): void {
    this[DISPATCH]({
      id,
      status: RequestState.Fail,
      type: AsyncOperationsDispatcher.REMOVE_ACTION,
    })
  }

  public removePending(id: string): void {
    this[DISPATCH]({
      id,
      status: RequestState.Start,
      type: AsyncOperationsDispatcher.REMOVE_ACTION,
    })
  }

  public reduce(state = this.state, action: AnyAction) {
    return this.isAsyncAction(action) ?
      this.reduceAsyncOperations(state, action) :
      this.isRemoveAction(action) ?
        this.reduceRemoveOperations(state, action) :
        state
  }

  private reduceAsyncOperations(state: AsyncOperationsState, action: IAsyncOperationsAction) {
    switch (action.status) {
      case RequestState.Start: return state.start(action)
      case RequestState.Fail: return state.fail(action)
      case RequestState.Success: return state.done(action)
      default: return state
    }
  }

  private reduceRemoveOperations(state: AsyncOperationsState, action: IRemoveAction) {
    switch (action.status) {
      case RequestState.Start: return state.removePending(action.id)
      case RequestState.Fail: return state.removeFailed(action.id)
      default: return state
    }
  }

  private isAsyncAction(a: AnyAction): a is IAsyncOperationsAction {
    return Boolean(a) && a.type === AsyncOperationsDispatcher.ACTION
  }

  private isRemoveAction(a: AnyAction): a is IRemoveAction {
    return Boolean(a) && a.type === AsyncOperationsDispatcher.REMOVE_ACTION
  }

}

export const asyncDispatcher = new AsyncOperationsDispatcher()
