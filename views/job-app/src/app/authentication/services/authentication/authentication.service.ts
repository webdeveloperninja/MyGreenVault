import { Injectable } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable, BehaviorSubject} from 'rxjs';
import { TokenService } from '../../../shared/services/token/token.service';

@Injectable()
export class AuthenticationService {

  constructor(
    private _http: Http,
    private _tokenService: TokenService
  ) { }

  authenticate(userAuthenticationObject) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post('/login', userAuthenticationObject, {headers: headers}) // ...using post request
        .map(response => {
          console.log(response.json())
          // todo: save token 
          return response.json();
        })
        .catch(error => Observable.throw(error));
  }


}
