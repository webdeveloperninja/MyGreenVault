import { Action } from '@ngrx/store';

export enum ActionTypes {
  LoadDetails = '[Plant Details] Load Details',
  DetailsLoaded = '[Plant Details] Details Loaded',
  DetailsLoadFailed = '[Plant Details] Details Load Failed'
}

export class LoadDetailsAction implements Action {
  readonly type = ActionTypes.LoadDetails;
  constructor(public payload: { plantId: string }) {}
}

export class DetailsLoadedAction implements Action {
  readonly type = ActionTypes.DetailsLoaded;
  constructor(public payload: any) {}
}

export class DetailsLoadFailedAction implements Action {
  readonly type = ActionTypes.DetailsLoadFailed;
  constructor(public payload: any) {}
}

export type All = LoadDetailsAction | DetailsLoadedAction | DetailsLoadFailedAction;
