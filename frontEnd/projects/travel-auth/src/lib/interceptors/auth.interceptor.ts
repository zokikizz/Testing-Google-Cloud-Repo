import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import {filter, tap} from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('auth intercept');
    return next.handle(httpRequest).pipe(
      tap((v) => {
        if ( v instanceof HttpResponse && v.body.access_token && httpRequest.url.indexOf('facebook') === -1) {
          // console.log(v.body);
          localStorage.setItem('auth', JSON.stringify(v.body));
        }
      })
    );
  }
}
