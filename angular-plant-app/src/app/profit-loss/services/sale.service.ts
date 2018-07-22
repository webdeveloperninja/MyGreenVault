import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { catchError, finalize } from 'rxjs/operators';
import { NotificationService } from '../../shared/services/notification/notification.service';

@Injectable()
export class SaleService {
  private _sales$: BehaviorSubject<any> = new BehaviorSubject<string>(null);
  public readonly sales$: Observable<any> = this._sales$.asObservable();

  private _salesLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public readonly salesLoading$: Observable<boolean> = this._salesLoading$.asObservable();

  private _sellingPlantLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public readonly sellingPlantLoading$: Observable<boolean> = this._sellingPlantLoading$.asObservable();

  public saleSucceded$ = new EventEmitter();

  constructor(private readonly _http: HttpClient, private readonly _notifaction: NotificationService) {}

  sellProduct(saleRequest) {
    this._sellingPlantLoading$.next(true);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `/api/v1/plants/${saleRequest.plantId}/sales`;

    return this._http
      .post(url, saleRequest, { headers: headers })
      .pipe(
        finalize(() => {
          this.getAll(saleRequest.plantId);
          this._sellingPlantLoading$.next(false);
          this._notifaction.setNotificationOn('Successfully sold plant');
        })
        // catchError(err => {
        //   this._notifaction.setNotificationOn('There was an error selling plant', 'danger');

        // })
      )
      .subscribe(() => this.saleSucceded$.emit());
  }

  getAll(plantId: string) {
    this._salesLoading$.next(true);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `/api/v1/plants/${plantId}/sales`;

    return this._http
      .get(url, { headers: headers })
      .pipe(finalize(() => this._salesLoading$.next(false)))
      .subscribe(weightedSales => {
        this._sales$.next(weightedSales);
      });
  }

  public remove(sale) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this._salesLoading$.next(true);

    return this._http
      .post(`/api/v1/plants/${sale.plantId}/sales/remove`, sale, { headers: headers })
      .pipe(
        finalize(() => {
          this.getAll(sale.plantId);
        })
      )
      .subscribe();
  }
}
