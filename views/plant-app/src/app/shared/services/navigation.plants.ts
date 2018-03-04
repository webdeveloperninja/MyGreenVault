import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs'

export const defaultSkip: number = 0;
export const defaultTake: number = 8;

/*
    move to shared sidenav needs it
*/

@Injectable()
export class PlantsNavigationService {
    
    private _skipSubject$: BehaviorSubject<number> = new BehaviorSubject<number>(defaultSkip);
    public readonly skip$: Observable<number> = this._skipSubject$.asObservable();

    private _takeSubject$: BehaviorSubject<number> = new BehaviorSubject<number>(defaultTake);
    public readonly take$: Observable<number> = this._takeSubject$.asObservable();

    constructor() {}

    public updateSkip(skip: number): void {
        this._skipSubject$.next(skip);
    }

    public updateTake(take: number): void {
        this._takeSubject$.next(take);
    }
    
}
