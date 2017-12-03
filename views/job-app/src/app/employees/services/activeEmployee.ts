import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs'
import { Operator } from './employees';
export { Operator } from './employees';

import 'rxjs/add/operator/map';


@Injectable()
export class ActiveEmployeeService {

    private _activeOperatorSubject: BehaviorSubject<Operator> = new BehaviorSubject(null);
    public readonly activeOperator: Observable<Operator> = this._activeOperatorSubject.asObservable()

    constructor() { }

    setActiveOperator(operator: Operator): void {
        this._activeOperatorSubject.next(operator);
    }

    getActiveOperator(): Observable<Operator> {
        return this.activeOperator;
    }

    removeActiveOperator(): void {
        this._activeOperatorSubject.next(null);
    }

}
