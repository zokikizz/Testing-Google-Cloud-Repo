import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ListResponseInterface} from './interfaces/list-response.interface';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  readonly baseUrl = 'http://localhost:8000/api/v1';

  constructor(private http: HttpClient) { }

  getTrips(): Observable<ListResponseInterface> {
    return this.http.get<ListResponseInterface>(`${this.baseUrl}/trip/list`);
  }

  getTripById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/trip/${id}`);
  }
}
