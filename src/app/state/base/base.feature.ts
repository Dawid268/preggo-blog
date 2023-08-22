import { createFeature, createReducer, createSelector, on } from '@ngrx/store';

import { BaseState, ScreenSize } from './base.model';
import { BaseActions } from './base.actions';
import { setField } from '../utils/store-adapters';

const initialState: BaseState = {
  screenSize: ScreenSize.XLarge,
};

export const baseFeature = createFeature({
  name: 'base',
  reducer: createReducer(
    initialState,
    on(BaseActions.getCurrentBreakpoint.success, setField('screenSize'))
  ),
  extraSelectors: ({ selectBaseState }) => ({
    selectScreenSize: createSelector(
      selectBaseState,
      state => state.screenSize
    ),
  }),
});

export const { name, selectBaseState, selectScreenSize } = baseFeature;
