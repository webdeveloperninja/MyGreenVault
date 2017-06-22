import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import { SidebarService } from './sidebar';
import {Observable, BehaviorSubject} from 'rxjs'
import 'rxjs/add/operator/map';


@Injectable()
export class JobsService {
    
    private _jobsSubject$: BehaviorSubject<IJob[]> = new BehaviorSubject<IJob[]>(null);
    public readonly jobs$: Observable<IJob[]> = this._jobsSubject$.asObservable();

    private _isJobsLoadingSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
    public readonly isJobsLoading$: Observable<boolean> = this._isJobsLoadingSubject$.asObservable();

    constructor(
        private _http: Http,
        private _sidebarService: SidebarService
        ) {
    }

    addJob(job) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('/api/v1/job/', job, {headers: headers}) // ...using post request
            .map((res: Response) => res.json()) // ...and callingls .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...
    }

    getJobs(skip: number = 0, take: number = 8) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this._isJobsLoadingSubject$.next(true);
        return this._http.get(`/api/v1/jobs?skip=${skip}&take=${take}`, {headers: headers, withCredentials: true}).map((res: Response) => { 
            this._jobsSubject$.next(res.json().data);
            this._isJobsLoadingSubject$.next(false);
            return res.json()
        });
    }

    updateJob(job) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('/api/v1/update-job', job, {headers: headers})
            .map((res: Response) =>  {
                return res.json() 
        })
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); 
    }
}

export interface IJob {
  companyName: string;
  contactEmail: string;
  contactName: string;
  jobId: number;
  jobName: string;
  process: number;
  jobNumber: string;
  userId: string;
  __v: number;
  _id: string;
}

export interface IPagedList {
    skip: number,
    take: number,
    more: boolean,
    data: IJob[]
}