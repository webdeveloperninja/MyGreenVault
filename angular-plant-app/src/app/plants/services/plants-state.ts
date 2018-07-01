import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Plant } from '../models';

export class PlantsState {
  // rename to paged plants
  public _plants$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(null);
  public readonly plants$: Observable<any[]> = this._plants$.asObservable();

  public _allPlants$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(null);
  public readonly allPlants$: Observable<any[]> = this._allPlants$.asObservable();

  public _plantDetailSubject$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public readonly plantDetail$: Observable<any> = this._plantDetailSubject$.asObservable();

  public _isJobDetailLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public readonly isJobDetailLoading$: Observable<any> = this._isJobDetailLoading$.asObservable();

  public _morePlantsSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public readonly morePlants$: Observable<boolean> = this._morePlantsSubject$.asObservable();

  public _hasPreviousPlants$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public readonly hasPreviousPlants$: Observable<boolean> = this._hasPreviousPlants$.asObservable();

  public _plantsSkip$: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  public readonly plantsSkip$: Observable<number> = this._plantsSkip$.asObservable();

  public _plantsTake$: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  public readonly plantsTake$: Observable<number> = this._plantsSkip$.asObservable();

  public _isPlantsLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  public readonly isPlantsLoading$: Observable<boolean> = this._isPlantsLoading$.asObservable();

  public _plantsQuery$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public readonly plantsQuery$: Observable<string> = this._plantsQuery$.asObservable();

  public _activePlantSubject$: BehaviorSubject<Plant> = new BehaviorSubject<Plant>(null);
  public readonly activePlant$: Observable<Plant> = this._activePlantSubject$.asObservable();
}
