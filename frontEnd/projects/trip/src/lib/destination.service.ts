import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {
  readonly baseUrl = 'http://localhost:8000/api/v1';

  constructor(private http: HttpClient) { }

  getListOfDestination(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/destination/${id}/list`);
  }

  saveDestination(id: number, destination: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/destination/${id}/create`, { ...destination });
  }

  updateDestination(destination: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/destination/${destination.id}`, { ...destination });
  }

  removeDestination(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/destination/${id}`);
  }
}
