import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class HeaderService {
  private _headerTextSubject$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public readonly headerText$: Observable<string> = this._headerTextSubject$.asObservable();
  
  constructor() { }

  setHeaderText(text: string) {
    this._headerTextSubject$.next(text);
  }

  removeHeaderText() {
      this._headerTextSubject$.next('');
  }

}
