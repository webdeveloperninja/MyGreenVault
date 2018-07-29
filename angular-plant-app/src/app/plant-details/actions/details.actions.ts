import { Action } from '@ngrx/store';

export enum ActionTypes {
  LoadDetails = '[Plant Details] Load Details',
  DetailsLoaded = '[Plant Details] Details Loaded',
  DetailsLoadFailed = '[Plant Details] Details Load Failed',
  LoadPlantProfileImage = '[Plant Details] Load Plant Profile Image',
  PlantProfileImageLoaded = '[Plant Details] Plant Profile Image Loaded',
  PlantProfileImageLoadFailed = '[Plant Details] Plant Profile Image Load Failed',
  LoadPlantWeeks = '[Plant Details] Load Plant Weeks',
  PlantWeeksLoaded = '[Plant Details] Plant Weeks Loaded',
  PlantWeeksLoadFailed = '[Plant Details] Plant Weeks Load Failed',
  SelectPlantWeek = '[Plant Details] Plant Week Clicked',
  UpdateWeek = '[Plant Details] Update Week',
  WeekUpdated = '[Plant Details] Week Updated',
  UpdateWeekFailed = '[Plant Details] Update Week Failed'
}

export class LoadPlantProfileImage implements Action {
  readonly type = ActionTypes.LoadPlantProfileImage;

  constructor(public payload: { image: any }) {}
}

export class PlantProfileImageLoaded implements Action {
  readonly type = ActionTypes.PlantProfileImageLoaded;

  constructor(public payload: { imageSource: any; plantId: string }) {}
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

export class LoadPlantWeeks implements Action {
  readonly type = ActionTypes.LoadPlantWeeks;
  constructor(public payload: string[]) {}
}

export class PlantWeeksLoaded implements Action {
  readonly type = ActionTypes.PlantWeeksLoaded;
  constructor(public payload: any[]) {}
}

export class PlantWeeksLoadFailed implements Action {
  readonly type = ActionTypes.PlantWeeksLoadFailed;
  constructor(public payload: any) {}
}

export class SelectPlantWeek implements Action {
  readonly type = ActionTypes.SelectPlantWeek;
  constructor(public payload: string) {}
}

export class UpdateWeek implements Action {
  readonly type = ActionTypes.UpdateWeek;
  constructor(public payload: { weekId: string; week: any }) {}
}

export class WeekUpdated implements Action {
  readonly type = ActionTypes.WeekUpdated;
  constructor(public payload: any) {}
}
export class UpdateWeekFailed implements Action {
  readonly type = ActionTypes.UpdateWeekFailed;
  constructor(public payload: any) {}
}

export type All =
  | LoadDetailsAction
  | DetailsLoadedAction
  | DetailsLoadFailedAction
  | LoadPlantProfileImage
  | PlantProfileImageLoaded
  | PlantProfileImageLoadFailed
  | LoadPlantWeeks
  | PlantWeeksLoaded
  | PlantWeeksLoadFailed
  | SelectPlantWeek
  | UpdateWeek
  | WeekUpdated
  | UpdateWeekFailed;
