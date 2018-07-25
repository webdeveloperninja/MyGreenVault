import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { PagedList } from '../../shared/models';
import { tap } from 'rxjs/operators';

export const DEFAULT_SKIP: number = 0;
export const DEFAULT_TAKE: number = 8;

@Injectable()
export class PlantDetailsService {
  constructor(private _http: HttpClient) {}

  public getPlantDetail(plantId: any) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let url = `/api/v1/plants/${plantId}`;

    return this._http.get(url, { headers: headers, withCredentials: true });
  }

  public saveProfileImage(plantId, images) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let url = `/api/v1/plants/${plantId}/profile-image`;

    const imagesRequest = { images: images, plantId };

    return this._http.post(url, imagesRequest, { headers: headers });
  }
}
