import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable, BehaviorSubject } from 'rxjs'
import { Router, ActivatedRoute, Params, Event, NavigationEnd } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/catch';

import { finalize, first } from 'rxjs/operators';

@Injectable()
export class ExpenseService {

    private _plantNumberSubject$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    public readonly plantNumber$: Observable<string> = this._plantNumberSubject$.asObservable();

    private _expensesSubject$: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>(null);
    public readonly expenses$: Observable<Array<any>> = this._expensesSubject$.asObservable();

    private _expensesLoadingSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public readonly expensesLoading$: Observable<boolean> = this._expensesLoadingSubject$.asObservable();

    constructor(
        private _http: HttpClient,
        private _route: ActivatedRoute,
        private _router: Router) {
    }

    public updatePlantNumber(plantNumber: string) {
        this._plantNumberSubject$.next(plantNumber);
    }

    public getExpenses() {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        this._expensesLoadingSubject$.next(true);

        return this._http.get(`/api/v1/plants/${this._plantNumberSubject$.value}/expenses`,  {headers: headers, withCredentials: true})
        .first().subscribe((expenses) => {
            this._expensesSubject$.next(expenses as Array<any>);
            this._expensesLoadingSubject$.next(false);
        })
    }

    public addExpense(expense) {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        this._expensesLoadingSubject$.next(true);

        return this._http.post(`/api/v1/plants/${this._plantNumberSubject$.value}/expenses`, expense, { headers: headers }).finally(() => {
            this.getExpenses();
            this._expensesLoadingSubject$.next(false);
        })
    }

    public removeExpense(expense) {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        this._expensesLoadingSubject$.next(true);

        return this._http.post(`/api/v1/plants/${this._plantNumberSubject$.value}/expenses/remove`, expense, { headers: headers }).pipe(
            finalize(() => {
                this.getExpenses();
                this._expensesLoadingSubject$.next(false)
            }),
            first()
        );
    }

}
