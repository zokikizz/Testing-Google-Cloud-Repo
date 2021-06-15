import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ListResponseInterface, Trip} from './interfaces/list-response.interface';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  readonly baseUrl = 'http://localhost:8000/api/v1';

  constructor(private http: HttpClient) { }

  getTrips(): Observable<ListResponseInterface> {
    return this.http.get<ListResponseInterface>(`${this.baseUrl}/trip/list`);
  }

  getTripById(id: number): Observable<Trip> {
    return this.http.get<Trip>(`${this.baseUrl}/trip/${id}`);
  }

  createTrip(trip: { title: string, description: string, budget: string}): Observable<Trip> {
    return this.http.post<Trip>(`${this.baseUrl}/trip/create`, { ...trip, budget_left: trip.budget });
  }

  deleteTrip(tripId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/trip/${tripId}`);
  }

  editTrip(trip: Trip): Observable<Trip> {
    return this.http.put<Trip>(`${this.baseUrl}/trip/${trip.id}`, { ...trip} );
  }

  getMoreTrips(url: string): Observable<ListResponseInterface> {
    return this.http.get<ListResponseInterface>(url);
  }

  updateTravelers(id: number, travelers: number[]): Observable<Trip> {
    return this.http.patch(`${this.baseUrl}/trip/${id}`, { travelers });
  }

  getUsernames(): Observable<any> {
    return this.http.get(`${this.baseUrl}/usernames`);
  }

  updateTrip(id: number, value: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/trip/${id}`, { ...value });
  }
}
