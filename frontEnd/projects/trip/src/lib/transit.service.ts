import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransitService {
  readonly baseUrl = 'http://localhost:8000/api/v1';

  constructor(private http: HttpClient) { }

  getList(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/transit/${id}/list`);
  }

  saveTransition(id: number, param2: any): Observable<any> {
   return this.http.post(`${this.baseUrl}/transit/${id}/create`, param2);
  }

  removeTransit(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/transit/${id}`);
  }
}
