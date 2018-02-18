import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable()
export class SideNavService {

  private _isSideNavOpen$: BehaviorSubject<boolean> = new BehaviorSubject<any>(false);
  public readonly isSideNavOpen$: Observable<boolean> = this._isSideNavOpen$.asObservable();

  constructor(
    private _localStorageService: LocalStorageService
  ) { 
    let isOpen = this._localStorageService.getItem('isSideBarOpen');
    if (isOpen) {
      this._isSideNavOpen$.next(isOpen.isSideBarOpen);
    }
  }

  openSideNav() {
    this._localStorageService.setItem('isSideBarOpen', JSON.stringify({isSideBarOpen: true}));
    this._isSideNavOpen$.next(true);
  }

  shutSideNav() {
    this._localStorageService.setItem('isSideBarOpen', JSON.stringify({isSideBarOpen: false}));
    this._isSideNavOpen$.next(false);
  }

}
