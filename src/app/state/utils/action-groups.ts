import { Action, emptyProps, props } from '@ngrx/store';

export type BaseActionGroup = {
  request: Action;
  success: Action;
  error: Action & { error?: any };
};

export const baseEvents = {
  Request: emptyProps(),
  Success: emptyProps(),
  Error: props<{ error: any }>(),
};
