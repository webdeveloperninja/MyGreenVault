import 'rxjs/add/operator/do';
import { 
    HttpEvent, 
    HttpInterceptor, 
    HttpHandler, 
    HttpRequest, 
    HttpResponse, 
    HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

export class RequestInterceptor implements HttpInterceptor {
    constructor() { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request).do((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                // do stuff with response if you want
            }
        }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (Number(err.status) === Number(403)) {
                    const urlOrigin = window.location.origin;
                    const urlPathName = window.location.pathname;
                    const loginUrl = 'login';
                    window.location.href = `${urlOrigin}${urlPathName}${loginUrl}`;
                }
            }
        });
    }
}