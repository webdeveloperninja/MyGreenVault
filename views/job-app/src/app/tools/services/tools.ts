import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import { SidebarService } from './sidebar';
import {Observable, BehaviorSubject} from 'rxjs'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';


@Injectable()
export class ToolsService {
    
    private _toolsSubject$: BehaviorSubject<Itool[]> = new BehaviorSubject<Itool[]>(null);
    public readonly tools$: Observable<Itool[]> = this._toolsSubject$.asObservable();

    private _istoolsLoadingSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
    public readonly istoolsLoading$: Observable<boolean> = this._istoolsLoadingSubject$.asObservable();

    private _activetoolSubject$: BehaviorSubject<Itool> = new BehaviorSubject<Itool>(null);
    public readonly activetool$: Observable<Itool> = this._activetoolSubject$.asObservable();


    constructor(
        private _http: Http,
        private _sidebarService: SidebarService
        ) {
    }

    addTool(tool) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('/api/v1/tool/', tool, {headers: headers}) // ...using post request
            .map((res: Response) => res.json()) // ...and callingls .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...
    }

    gettools(skip = 0, take = 8) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this._istoolsLoadingSubject$.next(true);
        return this._http.get(`/api/v1/tools?skip=${skip}&take=${take}`, {headers: headers, withCredentials: true}).map((res: Response) => { 
            this._toolsSubject$.next(res.json().data)
            return res.json();
        });
    }


    updatetool(tool) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('/api/v1/update-tool', tool, {headers: headers})
            .map((res: Response) =>  {
                return res.json() 
        })
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); 
    }

    removeTool(tool) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('/api/v1/remove-tool', tool, {headers: headers})
            .map((res: Response) =>  {
                return res.json() 
        })
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); 
    }

    setActivetool(toolId: string): void {
        let activetool = this.tools$.map(tools => tools.filter(tool => tool._id === toolId)[0]).subscribe(activetool => {
            this._activetoolSubject$.next(activetool);
        });
    }
}

export interface Itool {
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

export interface IPagedList {
    skip: number,
    take: number,
    more: boolean,
    data: Itool[]
}