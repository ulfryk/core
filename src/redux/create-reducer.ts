import { Maybe } from 'monet';
import { Action, Reducer } from 'redux';

import { IAnyAction } from './action';

export const createReducer = <S, A extends Action = IAnyAction>(
  initialState: S,
  mappings: [string, Reducer<S>][],
  defaultReduction = (state: S, _action: A): S => state,
) => {
  const m = new Map(mappings);
  return (state = initialState, action: A): S =>
    Maybe.fromNull(m.get(action.type)).orJust(defaultReduction)(state, action);
};
