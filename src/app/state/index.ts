import { isDevMode, NgModule } from '@angular/core';

import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer,
  StoreModule,
} from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { localStorageSync } from 'ngrx-store-localstorage';

import { BaseFacade, baseFeature } from './base';
import { AppState } from './state.model';

export const facades = [BaseFacade];

export const reducers: ActionReducerMap<AppState> = {
  [baseFeature.name]: baseFeature.reducer,
};

const debug =
  (reducer: ActionReducer<AppState>): ActionReducer<AppState> =>
  (state, action) => {
    return reducer(state, action);
  };

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({ keys: ['base', 'auth'], rehydrate: true })(reducer);
}

export const metaReducers: MetaReducer<AppState>[] = isDevMode()
  ? [debug, localStorageSyncReducer]
  : [localStorageSyncReducer];

@NgModule({
  imports: [
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
})
export class AppStoreModule {}
