import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class SideNavService {

  private _isSideNavOpen$: BehaviorSubject<boolean> = new BehaviorSubject<any>(false);
  public readonly isSideNavOpen$: Observable<boolean> = this._isSideNavOpen$.asObservable();

  constructor() { }

  openSideNav() {
    this._isSideNavOpen$.next(true);
  }

  shutSideNav() {
    this._isSideNavOpen$.next(false);
  }

}
