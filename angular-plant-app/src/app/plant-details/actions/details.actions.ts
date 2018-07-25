import { Action } from '@ngrx/store';

export enum ActionTypes {
  LoadDetails = '[Plant Details] Load Details',
  DetailsLoaded = '[Plant Details] Details Loaded',
  DetailsLoadFailed = '[Plant Details] Details Load Failed',
  LoadPlantProfileImage = '[Plant Details] Load Plant Profile Image',
  PlantProfileImageLoaded = '[Plant Details] Plant Profile Image Loaded',
  PlantProfileImageLoadFailed = '[Plant Details] Plant Profile Image Load Failed'
}

export class LoadPlantProfileImage implements Action {
  readonly type = ActionTypes.LoadPlantProfileImage;

  constructor(public payload: { plantId: string; image: any }) {}
}

export class PlantProfileImageLoaded implements Action {
  readonly type = ActionTypes.PlantProfileImageLoaded;

  constructor(public payload: { imageSource: any }) {}
}

export class PlantProfileImageLoadFailed implements Action {
  readonly type = ActionTypes.PlantProfileImageLoadFailed;

  constructor(public payload: any) {}
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

export type All =
  | LoadDetailsAction
  | DetailsLoadedAction
  | DetailsLoadFailedAction
  | LoadPlantProfileImage
  | PlantProfileImageLoaded
  | PlantProfileImageLoadFailed;
