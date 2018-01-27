import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable, BehaviorSubject } from 'rxjs'
import { Router, ActivatedRoute, Params, Event, NavigationEnd } from '@angular/router';
import { NotificationService, DEFAULT_NOTIFICATION_TIME } from '../../shared/services/notification/notification.service';
import { Receiver } from '../models/Receiver';

import { tap, first, finalize, catchError } from 'rxjs/operators';

export const DEFAULT_SKIP: number = 0;
export const DEFAULT_TAKE: number = 8;

@Injectable()
export class ReceiverService {

    // TODO type product
    private _productsSubject$: BehaviorSubject<Receiver[]> = new BehaviorSubject<Receiver[]>(null);
    public readonly products$: Observable<Receiver[]> = this._productsSubject$.asObservable();

    private _hasMoreProductsSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public readonly hasMoreProducts$: Observable<boolean> = this._hasMoreProductsSubject$.asObservable();

    private _hasPreviousProductsSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public readonly hasPreviousProducts$: Observable<boolean> = this._hasPreviousProductsSubject$.asObservable();

    private _toolsSkipSubject$: BehaviorSubject<number> = new BehaviorSubject<number>(null);
    public readonly toolsSkip$: Observable<number> = this._toolsSkipSubject$.asObservable();

    private _toolsTakeSubject$: BehaviorSubject<number> = new BehaviorSubject<number>(null);
    public readonly toolsTake$: Observable<number> = this._toolsSkipSubject$.asObservable();

    private _isProductsLoadingSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
    public readonly isProductsLoading$: Observable<boolean> = this._isProductsLoadingSubject$.asObservable();

    private _toolsQuerySubject$: BehaviorSubject<string> = new BehaviorSubject<string>('');
    public readonly toolsQuery$: Observable<string> = this._toolsQuerySubject$.asObservable();

    private _activeProductSubject$: BehaviorSubject<Receiver> = new BehaviorSubject<Receiver>(null);
    public readonly activeProduct$: Observable<Receiver> = this._activeProductSubject$.asObservable();


    constructor(
        private _http: HttpClient,
        private _route: ActivatedRoute,
        private _router: Router,
        private _notificationService: NotificationService) {
        _router.events.filter(event => event instanceof NavigationEnd).subscribe(event => this.doSearch());
    }

    public doSearch() {
        this._isProductsLoadingSubject$.next(true);
        if (this._router.navigated) {
            this._toolsSkipSubject$.next(this._route.snapshot.queryParams["skip"]);
            this._toolsTakeSubject$.next(this._route.snapshot.queryParams["take"]);
            this._toolsQuerySubject$.next(this._route.snapshot.queryParams['query'] || null);
            this.getProducts().first().subscribe(data => {
                this._isProductsLoadingSubject$.next(false);
            });
        }
    }

    private getProducts() {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        let url = `/api/v1/shippers?skip=${this._toolsSkipSubject$.value}&take=${this._toolsTakeSubject$.value}`;

        if (this._toolsQuerySubject$.value) {
            url += `&query=${this._toolsQuerySubject$.value}`;
        }

        return this._http.get(url, { headers: headers, withCredentials: true }).map((res: PagedList<Receiver>) => {
            const products = res.data as Receiver[];
            const moreProducts = res.more;
            const hasPreviousProducts = this._toolsSkipSubject$.value != 0;

            this._productsSubject$.next(products);
            this._hasMoreProductsSubject$.next(moreProducts);
            this._hasPreviousProductsSubject$.next(hasPreviousProducts);

            return products;
        });
    }

    public addReceiver(product) {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post('/api/v1/shippers/', product, { headers: headers }).pipe(
            tap((res: PagedList<Receiver>) => this._hasMoreProductsSubject$.next(res.more)),
            finalize(() => {
                this._notificationService.showSuccess('Receiver added')
                this.doSearch();
            }),
            first(),
            catchError((err) => Observable.throw(err))
        );
    }


    public updateReceiver(receiver) {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.put('/api/v1/shippers', receiver, { headers: headers }).pipe(
            finalize(() => {
                this._notificationService.showSuccess('Updated receiver');
                this.doSearch();
            }),
            first(),
            catchError((err) => Observable.throw(err))
        );
    }

    public checkoutTool(checkout) {
        // This will be string of async to checkout. 
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        headers.append('Content-Type', 'application/json');
        return this._http.post('/api/v1/shippers', checkout, { headers: headers })
            .map((res: any) => {
                this.doSearch();
                this.setNotification('Successfully checked out tool');
                return res;
            });
    }

    public remove(product) {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');

        this._isProductsLoadingSubject$.next(true);

        return this._http.post('/api/v1/shippers/remove', product, { headers: headers }).pipe(
            finalize(() => {
                this._notificationService.showSuccess('Removed receiver');
                if (this._productsSubject$.value.length === 0) {
                    this.previousPage();
                } else {
                    this.doSearch();
                }
            }),
            first(),
            catchError((err) => Observable.throw(err))
        )
    }

    public setActiveProduct(productId: string): void {
        this.products$.map(products => products.filter(product => product._id === productId)[0]).subscribe((activeProduct: Receiver) => {
            this._activeProductSubject$.next(activeProduct);
        });
    }

    public nextPage() {
        this._router.navigate([`/receivers`],
            {
                queryParams:
                    {
                        skip: (Number(this._toolsSkipSubject$.value) + Number(this._toolsTakeSubject$.value)),
                        take: Number(this._toolsTakeSubject$.value),
                        query: this._toolsQuerySubject$.value
                    }
            });
    }

    public previousPage() {
        if (Number(this._toolsSkipSubject$.value) >= Number(this._toolsTakeSubject$.value)) {
            this._router.navigate([`/receivers`],
                {
                    queryParams:
                        {
                            skip: (Number(this._toolsSkipSubject$.value) - Number(this._toolsTakeSubject$.value)),
                            take: Number(this._toolsTakeSubject$.value),
                            query: this._toolsQuerySubject$.value
                        }
                });
        }
    }

    public setNotification(message) {
        this._notificationService.setNotificationOn(message);
        Observable.timer(DEFAULT_NOTIFICATION_TIME).subscribe(() => {
            this._notificationService.setNotificationOff();
        });
    }
}


export interface Tool {
    companyName: string;
    contactEmail: string;
    contactName: string;
    toolId: number;
    toolName: string;
    process: number;
    toolNumber: string;
    userId: string;
    __v: number;
    _id: string;
}

export interface PagedList<T> {
    skip: number,
    take: number,
    more: boolean,
    data: T[]
}