import { RequestState } from '@samwise-tech/core'
import { Either } from 'monet'
import * as uuid from 'uuid'

import { DISPATCH } from '../reducer-dispatcher/tokens'

import { IAsyncOperationsActionBase, IAsyncOperationsDoneAction, IAsyncOperationsFailAction, IAsyncOperationsStartAction } from './action'
import { AsyncOperationsDispatcher } from './dispatcher'

const getAction =
  // tslint:disable-next-line:readonly-array
  (id: string, name: string | Symbol, args: any[]): IAsyncOperationsActionBase => ({
    args,
    id,
    name,
    type: AsyncOperationsDispatcher.ACTION,
  })

const getStartAction =
  (base: IAsyncOperationsActionBase): IAsyncOperationsStartAction => ({
    ...base,
    status: RequestState.Start,
  })

const getFailAction =
  <T>(base: IAsyncOperationsActionBase, reason: T): IAsyncOperationsFailAction<T> => ({
    ...base,
    reason,
    status: RequestState.Fail,
  })

const geDoneAction =
  <T>(base: IAsyncOperationsActionBase, data: T): IAsyncOperationsDoneAction<T> => ({
    ...base,
    data,
    status: RequestState.Success,
  })

export const asyncFactory =
  (dispatcher: AsyncOperationsDispatcher) =>
  (name: string | Symbol, isWrappedEither = true) =>
  (_targetProto: any, propName: string, descriptor: PropertyDescriptor): void => {

    const original = descriptor.value

    // tslint:disable-next-line:readonly-array
    descriptor.value = function(this: any, ...args: any[]) {

      const action = getAction(`${propName}:async:${uuid.v4()}`, name, args)

      dispatcher[DISPATCH](getStartAction(action))

      const promise = original.apply(this, args)

      if (isWrappedEither) {

        promise.then((resolved: Either<any, any>) => {
          resolved.cata(reason => {
            dispatcher[DISPATCH](getFailAction(action, reason))
          }, response => {
            dispatcher[DISPATCH](geDoneAction(action, response))
          })
        }, (reason: any) => {
          dispatcher[DISPATCH](getFailAction(action, reason))
        })

      } else {

        promise.then((response: any) => {
          dispatcher[DISPATCH](geDoneAction(action, response))
        }, (reason: any) => {
          dispatcher[DISPATCH](getFailAction(action, reason))
        })

      }

      return promise
    }

  }

export const async = asyncFactory(AsyncOperationsDispatcher.instance())
