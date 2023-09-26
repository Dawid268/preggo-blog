export interface ActionState {
  pending: boolean;
  error: any;
  completed: boolean;
}

export interface ActionsState {
  [actionName: string]: ActionState;
}

export const actionsFeatureKey = 'actions';
