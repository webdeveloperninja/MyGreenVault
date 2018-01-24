import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ConstructionService {
    private _isUnderConstructionSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public readonly isUnderConstruction$: Observable<boolean> = this._isUnderConstructionSubject$.asObservable();

    constructor() { }
    
    turnOnConstruction() {
        this._isUnderConstructionSubject$.next(true);
    }

    turnOffConstruction() {
        this._isUnderConstructionSubject$.next(false);
    }

}
