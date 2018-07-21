import { Action } from '@ngrx/store';

export enum ActionTypes {
  Test = '[Plant Details] test'
}

export class TestAction implements Action {
  readonly type = ActionTypes.Test;
}

export type All = TestAction;  