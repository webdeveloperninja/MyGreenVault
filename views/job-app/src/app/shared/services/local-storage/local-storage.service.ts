import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  constructor() { }

  getItem(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

  setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

}
