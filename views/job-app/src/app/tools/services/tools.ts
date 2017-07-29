import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable, BehaviorSubject} from 'rxjs'
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

    private _toolsSkipSubject$: BehaviorSubject<number> = new BehaviorSubject<number>(DEFAULT_SKIP);
    public readonly toolsSkip$: Observable<number> = this._toolsSkipSubject$.asObservable();

    private _toolsTakeSubject$: BehaviorSubject<number> = new BehaviorSubject<number>(DEFAULT_TAKE);
    public readonly toolsTake$: Observable<number> = this._toolsSkipSubject$.asObservable();

    private _istoolsLoadingSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
    public readonly istoolsLoading$: Observable<boolean> = this._istoolsLoadingSubject$.asObservable();

    private _activetoolSubject$: BehaviorSubject<Tool> = new BehaviorSubject<Tool>(null);
    public readonly activetool$: Observable<Tool> = this._activetoolSubject$.asObservable();


    constructor(
        private _http: Http
        ) {
    }

    addTool(tool) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('/api/v1/tools/', tool, {headers: headers}) // ...using post request
            .map((res: Response) => res.json()) // ...and callingls .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...
    }

    getTools() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this._istoolsLoadingSubject$.next(true);
        return this._http.get(`/api/v1/tools?skip=${this._toolsSkipSubject$.value}&take=${this._toolsTakeSubject$.value}`, {headers: headers, withCredentials: true}).map((res: Response) => { 
            this._istoolsLoadingSubject$.next(false);
            this._moreToolsSubject$.next(res.json().more);
            this._toolsSkipSubject$.next(res.json().skip);
            this._toolsTakeSubject$.next(res.json().take);
            this._toolsSubject$.next(res.json().data)
        });
    }

    updatetool(tool) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.put('/api/v1/tools', tool, {headers: headers})
            .map((res: Response) =>  {
                return res.json() 
        })
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); 
    }

    removeTool(tool) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this._istoolsLoadingSubject$.next(true);
        return this._http.post('/api/v1/tools/remove', tool, {headers: headers})
            .map((res: Response) =>  {
                if(this._toolsSubject$.value.length === 1) {
                    this.previousPage();
                }
                this.getTools().subscribe();
                return res.json() 
            })
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); 
    }

    setActivetool(toolId: string): void {
        let activetool = this.tools$.map(tools => tools.filter(tool => tool._id === toolId)[0]).subscribe(activetool => {
            this._activetoolSubject$.next(activetool);
        });
    }

     nextPage() {
        this._toolsSkipSubject$.next(this._toolsSkipSubject$.value + this._toolsTakeSubject$.value);
        this.getTools().first().subscribe();
    }

    previousPage() {
        if(this._toolsSkipSubject$.value >= this._toolsTakeSubject$.value) {
            this._toolsSkipSubject$.next(this._toolsSkipSubject$.value - this._toolsTakeSubject$.value);
            this.getTools().first().subscribe();
        }
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