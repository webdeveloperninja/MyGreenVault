import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs'
import { Tool } from './tools';
export { Tool } from './tools';

import 'rxjs/add/operator/map';


@Injectable()
export class ActiveToolService {

  private _activeToolsubject: BehaviorSubject<Tool> = new BehaviorSubject(null);
  public readonly activeTool: Observable<Tool> = this._activeToolsubject.asObservable()

  constructor() {}

  setActiveTool(tool: Tool): void {
    this._activeToolsubject.next(tool);
  }

  getActiveTool(): Observable<Tool> {
    return this.activeTool;
  }

  removeActiveTool():void {
    this._activeToolsubject.next(null);
  }

}
