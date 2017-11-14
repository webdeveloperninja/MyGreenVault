import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs'
import { Router, ActivatedRoute, Params, Event, NavigationEnd } from '@angular/router';
import { NotificationService, DEFAULT_NOTIFICATION_TIME } from '../../shared/services/notification/notification.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

export const DEFAULT_SKIP: number = 0;
export const DEFAULT_TAKE: number = 8;

@Injectable()
export class ToolsService {
    
    private _toolsSubject$: BehaviorSubject<Tool[]> = new BehaviorSubject<Tool[]>(null);
    public readonly tools$: Observable<Tool[]> = this._toolsSubject$.asObservable();

    private _moreToolsSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public readonly moreTools$: Observable<boolean> = this._moreToolsSubject$.asObservable();

    private _hasPreviousToolsSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public readonly hasPreviousTools$: Observable<boolean> = this._hasPreviousToolsSubject$.asObservable();

    private _toolsSkipSubject$: BehaviorSubject<number> = new BehaviorSubject<number>(null);
    public readonly toolsSkip$: Observable<number> = this._toolsSkipSubject$.asObservable();

    private _toolsTakeSubject$: BehaviorSubject<number> = new BehaviorSubject<number>(null);
    public readonly toolsTake$: Observable<number> = this._toolsSkipSubject$.asObservable();

    private _istoolsLoadingSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
    public readonly istoolsLoading$: Observable<boolean> = this._istoolsLoadingSubject$.asObservable();

    private _toolsQuerySubject$: BehaviorSubject<string> = new BehaviorSubject<string>('');
    public readonly toolsQuery$: Observable<string> = this._toolsQuerySubject$.asObservable();

    private _activetoolSubject$: BehaviorSubject<Tool> = new BehaviorSubject<Tool>(null);
    public readonly activetool$: Observable<Tool> = this._activetoolSubject$.asObservable();


    constructor(
        private _http: Http,
        private _route: ActivatedRoute,
        private _router: Router,
        private _notificationService: NotificationService) {
        _router.events.filter(event => event instanceof NavigationEnd).subscribe(event =>  this.doSearch());    

    }

    public doSearch() {
        this._istoolsLoadingSubject$.next(true);
        if (this._router.navigated) {
            this._toolsSkipSubject$.next(this._route.snapshot.queryParams["skip"]);
            this._toolsTakeSubject$.next(this._route.snapshot.queryParams["take"]);
            this._toolsQuerySubject$.next(this._route.snapshot.queryParams['query'] || null);
            this.getTools().first().subscribe();
            this._istoolsLoadingSubject$.next(false);
        }
    }

    private getTools() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = `/api/v1/tools?skip=${this._toolsSkipSubject$.value}&take=${this._toolsTakeSubject$.value}`;

        if (this._toolsQuerySubject$.value) {
            url += `&query=${this._toolsQuerySubject$.value}`;
        }

        return this._http.get(url, {headers: headers, withCredentials: true}).map((res: Response) => {
            const tools = res.json().data;
            const moreTools = res.json().more;
            const hasPreviousTools = this._toolsSkipSubject$.value != 0;

            this._toolsSubject$.next(tools);
            this._moreToolsSubject$.next(moreTools);
            this._hasPreviousToolsSubject$.next(hasPreviousTools);

            return tools;
        }).catch(err => {
            throw new Error(err);
        });
    }

    public addTool(tool) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('/api/v1/tools/', tool, {headers: headers}) // ...using post request
            .map((res: Response) => {
                res.json();
                this._moreToolsSubject$.next(res.json().more);
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



    public updateTool(tool) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.put('/api/v1/tools', tool, {headers: headers})
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

    public checkoutTool(checkout) {
        // This will be string of async to checkout. 
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('/api/v1/checkouts', checkout, {headers: headers})
            .map((res: Response) => {
                this.doSearch();
                this.setNotification('Successfully checked out tool');
                return res.json()
            });
    }

    public removeTool(tool) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this._istoolsLoadingSubject$.next(true);
        return this._http.post('/api/v1/tools/remove', tool, {headers: headers})
            .map((res: Response) =>  {
                if (this._toolsSubject$.value.length === 0) {
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

    public setActivetool(toolId: string): void {
        let activetool = this.tools$.map(tools => tools.filter(tool => tool._id === toolId)[0]).subscribe(activetool => {
            this._activetoolSubject$.next(activetool);
        });
    }

    public nextPage() {
        this._router.navigate([`/tools`], 
            { queryParams: 
                { 
                    skip: (Number(this._toolsSkipSubject$.value) + Number(this._toolsTakeSubject$.value)), 
                    take: Number(this._toolsTakeSubject$.value),
                    query: this._toolsQuerySubject$.value
                }
            });
    }

    public previousPage() {
        if (Number(this._toolsSkipSubject$.value) >= Number(this._toolsTakeSubject$.value)) {
            this._router.navigate([`/tools`], 
                { queryParams: 
                    { 
                        skip: (Number(this._toolsSkipSubject$.value) - Number(this._toolsTakeSubject$.value)), 
                        take: Number(this._toolsTakeSubject$.value),
                        query: this._toolsQuerySubject$.value
                    }
                });
        }
    }   

    public setNotification(message) {
        this._notificationService.setNotificationOn(message);
        Observable.timer(DEFAULT_NOTIFICATION_TIME).subscribe(() => {
            this._notificationService.setNotificationOff();
        });
    }
}


export interface Tool {
    companyName: string;
    contactEmail: string;
    contactName: string;
    toolId: number;
    toolName: string;
    process: number;
    toolNumber: string;
    userId: string;
    __v: number;
    _id: string;
}

export interface PagedList {
    skip: number,
    take: number,
    more: boolean,
    data: Tool[]
}