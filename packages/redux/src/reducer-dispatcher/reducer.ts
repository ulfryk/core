import { Map } from 'immutable'
import { Maybe } from 'monet'
import { combineReducers, Dispatch, Reducer as ReduxReducer, StoreEnhancer } from 'redux'

import { ENHANCE_DISPATCHER, REDUCERS } from './tokens'

export abstract class Reducer<S> {

  public static applyReducers(reducers: Map<string, Reducer<any>>): StoreEnhancer<any, any> {
    return (next: any) =>
      (reducer: any, preloadedState: any) => {
        const store = next(reducer, preloadedState)

        reducers.forEach(one => {
          (one as Reducer<any>)[ENHANCE_DISPATCHER](store.dispatch)
        })

        return store
      }
  }

  public static combineReducers(reducers: Map<string, Reducer<any>>) {
    return combineReducers(reducers.map(one => (one as Reducer<any>).reduce).toObject())
  }

  private readonly [REDUCERS]: Map<string, ReduxReducer<S>>
  private readonly [ENHANCE_DISPATCHER]: (dispatch: Dispatch) => void

  constructor(protected state: S) {
    this.reduce = this.reduce.bind(this)
  }

  public reduce(state: S | undefined, { args, type }: any) {
    this.state = Maybe.fromNull(state).orJust(this.state)

    Maybe.fromNull(this[REDUCERS].get(type)).forEach(reduction => reduction.apply(this, args))

    return this.state
  }

}
