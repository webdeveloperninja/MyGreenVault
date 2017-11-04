import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http, Headers, Response } from '@angular/http';


@Injectable()
export class SearchService {

    constructor(
        private readonly _http: Http
    ) { }

    doSearch(query: string, category: string) {
        console.log('query', query);        
        console.log('category', category);    
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.get(`/api/v1/tools/search?query=${query}&category=${category}`, {headers: headers, withCredentials: true}).map((res: Response) => { 

        }).catch(err => {
            if (Number(err.status) === Number(403)) {
                const urlOrigin = window.location.origin;
                const urlPathName = window.location.pathname;
                const loginUrl = 'login';
                window.location.href = `${urlOrigin}${urlPathName}${loginUrl}`;
            }
            return err;
        });
    }

}
