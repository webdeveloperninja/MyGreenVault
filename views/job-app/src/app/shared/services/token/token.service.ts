import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {

  constructor() { }

  getToken() {
    console.log('token');
  }
}