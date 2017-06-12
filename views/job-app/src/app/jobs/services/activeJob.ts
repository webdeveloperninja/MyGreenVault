import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { SidebarService } from './sidebar';
import { Observable, BehaviorSubject } from 'rxjs'
import { IJob } from './jobs';
export { IJob } from './jobs';

import 'rxjs/add/operator/map';


@Injectable()
export class ActiveJobService {

  private _activeJobSubject: BehaviorSubject<IJob> = new BehaviorSubject(null);
  public readonly activeJob: Observable<IJob> = this._activeJobSubject.asObservable()

  constructor(
    private _sidebarService: SidebarService
  ) {
  }

  setActiveJob(job: IJob): void {
    this._sidebarService.openSidebar();
    this._activeJobSubject.next(job);
  }

  getActiveJob(): Observable<IJob> {
    return this.activeJob;
  }

  removeActiveJob():void {
    this._sidebarService.shutSidebar();
    this._activeJobSubject.next(null);
  }

}
