import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, reduce, tap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {TravelAuthService} from '../travel-auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor( private snackBar: MatSnackBar, private router: Router, private authService: TravelAuthService) {
  }

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('auth intercept');

    const authObject = JSON.parse(localStorage.getItem('auth') ?? '');
    if (authObject !== '' && httpRequest.url.indexOf('register') === -1) {
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
        if (v.status === 401) {
          if (v.error?.code === 'token_not_valid') {
            // silent refresh
            this.authService.silentRefresh(authObject.refresh).subscribe(() => {
              return next.handle(httpRequest);
            });
          }
          this.snackBar.open('Please login', undefined, { duration: 2000 });
          this.router.navigate(['/login']);
        }
        if (v.error || v.message) {
          this.snackBar.open(v.error ?
            Object.keys(v.error).reduce((acc: string, curr: string) => acc + '\n' + v.error[curr], '') : v.message,
            undefined, { duration: 2000 });
        }
        return of(v);
      }),
    );
  }
}
