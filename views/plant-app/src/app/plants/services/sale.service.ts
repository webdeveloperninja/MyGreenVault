import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SaleService {
  constructor(private readonly _http: HttpClient) {}

  sellProduct(saleRequest) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `/api/v1/plants/${saleRequest.plantNumber}/sales`;

    return this._http.post(url, saleRequest, { headers: headers }).subscribe();
  }
}
