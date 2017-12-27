import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable, BehaviorSubject } from 'rxjs'
import { Router, ActivatedRoute, Params, Event, NavigationEnd } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

@Injectable()
export class ExpenseService {

    private _plantNumberSubject$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    public readonly plantNumber$: Observable<string> = this._plantNumberSubject$.asObservable();

    private _expensesSubject$: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>(null);
    public readonly expenses$: Observable<Array<any>> = this._expensesSubject$.asObservable();

    constructor(
        private _http: HttpClient,
        private _route: ActivatedRoute,
        private _router: Router) {
    }

    public updatePlantNumber(plantNumber: string) {
        this._plantNumberSubject$.next(plantNumber);
    }

    public getExpenses() {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.get(`/api/v1/plants/${this._plantNumberSubject$.value}/expenses`,  {headers: headers, withCredentials: true}).first().subscribe((expenses) => {
            this._expensesSubject$.next(expenses as Array<any>);
        })
    }

    public addExpense(expense) {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(`/api/v1/plants/${this._plantNumberSubject$.value}/expenses`, expense, { headers: headers }).finally(() => {
            this.getExpenses()
        })
    }

}
