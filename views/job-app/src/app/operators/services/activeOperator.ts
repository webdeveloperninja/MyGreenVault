import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { SidebarService } from './sidebar';
import { Observable, BehaviorSubject } from 'rxjs'
import { Operator } from './operators';
export { Operator } from './operators';

import 'rxjs/add/operator/map';


@Injectable()
export class ActiveOperatorService {

  private _activeOperatorSubject: BehaviorSubject<Operator> = new BehaviorSubject(null);
  public readonly activeOperator: Observable<Operator> = this._activeOperatorSubject.asObservable()

  constructor(
    private _sidebarService: SidebarService
  ) {
  }

  setActiveOperator(operator: Operator): void {
    this._sidebarService.openSidebar();
    this._activeOperatorSubject.next(operator);
  }

  getActiveOperator(): Observable<Operator> {
    return this.activeOperator;
  }

  removeActiveOperator():void {
    this._sidebarService.shutSidebar();
    this._activeOperatorSubject.next(null);
  }

}
