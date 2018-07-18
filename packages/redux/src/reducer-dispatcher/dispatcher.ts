import { Map } from 'immutable'
import { Dispatch } from 'redux'
import * as uuid from 'uuid'

import { DISPATCH, ENHANCE_DISPATCHER, REDUCERS } from './tokens'

export const dispatcher = (targetProto: any, propName: string, descriptor: PropertyDescriptor) => {

  const type = `${propName}:${uuid.v4()}`

  // tslint:disable-next-line:strict-boolean-expressions
  targetProto[REDUCERS] = (targetProto[REDUCERS] || Map<any, any>()).set(type, descriptor.value)

  targetProto[ENHANCE_DISPATCHER] = function(dispatch: Dispatch) {
    this[DISPATCH] = dispatch
  }

  // tslint:disable-next-line:readonly-array
  descriptor.value = function(this: any, ...args: any[]) {
    this[DISPATCH]({ type, args })
  }

}
