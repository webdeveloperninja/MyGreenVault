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

    /// KANBAN TODO: REFACTOR ALL JOBS AND JOBS

    private _allJobsSubject$: BehaviorSubject<Job[]> = new BehaviorSubject<Job[]>(null);
    public readonly allJobs$: Observable<Job[]> = this._allJobsSubject$.asObservable();


    constructor(private _http: Http,) {}

    addJob(job) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('/api/v1/jobs/', job, {headers: headers}) // ...using post request
            .map((res: Response) => res.json())
            .catch(err => {
                if (Number(err.status) === Number(403)) {
                    const urlOrigin = window.location.origin;
                    const urlPathName = window.location.pathname;
                    const loginUrl = 'login';
                    window.location.href = `${urlOrigin}${urlPathName}${loginUrl}`;
                }
                return err;
            });
    }

    getJobs(skip, take) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this._isJobsLoadingSubject$.next(true);
        return this._http.get(`/api/v1/jobs?skip=${skip}&take=${take}`, {headers: headers, withCredentials: true}).map((res: Response) => { 
            this._isJobsLoadingSubject$.next(false);
            this._jobsSubject$.next(res.json().data)
            this._moreJobsSubject$.next(res.json().more);
            this._jobsSkipSubject$.next(res.json().skip);
            this._jobsTakeSubject$.next(res.json().take);
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

    getJob(jobNumber: string) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this._isJobsLoadingSubject$.next(true);
        return this._http.get(`/api/v1/jobs/${jobNumber}`, {headers: headers, withCredentials: true}).map((res: Response) => { 
            return res.json();
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

    getAllJobs() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this._isJobsLoadingSubject$.next(true);
        return this._http.get(`/api/v1/jobs/all-jobs`, {headers: headers, withCredentials: true}).map((res: Response) => { 
            this._isJobsLoadingSubject$.next(false);
            console.log(res);
            this._allJobsSubject$.next(res.json())
            return res.json();
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


    updateJob(job) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.put('/api/v1/jobs', job, {headers: headers})
            .map((res: Response) =>  {
                return res.json() 
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

    removeJob(job) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this._isJobsLoadingSubject$.next(true);
        return this._http.post('/api/v1/jobs/remove', job, {headers: headers})
            .map((res: Response) =>  {
                if(this._jobsSubject$.value.length === 1) {
                    this.previousPage();
                }
                this.getJobs(this._jobsSkipSubject$.value, this._jobsTakeSubject$.value).subscribe();
                return res.json() 
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

    setActiveJob(jobId: string): void {
        let activeJob = this.jobs$.map(jobs => jobs.filter(job => job._id === jobId)[0]).subscribe(activeJob => {
            this._activeJobSubject$.next(activeJob);
        });
    }

    nextPage() {
        this._jobsSkipSubject$.next(this._jobsSkipSubject$.value + this._jobsTakeSubject$.value);
        this.getJobs(this._jobsSkipSubject$.value, this._jobsSkipSubject$.value).first().subscribe();
    }

    previousPage() {
        if(this._jobsSkipSubject$.value >= this._jobsTakeSubject$.value) {
            this._jobsSkipSubject$.next(this._jobsSkipSubject$.value - this._jobsTakeSubject$.value);
            this.getJobs(this._jobsSkipSubject$.value, this._jobsTakeSubject$.value).first().subscribe();
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
  jobStatus: number;
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