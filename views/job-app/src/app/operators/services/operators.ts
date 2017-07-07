import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import { SidebarService } from './sidebar';
import {Observable, BehaviorSubject} from 'rxjs'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';


@Injectable()
export class OperatorsService {
    
    private _operatorsSubject$: BehaviorSubject<IOperator[]> = new BehaviorSubject<IOperator[]>(null);
    public readonly operators$: Observable<IOperator[]> = this._operatorsSubject$.asObservable();

    private _isOperatorsLoadingSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
    public readonly isOperatorsLoading$: Observable<boolean> = this._isOperatorsLoadingSubject$.asObservable();

    private _activeOperatorSubject$: BehaviorSubject<IOperator> = new BehaviorSubject<IOperator>(null);
    public readonly activeOperator$: Observable<IOperator> = this._activeOperatorSubject$.asObservable();


    constructor(
        private _http: Http,
        private _sidebarService: SidebarService
        ) {
    }

    addOperator(operator) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('/api/v1/operator/', operator, {headers: headers}) // ...using post request
            .map((res: Response) => res.json()) // ...and callingls .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...
    }

    getOperators(skip = 0, take = 8) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this._isOperatorsLoadingSubject$.next(true);
        return this._http.get(`/api/v1/operators?skip=${skip}&take=${take}`, {headers: headers, withCredentials: true}).map((res: Response) => { 
            this._operatorsSubject$.next(res.json().data)
            return res.json();
        });
    }


    updateOperator(operator) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('/api/v1/update-operator', operator, {headers: headers})
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
        return this._http.post('/api/v1/remove-operator', operator, {headers: headers})
            .map((res: Response) =>  {
                return res.json() 
        })
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); 
    }


}

export interface IOperator {
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

export interface IPagedList {
    skip: number,
    take: number,
    more: boolean,
    data: IOperator[]
}