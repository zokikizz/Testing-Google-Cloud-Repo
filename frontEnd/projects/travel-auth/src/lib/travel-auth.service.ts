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
  readonly baseUrl = 'http://localhost:8000';

  constructor(
    // @Inject(APP_CONFIG) private appConfig: AppConfig,
    private http: HttpClient) { }

  getData(): Observable<any> {
    // console.log(this.appConfig);
    return this.http.get('https://jsonplaceholder.typicode.com/todos/1');
  }

  logIn(cred: LoginInterface): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/v1/auth/login/`, { ...cred });
  }

  signUp(cred: SignupInterface): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/v1/auth/registration/`, { ...cred });
  }
}
