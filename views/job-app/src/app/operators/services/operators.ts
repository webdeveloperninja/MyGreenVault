import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs'
import { Router, ActivatedRoute, Params, Event, NavigationEnd } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

export const DEFAULT_SKIP: number = 0;
export const DEFAULT_TAKE: number = 8;

@Injectable()
export class OperatorsService {
    
    private _operatorsSubject$: BehaviorSubject<Operator[]> = new BehaviorSubject<Operator[]>(null);
    public readonly operators$: Observable<Operator[]> = this._operatorsSubject$.asObservable();

    private _moreOperatorsSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public readonly moreOperators$: Observable<boolean> = this._moreOperatorsSubject$.asObservable();

    private _hasPreviousOperatorsSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public readonly hasPreviousOperators$: Observable<boolean> = this._hasPreviousOperatorsSubject$.asObservable();

    private _operatorsSkipSubject$: BehaviorSubject<number> = new BehaviorSubject<number>(null);
    public readonly operatorsSkip$: Observable<number> = this._operatorsSkipSubject$.asObservable();

    private _operatorsTakeSubject$: BehaviorSubject<number> = new BehaviorSubject<number>(null);
    public readonly operatorsTake$: Observable<number> = this._operatorsTakeSubject$.asObservable();

    private _isOperatorsLoadingSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
    public readonly isOperatorsLoading$: Observable<boolean> = this._isOperatorsLoadingSubject$.asObservable();

    private _operatorsQuerySubject$: BehaviorSubject<string> = new BehaviorSubject<string>('');
    public readonly operatorsQuery$: Observable<string> = this._operatorsQuerySubject$.asObservable();

    private _activeOperatorSubject$: BehaviorSubject<Operator> = new BehaviorSubject<Operator>(null);
    public readonly activeOperator$: Observable<Operator> = this._activeOperatorSubject$.asObservable();

    constructor(
        private _http: Http,
        private _route: ActivatedRoute,
        private _router: Router) {
        _router.events.filter(event => event instanceof NavigationEnd).subscribe(event =>  this.doSearch());    
    }

    public doSearch() {
        this._isOperatorsLoadingSubject$.next(true);
        if (this._router.navigated) {
            this._operatorsSkipSubject$.next(this._route.snapshot.queryParams["skip"]);
            this._operatorsTakeSubject$.next(this._route.snapshot.queryParams["take"]);
            this._operatorsQuerySubject$.next(this._route.snapshot.queryParams['query'] || null);
            this.getOperators().first().subscribe(data => {
                this._isOperatorsLoadingSubject$.next(false);
            });
        }
    }

    private getOperators() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = `/api/v1/operators?skip=${this._operatorsSkipSubject$.value}&take=${this._operatorsTakeSubject$.value}`;

        if (this._operatorsQuerySubject$.value) {
            url += `&query=${this._operatorsQuerySubject$.value}`;
        }

        return this._http.get(url, {headers: headers, withCredentials: true}).map((res: Response) => {
            const operators = res.json().data;
            const moreOperators = res.json().more;
            const hasPreviousOperators = this._operatorsSkipSubject$.value != 0;

            this._operatorsSubject$.next(operators);
            this._moreOperatorsSubject$.next(moreOperators);
            this._hasPreviousOperatorsSubject$.next(hasPreviousOperators);

            return operators;
        }).catch(err => {
            throw new Error(err);
        });
    }

    public addOperator(operator) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('/api/v1/operators/', operator, {headers: headers})
            .map((res: Response) => {
                this._moreOperatorsSubject$.next(res.json().more);
                return res.json();
            })
            .catch(err => {
                if (Number(err.status) === Number(403)) {
                    const urlOrigin = window.location.origin;
                    const urlPathName = window.location.pathname;
                    const loginUrl = 'login';
                    window.location.href = `${urlOrigin}${urlPathName}${loginUrl}`;
                }
                return err;
            }).finally(() => {
                this.doSearch();
            })
    }



    public updateOperator(operator) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.put('/api/v1/operators', operator, {headers: headers})
            .map((res: Response) =>  {
                this.doSearch();
                return res;
            }).catch(err => {
                if (Number(err.status) === Number(403)) {
                    const urlOrigin = window.location.origin;
                    const urlPathName = window.location.pathname;
                    const loginUrl = 'login';
                    window.location.href = `${urlOrigin}${urlPathName}${loginUrl}`;
                }
                return err;
            });
    }


    public removeOperator(operator) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this._isOperatorsLoadingSubject$.next(true);
        return this._http.post('/api/v1/operators/remove', operator, {headers: headers})
            .map((res: Response) =>  {
                if (this._operatorsSubject$.value.length === 0) {
                    this.previousPage();
                } else {
                    this.doSearch();
                }
                return res;
            }).catch(err => {
                if (Number(err.status) === Number(403)) {
                    const urlOrigin = window.location.origin;
                    const urlPathName = window.location.pathname;
                    const loginUrl = 'login';
                    window.location.href = `${urlOrigin}${urlPathName}${loginUrl}`;
                }
                return err;
            });
    }
    
    public setActiveOperator(operatorId: string): void {
        let activeOperator = this.operators$.map(operators => operators.filter(operator => operator._id === operatorId)[0]).subscribe(activeOperator => {
            this._activeOperatorSubject$.next(activeOperator);
        });
    }

    public nextPage() {
        this._router.navigate([`/operators`], 
            { queryParams: 
                { 
                    skip: (Number(this._operatorsSkipSubject$.value) + Number(this._operatorsTakeSubject$.value)), 
                    take: Number(this._operatorsTakeSubject$.value),
                    query: this._operatorsQuerySubject$.value
                }
            });
    }

    public previousPage() {
        if (Number(this._operatorsSkipSubject$.value) >= Number(this._operatorsTakeSubject$.value)) {
            this._router.navigate([`/operators`], 
                { queryParams: 
                    { 
                        skip: (Number(this._operatorsSkipSubject$.value) - Number(this._operatorsTakeSubject$.value)), 
                        take: Number(this._operatorsTakeSubject$.value),
                        query: this._operatorsQuerySubject$.value
                    }
                });
        }
    }   
}

export interface Operator {
  companyName: string;
  contactEmail: string;
  contactName: string;
  operatorId: number;
  operatorName: string;
  process: number;
  operatorNumber: string;
  userId: string;
  __v: number;
  _id: string;
}

export interface PagedList {
    skip: number,
    take: number,
    more: boolean,
    data: Operator[]
}