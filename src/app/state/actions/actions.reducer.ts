import { Action } from '@ngrx/store';
import { ActionsState } from './actions.model';

export function getActionName(actionType: string): string {
  return typeof actionType !== 'string'
    ? ''
    : actionType.split(' ').slice(0, -1).join(' ');
}

export function actionsReducer(
  state: ActionsState | undefined,
  action: Action & { error?: any }
): ActionsState {
  const { type } = action;
  const actionName = getActionName(type);

  if (!actionName || !state) {
    return {
      ...state,
    };
  }

  if (type.endsWith(' Request')) {
    return {
      ...state,
      [actionName]: {
        ...state[actionName],
        pending: true,
        error: null,
      },
    };
  }

  if (type.endsWith(' Success')) {
    return {
      ...state,
      [actionName]: {
        pending: false,
        error: null,
        completed: true,
      },
    };
  }

  if (type.endsWith(' Cancel')) {
    return {
      ...state,
      [actionName]: {
        ...state[actionName],
        pending: false,
        error: null,
      },
    };
  }

  if (type.endsWith(' Error')) {
    return {
      ...state,
      [actionName]: {
        ...state[actionName],
        pending: false,
        error: action.error,
      },
    };
  }

  if (type.endsWith(' Reset')) {
    return {
      ...state,
      [actionName]: {
        ...state[actionName],
        pending: false,
        completed: false,
        error: null,
      },
    };
  }

  return {
    ...state,
  };
}
