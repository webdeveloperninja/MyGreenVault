import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import { Observable, BehaviorSubject } from 'rxjs'
import { Router, ActivatedRoute, Params, Event, NavigationEnd } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

export const DEFAULT_SKIP: number = 0;
export const DEFAULT_TAKE: number = 8;

@Injectable()
export class JobsService {
    
    private _jobsSubject$: BehaviorSubject<Job[]> = new BehaviorSubject<Job[]>(null);
    public readonly jobs$: Observable<Job[]> = this._jobsSubject$.asObservable();

    private _jobDetailSubject$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    public readonly jobDetail$: Observable<any> = this._jobDetailSubject$.asObservable();

    private _jobCheckoutsSubject$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(null);
    public readonly jobCheckouts$: Observable<any[]> = this._jobCheckoutsSubject$.asObservable(); 

    private _isJobCheckoutsLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public readonly isJobCheckoutsLoading$: Observable<any> = this._isJobCheckoutsLoading$.asObservable();

    private _isJobDetailLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public readonly isJobDetailLoading$: Observable<any> = this._isJobDetailLoading$.asObservable();

    private _moreJobsSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public readonly moreJobs$: Observable<boolean> = this._moreJobsSubject$.asObservable();

    private _hasPreviousJobsSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public readonly hasPreviousJobs$: Observable<boolean> = this._hasPreviousJobsSubject$.asObservable();

    private _jobsSkipSubject$: BehaviorSubject<number> = new BehaviorSubject<number>(null);
    public readonly jobsSkip$: Observable<number> = this._jobsSkipSubject$.asObservable();

    private _jobsTakeSubject$: BehaviorSubject<number> = new BehaviorSubject<number>(null);
    public readonly jobsTake$: Observable<number> = this._jobsSkipSubject$.asObservable();

    private _isJobsLoadingSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
    public readonly isJobsLoading$: Observable<boolean> = this._isJobsLoadingSubject$.asObservable();

    private _jobsQuerySubject$: BehaviorSubject<string> = new BehaviorSubject<string>('');
    public readonly jobsQuery$: Observable<string> = this._jobsQuerySubject$.asObservable();

    private _activeJobSubject$: BehaviorSubject<Job> = new BehaviorSubject<Job>(null);
    public readonly activeJob$: Observable<Job> = this._activeJobSubject$.asObservable();


    constructor(
        private _http: HttpClient,
        private _route: ActivatedRoute,
        private _router: Router) {
        _router.events.filter(event => event instanceof NavigationEnd).subscribe(event =>  this.doSearch());    
    }

    public doSearch() {
        this._isJobsLoadingSubject$.next(true);
        if (this._router.navigated) {
            this._jobsSkipSubject$.next(this._route.snapshot.queryParams["skip"]);
            this._jobsTakeSubject$.next(this._route.snapshot.queryParams["take"]);
            this._jobsQuerySubject$.next(this._route.snapshot.queryParams['query'] || null);
            this.getJobs().first().subscribe(data => {
                this._isJobsLoadingSubject$.next(false);
            });
            
        }
    }

    public getJobCheckouts(jobId: any) {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        let url = `/api/v1/checkouts/${jobId}`;

        this._isJobCheckoutsLoading$.next(true);

        return this._http.get(url, {headers: headers, withCredentials: true})
            .catch(err => {
                throw new Error(err);
            }).first().subscribe((data: any) => {
                this._isJobCheckoutsLoading$.next(false);
                this._jobCheckoutsSubject$.next(data);
            });
    }


    public getJobDetail(jobId: any) {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        let url = `/api/v1/jobs/${jobId}`;

        this._isJobDetailLoading$.next(true);

        return this._http.get(url, {headers: headers, withCredentials: true})
            .map((res: any) => {
                return res;
            }).catch(err => {
                throw new Error(err);
            }).first().subscribe(data => {
                this._isJobDetailLoading$.next(false);
                this._jobDetailSubject$.next(data);
            });
    }

    private getJobs() {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        let url = `/api/v1/jobs?skip=${this._jobsSkipSubject$.value}&take=${this._jobsTakeSubject$.value}`;

        if (this._jobsQuerySubject$.value) {
            url += `&query=${this._jobsQuerySubject$.value}`;
        }

        return this._http.get(url, {headers: headers, withCredentials: true}).map((res: PagedList) => {
            const jobs = res.data;
            const moreJobs = res.more;
            const hasPreviousJobs = this._jobsSkipSubject$.value != 0;

            this._jobsSubject$.next(jobs);
            this._moreJobsSubject$.next(moreJobs);
            this._hasPreviousJobsSubject$.next(hasPreviousJobs);
        });
    }

    private getJob() {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        let url = `/api/v1/jobs?skip=${this._jobsSkipSubject$.value}&take=${this._jobsTakeSubject$.value}`;

        if (this._jobsQuerySubject$.value) {
            url += `&query=${this._jobsQuerySubject$.value}`;
        }

        return this._http.get(url, {headers: headers, withCredentials: true}).map((res: PagedList) => {
            const jobs = res.data;
            const moreJobs = res.more;
            const hasPreviousJobs = this._jobsSkipSubject$.value != 0;

            this._jobsSubject$.next(jobs);
            this._moreJobsSubject$.next(moreJobs);
            this._hasPreviousJobsSubject$.next(hasPreviousJobs);

            return jobs;
        }).catch(err => {
            throw new Error(err);
        });
    }

    public addJob(job) {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post('/api/v1/jobs/', job, {headers: headers})
            .map((res: PagedList) => {
                this._moreJobsSubject$.next(res.more);
            }).finally(() => {
                this.doSearch();
            })
    }



    public updateJob(job) {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.put('/api/v1/jobs', job, {headers: headers})
            .map((res: any) =>  {
                this.doSearch();
                return res;
            });
    }


    public removeJob(job) {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        this._isJobsLoadingSubject$.next(true);
        return this._http.post('/api/v1/jobs/remove', job, {headers: headers})
            .map((res: HttpResponse<any>) =>  {
                if (this._jobsSubject$.value.length === 0) {
                    this.previousPage();
                } else {
                    this.doSearch();
                }
                return res;
            });
    }

    public setActiveJob(jobId: string): void {
        let activeJob = this.jobs$.map(jobs => jobs.filter(job => job._id === jobId)[0]).subscribe(activeJob => {
            this._activeJobSubject$.next(activeJob);
        });
    }

    public nextPage() {
        this._router.navigate([`/jobs`], 
            { queryParams: 
                { 
                    skip: (Number(this._jobsSkipSubject$.value) + Number(this._jobsTakeSubject$.value)), 
                    take: Number(this._jobsTakeSubject$.value),
                    query: this._jobsQuerySubject$.value
                }
            });
    }

    public previousPage() {
        if (Number(this._jobsSkipSubject$.value) >= Number(this._jobsTakeSubject$.value)) {
            this._router.navigate([`/jobs`], 
                { queryParams: 
                    { 
                        skip: (Number(this._jobsSkipSubject$.value) - Number(this._jobsTakeSubject$.value)), 
                        take: Number(this._jobsTakeSubject$.value),
                        query: this._jobsQuerySubject$.value
                    }
                });
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