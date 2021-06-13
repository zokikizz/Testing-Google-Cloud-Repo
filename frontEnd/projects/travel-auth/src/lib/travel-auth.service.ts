import {Inject, Injectable} from '@angular/core';
import {APP_CONFIG, AppConfig} from './app.config';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginInterface} from './interfaces/login.interface';
import {SignupInterface} from './interfaces/signup.interface';

@Injectable({
  providedIn: 'root',
})
export class TravelAuthService {
  readonly baseUrl = 'http://localhost:8000/api/v1';

  constructor(
    // @Inject(APP_CONFIG) private appConfig: AppConfig,
    private http: HttpClient) { }

  logIn(cred: LoginInterface): Observable<any> {
    return this.http.post(`${this.baseUrl}/token`, { ...cred });
  }

  signUp(cred: SignupInterface): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, { ...cred });
  }

}
