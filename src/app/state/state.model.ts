import { BaseState, baseFeature } from './base';

export interface AppState {
  [baseFeature.name]: BaseState;
}
