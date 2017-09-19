import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable, BehaviorSubject} from 'rxjs'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { Router, ActivatedRoute, Params } from '@angular/router';

export const DEFAULT_SKIP: number = 0;
export const DEFAULT_TAKE: number = 8;


@Injectable()
export class OperatorsService {
    skip: number = 0;
    take: number = 5;

    private _operatorsSubject$: BehaviorSubject<Operator[]> = new BehaviorSubject<Operator[]>(null);
    public readonly operators$: Observable<Operator[]> = this._operatorsSubject$.asObservable();

    private _moreOperatorsSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public readonly moreOperators$: Observable<boolean> = this._moreOperatorsSubject$.asObservable();

    private _operatorsSkipSubject$: BehaviorSubject<number> = new BehaviorSubject<number>(DEFAULT_SKIP);
    public readonly operatorsSkip$: Observable<number> = this._operatorsSkipSubject$.asObservable();

    private _operatorsTakeSubject$: BehaviorSubject<number> = new BehaviorSubject<number>(DEFAULT_TAKE);
    public readonly operatorsTake$: Observable<number> = this._operatorsSkipSubject$.asObservable();

    private _isLoadingSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public readonly isLoading$: Observable<boolean> = this._isLoadingSubject$.asObservable();

    private _activeOperatorSubject$: BehaviorSubject<Operator> = new BehaviorSubject<Operator>(null);
    public readonly activeOperator$: Observable<Operator> = this._activeOperatorSubject$.asObservable();


    constructor(
        private _http: Http,
        private _route: ActivatedRoute,
        private _router: Router
        ) {}

    addOperator(operator) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('/api/v1/operators/', operator, {headers: headers}) // ...using post request
            .map((res: Response) => {
                res.json()
            })
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...
    }

    getOperators(skip, take) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this._isLoadingSubject$.next(true);
        return this._http.get(`/api/v1/operators?skip=${skip}&take=${take}`, {headers: headers, withCredentials: true}).map((res: Response) => { 
            this._isLoadingSubject$.next(false);
            this._operatorsSubject$.next(res.json().data)
            this._moreOperatorsSubject$.next(res.json().more);
            this._operatorsSkipSubject$.next(res.json().skip);
            this._operatorsTakeSubject$.next(res.json().take);
        });
    }


    updateOperator(operator) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.put('/api/v1/operators', operator, {headers: headers})
            .map((res: Response) =>  {
                return res.json() 
        })
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); 
    }

    setActiveOperator(operatorId: string): void {
        let activeoperator = this.operators$.map(operators => operators.filter(operator => operator._id === operatorId)[0]).subscribe(activeoperator => {
            this._activeOperatorSubject$.next(activeoperator);
        });
    }

    removeOperator(operator) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this._isLoadingSubject$.next(true);
        return this._http.post('/api/v1/operators/remove', operator, {headers: headers})
            .map((res: Response) =>  {
                this._isLoadingSubject$.next(false);
                return res.json() 
            })
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); 
    }

    nextPage(skip, take) {
        this._operatorsSkipSubject$.next(this._operatorsSkipSubject$.value + this._operatorsTakeSubject$.value);
        this.getOperators(skip, take).first().subscribe();
    }

    previousPage(skip, take) {
        if(this._operatorsSkipSubject$.value >= this._operatorsTakeSubject$.value) {
            this._operatorsSkipSubject$.next(this._operatorsSkipSubject$.value - this._operatorsTakeSubject$.value);
            this.getOperators(skip, take).first().subscribe();
        }
    }

    getQueryParams() {
        this.skip = this._route.snapshot.queryParams["skip"];
        this.take = this._route.snapshot.queryParams["take"];
        console.log('inside get query params of the tools service - skip value', this.skip);
        console.log('inside of the getQueyrParams service - take value', this.take);        
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