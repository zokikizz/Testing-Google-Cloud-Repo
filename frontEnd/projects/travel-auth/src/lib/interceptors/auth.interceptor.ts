import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, filter, tap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor( private snackBar: MatSnackBar) {
  }

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('auth intercept');

    const authObject = JSON.parse(localStorage.getItem('auth') ?? '');
    if (authObject !== '') {
      httpRequest = httpRequest.clone({
        setHeaders: {
          Authorization: `Bearer ${authObject.access}`
        }
      });
    }
    return next.handle(httpRequest).pipe(
      tap((v) => {
        if ( v instanceof HttpResponse && v.body.access) {
          localStorage.setItem('auth', JSON.stringify(v.body));
        }
      }),
      catchError((v) => {
        if (v.error?.detail || v.message) {
          this.snackBar.open(v.error?.detail ?? v.message, undefined, { duration: 2000 });
        }
        return of(v);
      }),
    );
  }
}
