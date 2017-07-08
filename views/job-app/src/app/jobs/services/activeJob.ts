import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs'
import { IJob } from './jobs';
export { IJob } from './jobs';

import 'rxjs/add/operator/map';


@Injectable()
export class ActiveJobService {

  private _activeJobSubject: BehaviorSubject<IJob> = new BehaviorSubject(null);
  public readonly activeJob: Observable<IJob> = this._activeJobSubject.asObservable()

  constructor() {}

  setActiveJob(job: IJob): void {
    this._activeJobSubject.next(job);
  }

  getActiveJob(): Observable<IJob> {
    return this.activeJob;
  }

  removeActiveJob():void {
    this._activeJobSubject.next(null);
  }

}
