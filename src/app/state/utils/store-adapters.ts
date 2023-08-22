import { ActionCreator } from '@ngrx/store';
import { OnReducer } from '@ngrx/store/src/reducer_creator';

type SetField = <S, A extends readonly ActionCreator[]>(
  stateKey: keyof S,
  actionKey?: string
) => OnReducer<S, A>;
export const setField: SetField = (stateKey, actionKey) => (state, action) => ({
  ...state,
  [stateKey]: (action as any)[actionKey || stateKey],
});
