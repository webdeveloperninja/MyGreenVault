import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { PagedList } from '../../shared/models';
import { tap, map } from 'rxjs/operators';
import { Details as DetailsContract } from 'app/plant-details/contracts/details';
import { Week } from '../models/week';
import { tryMomentConvert } from '../../shared/utilities/date';
import { WeekData } from '../contracts/week-data';
import { Observable } from 'rxjs';
export const DEFAULT_SKIP: number = 0;
export const DEFAULT_TAKE: number = 8;

@Injectable()
export class PlantDetailsService {
  constructor(private _http: HttpClient) {}

  public getPlantDetail(plantId: any) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let url = `/api/v1/plants/${plantId}`;

    return this._http.get(url, { headers: headers, withCredentials: true }).pipe(
      map((fullDetails: DetailsContract) => {
        const detailsResponse = {
          details: { ...fullDetails },
          profileImages: fullDetails.profileImages
        };

        delete detailsResponse.details.profileImages;
        delete detailsResponse.details.expenses;

        return detailsResponse;
      })
    );
  }

  public getPlantWeeks(weekIds: string[]): Observable<Week[]> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let url = `/api/v1/plants/weeks`;

    return this._http.post(url, weekIds, { headers: headers, withCredentials: true }).pipe(
      map((weeks: WeekData[]) =>
        weeks.map(week => {
          return {
            ...week,
            start: tryMomentConvert(week.start),
            end: tryMomentConvert(week.end)
          } as Week;
        })
      )
    );
  }

  public saveProfileImage(plantId, images) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let url = `/api/v1/plants/${plantId}/profile-image`;

    const imagesRequest = { images: images, plantId };

    return this._http.post(url, imagesRequest, { headers: headers });
  }

  public updateWeek(weekId, updated) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let url = `/api/v1/plants/${weekId}/weeks/update`;

    return this._http.post(url, updated, { headers: headers });
  }

  public getEvents(plantId: string) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `https://iotvault.azurewebsites.net/api/GetSoilMoisture?plantId=${plantId}`;

    return this._http.get(url);
  }
}
