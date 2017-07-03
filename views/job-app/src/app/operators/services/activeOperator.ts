import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { SidebarService } from './sidebar';
import { Observable, BehaviorSubject } from 'rxjs'
import { IOperator } from './operators';
export { IOperator } from './operators';

import 'rxjs/add/operator/map';


@Injectable()
export class ActiveOperatorService {

  private _activeOperatorSubject: BehaviorSubject<IOperator> = new BehaviorSubject(null);
  public readonly activeOperator: Observable<IOperator> = this._activeOperatorSubject.asObservable()

  constructor(
    private _sidebarService: SidebarService
  ) {
  }

  setActiveOperator(operator: IOperator): void {
    this._sidebarService.openSidebar();
    this._activeOperatorSubject.next(operator);
  }

  getActiveOperator(): Observable<IOperator> {
    return this.activeOperator;
  }

  removeActiveOperator():void {
    this._sidebarService.shutSidebar();
    this._activeOperatorSubject.next(null);
  }

}
