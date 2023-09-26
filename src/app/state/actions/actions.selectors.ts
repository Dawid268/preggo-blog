import { createFeatureSelector, createSelector, Action } from '@ngrx/store';

import { ActionsState, actionsFeatureKey } from './actions.model';
import { getActionName } from './actions.reducer';
import { BaseActionGroup } from '../utils/action-groups';

export const selectActionsState =
  createFeatureSelector<ActionsState>(actionsFeatureKey);

export const selectActionState = (action: BaseActionGroup) =>
  createSelector(selectActionsState, actions => {
    const actionName = getActionName(action.request.type);
    return actions[actionName];
  });

export const selectActionPending = (action: BaseActionGroup) =>
  createSelector(selectActionsState, actions => {
    const actionName = getActionName(action.request.type);
    return actions[actionName]?.pending ?? undefined;
  });

export const selectActionCompleted = (action: BaseActionGroup) =>
  createSelector(selectActionsState, actions => {
    const actionName = getActionName(action.request.type);
    return actions[actionName]?.completed ?? undefined;
  });

export const selectActionErrorState = (action: BaseActionGroup) =>
  createSelector(
    selectActionsState,
    (actions: ActionsState): any | undefined => {
      const actionName = getActionName(action.request.type);
      return actions[actionName]?.error ?? undefined;
    }
  );

export const selectActionsPending = (actions: BaseActionGroup[]) =>
  createSelector(
    selectActionsState,
    (actionsState: ActionsState): boolean | undefined => {
      return actions.some(action => {
        const actionName = getActionName(action.request.type);
        return actionsState[actionName]?.pending;
      });
    }
  );

export const selectActionsErrorState = (actions: BaseActionGroup[]) =>
  createSelector(
    selectActionsState,
    (actionsState: ActionsState): any[] | undefined => {
      return actions
        .map(action => {
          const actionName = getActionName(action.request.type);
          return actionsState[actionName]?.error;
        })
        .filter(Boolean);
    }
  );
