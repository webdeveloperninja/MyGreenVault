import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable, BehaviorSubject} from 'rxjs'
import 'rxjs/add/operator/map';

@Injectable()
export class SidebarService {

    private _sidebarHiddenSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
    public readonly sidebarHidden = this._sidebarHiddenSubject.asObservable();

    constructor(private _http: Http) {
    }

    shutSidebar() {
        this._sidebarHiddenSubject.next(false);
    }

    openSidebar() {
        this._sidebarHiddenSubject.next(true);
    }
}




