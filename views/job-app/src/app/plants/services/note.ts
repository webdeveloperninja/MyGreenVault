import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable, BehaviorSubject } from 'rxjs'
import { Router, ActivatedRoute, Params, Event, NavigationEnd } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/catch';

@Injectable()
export class NoteService {
    private _plantNumberSubject$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    public readonly plantNumber$: Observable<string> = this._plantNumberSubject$.asObservable();

    private _notesSubject$: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>(null);
    public readonly notes$: Observable<Array<any>> = this._notesSubject$.asObservable();

    public updatePlantNumber(plantNumber: string) {
        this._plantNumberSubject$.next(plantNumber);
    }

    get() {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.get(`/api/v1/plants/${this._plantNumberSubject$.value}/notes`, { headers: headers, withCredentials: true }).first().subscribe((todos) => {
            this._notesSubject$.next(todos as Array<any>);
        })
    }

    add(note) {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(`/api/v1/plants/${this._plantNumberSubject$.value}/notes`, note, { headers: headers }).finally(() => {
            this.get()
        });
    }

    remove(note) {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        
        return this._http.post(`/api/v1/plants/${this._plantNumberSubject$.value}/notes/remove`, note, { headers: headers }).finally(() => {
            this.get()
        }).first().subscribe();
    }

    constructor(
        private _http: HttpClient,
        private _route: ActivatedRoute,
        private _router: Router) {
    }

}