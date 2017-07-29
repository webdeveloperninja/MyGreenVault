import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable, BehaviorSubject} from 'rxjs'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

export const DEFAULT_SKIP: number = 0;
export const DEFAULT_TAKE: number = 8;

@Injectable()
export class JobsService {
    
    private _jobsSubject$: BehaviorSubject<Job[]> = new BehaviorSubject<Job[]>(null);
    public readonly jobs$: Observable<Job[]> = this._jobsSubject$.asObservable();

    private _isJobsLoadingSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
    public readonly isJobsLoading$: Observable<boolean> = this._isJobsLoadingSubject$.asObservable();

    private _moreJobsSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public readonly moreJobs$: Observable<boolean> = this._moreJobsSubject$.asObservable();

    private _jobsSkipSubject$: BehaviorSubject<number> = new BehaviorSubject<number>(DEFAULT_SKIP);
    public readonly jobsSkip$: Observable<number> = this._jobsSkipSubject$.asObservable();

    private _jobsTakeSubject$: BehaviorSubject<number> = new BehaviorSubject<number>(DEFAULT_TAKE);
    public readonly jobsTake$: Observable<number> = this._jobsSkipSubject$.asObservable();

    private _activeJobSubject$: BehaviorSubject<Job> = new BehaviorSubject<Job>(null);
    public readonly activeJob$: Observable<Job> = this._activeJobSubject$.asObservable();


    constructor(private _http: Http,) {}

    addJob(job) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('/api/v1/jobs/', job, {headers: headers}) // ...using post request
            .map((res: Response) => res.json()) // ...and callingls .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...
    }

    getJobs(skip = 0, take = 8) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this._isJobsLoadingSubject$.next(true);
        return this._http.get(`/api/v1/jobs?skip=${this._jobsSkipSubject$.value}&take=${this._jobsTakeSubject$.value}`, {headers: headers, withCredentials: true}).map((res: Response) => { 
            this._isJobsLoadingSubject$.next(false);
            this._jobsSubject$.next(res.json().data)
            this._moreJobsSubject$.next(res.json().more);
            this._jobsSkipSubject$.next(res.json().skip);
            this._jobsTakeSubject$.next(res.json().take);
            return res.json();
        });
    }


    updateJob(job) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.put('/api/v1/jobs', job, {headers: headers})
            .map((res: Response) =>  {
                return res.json() 
        })
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); 
    }

    removeJob(job) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this._isJobsLoadingSubject$.next(true);
        return this._http.post('/api/v1/jobs/remove', job, {headers: headers})
            .map((res: Response) =>  {
                if(this._jobsSubject$.value.length === 1) {
                    this.previousPage();
                }
                this.getJobs().subscribe();
                return res.json() 
            })
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); 
    }

    setActiveJob(jobId: string): void {
        let activeJob = this.jobs$.map(jobs => jobs.filter(job => job._id === jobId)[0]).subscribe(activeJob => {
            this._activeJobSubject$.next(activeJob);
        });
    }

    nextPage() {
        this._jobsSkipSubject$.next(this._jobsSkipSubject$.value + this._jobsTakeSubject$.value);
        this.getJobs().first().subscribe();
    }

    previousPage() {
        if(this._jobsSkipSubject$.value >= this._jobsTakeSubject$.value) {
            this._jobsSkipSubject$.next(this._jobsSkipSubject$.value - this._jobsTakeSubject$.value);
            this.getJobs().first().subscribe();
        }
    }

}

export interface Job {
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

export interface PagedList {
    skip: number,
    take: number,
    more: boolean,
    data: Job[]
}