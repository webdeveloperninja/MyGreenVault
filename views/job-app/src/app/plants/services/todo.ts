import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable, BehaviorSubject } from 'rxjs'
import { Router, ActivatedRoute, Params, Event, NavigationEnd } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/finally';

@Injectable()
export class TodoService {
    private _plantNumberSubject$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    public readonly plantNumber$: Observable<string> = this._plantNumberSubject$.asObservable();

    private _todosSubject$: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>(null);
    public readonly todos$: Observable<Array<any>> = this._todosSubject$.asObservable();

    public updatePlantNumber(plantNumber: string) {
        this._plantNumberSubject$.next(plantNumber);
    }

    get() {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.get(`/api/v1/plants/${this._plantNumberSubject$.value}/todos`, { headers: headers, withCredentials: true }).first().subscribe((todos) => {
            this._todosSubject$.next(todos as Array<any>);
        })
    }

    add(todo) {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(`/api/v1/plants/${this._plantNumberSubject$.value}/todos`, todo, { headers: headers }).finally(() => {
            this.get()
        });
    }

    remove(todo) {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        
        return this._http.post(`/api/v1/plants/${this._plantNumberSubject$.value}/todos/remove`, todo, { headers: headers }).finally(() => {
            this.get()
        }).first().subscribe();
    }

    constructor(
        private _http: HttpClient,
        private _route: ActivatedRoute,
        private _router: Router) {
    }

}