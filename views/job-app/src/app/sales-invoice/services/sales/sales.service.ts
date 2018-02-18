import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { finalize, first, catchError } from 'rxjs/operators';
import { NotificationService } from 'app/shared/services/notification/notification.service';
import { Observable } from 'rxjs/observable';
import { SaleRequest } from 'app/sales-invoice/models';

@Injectable()
export class SalesService {
  constructor(private _http: HttpClient, private _notificationService: NotificationService) {}

  sell(request: SaleRequest) {
    const successMessage = 'Succesfully sold';
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http
      .post('/api/v1/sales/', request, { headers: headers })
      .pipe(
        finalize(() => {
          this._notificationService.showSuccess(successMessage);
        }),
        first(),
        catchError(err => Observable.throw(err))
      ).subscribe();
  }
}
