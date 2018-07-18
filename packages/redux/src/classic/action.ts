import { Action } from 'redux';

export interface IAnyAction extends Action {
  readonly type: string;
  readonly payload?: any;
}

export interface IAction<T> extends IAnyAction {
  readonly payload: T;
}

export const getActionCreator = <T>(type: string) =>
  (payload: T): IAction<T> => ({ payload, type });

export const getActionCreatorBy = <T, I>(type: string, mapFn: (inp: I) => T) =>
  (inp: I): IAction<T> => ({ payload: mapFn(inp), type });

export const getBareActionCreator = (type: string) =>
  (): IAction<void> => ({ payload: undefined, type });
