import { Map } from 'immutable'
import * as uuid from 'uuid'

import { DISPATCH, REDUCERS } from './tokens'

export const dispatcher = (targetProto: any, propName: string, descriptor: PropertyDescriptor) => {

  const type = `${propName}:${uuid.v4()}`

  // tslint:disable-next-line:strict-boolean-expressions no-object-mutation
  targetProto[REDUCERS] = (targetProto[REDUCERS] || Map<any, any>()).set(type, descriptor.value)

  // tslint:disable-next-line:no-object-mutation
  descriptor.value = function(this: any, ...args: any[]) {
    this[DISPATCH]({ type, args })
  }

}
