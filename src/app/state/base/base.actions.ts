import { createActionGroup, props } from '@ngrx/store';
import { baseEvents } from '../utils/action-groups';

const getCurrentBreakpoint = createActionGroup({
  source: 'Base - Get current breakpoint',
  events: {
    ...baseEvents,
    Success: props<{ screenSize: string }>(),
  },
});

export const BaseActions = {
  getCurrentBreakpoint,
};
