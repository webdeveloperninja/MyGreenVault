import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { SidebarService } from './sidebar';
import { Observable, BehaviorSubject } from 'rxjs'
import { Itool } from './tools';
export { Itool } from './tools';

import 'rxjs/add/operator/map';


@Injectable()
export class ActiveToolService {

  private _activetoolsubject: BehaviorSubject<Itool> = new BehaviorSubject(null);
  public readonly activetool: Observable<Itool> = this._activetoolsubject.asObservable()

  constructor(
    private _sidebarService: SidebarService
  ) {
  }

  setActivetool(tool: Itool): void {
    this._sidebarService.openSidebar();
    this._activetoolsubject.next(tool);
  }

  getActivetool(): Observable<Itool> {
    return this.activetool;
  }

  removeActivetool():void {
    this._sidebarService.shutSidebar();
    this._activetoolsubject.next(null);
  }

}
