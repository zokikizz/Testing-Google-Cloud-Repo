import { Component, OnInit } from '@angular/core';
import {TripService} from '../trip.service';
import {BehaviorSubject, of, Subject} from 'rxjs';
import {ListResponseInterface, Trip} from '../interfaces/list-response.interface';
import {MatDialog} from '@angular/material/dialog';
import {CreateTripDialogComponent} from '../create-trip-dialog/create-trip-dialog.component';
import {count, takeUntil, tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'lib-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit {
  trips = new BehaviorSubject<ListResponseInterface<Trip> | null>(null);
  destroyer$ = new Subject<void>();

  constructor(private tripService: TripService, private matDialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.tripService.getTrips().pipe(
      takeUntil(this.destroyer$),
      tap(v => { this.trips.next(v); } )
    ).subscribe();
  }

  addTrip(): void {
    const dialogRef = this.matDialog.open(CreateTripDialogComponent, {
      width: '100vw',
    });

    dialogRef.afterClosed().subscribe((newTrip: Trip) => {
      if (newTrip) {
        this.setUpNewValueForList(
          [ ... ( this.trips.value && this.trips.value.results ? this.trips.value.results : []), newTrip],
          increment);
      }
    });
  }

  editTrip(trip: Trip): void {
    this.router.navigate([`trip/${trip.id}`]);
  }

  deleteTrip(trip: Trip): void {
    if(trip && trip.id ) {
      this.tripService.deleteTrip(trip.id).subscribe(() => {
        this.setUpNewValueForList(
          this.trips.value && this.trips.value.results && this.trips.value.results.length > 1 ?
            this.trips.value?.results.filter(v => v.id !== trip.id)
            : [],
          decrement
        );
      });
    }
  }

  setUpNewValueForList(list: Trip[], countChange: (v: number, inc?: number) => number, next?: string, previous?: string): void {
    this.trips.next({ results: list,
      count: (this.trips.value && this.trips.value.count && (this.trips.value.count > 0) ? countChange(this.trips?.value?.count) : 0),
      next: next ?? this.trips.value?.next,
      previous: previous ?? this.trips.value?.previous
    });
  }

  loadMore(): void {
    if (this.trips.value?.next) {
      this.tripService.getMoreTrips(this.trips.value?.next).subscribe((listResponse: ListResponseInterface<Trip>) => {
        this.setUpNewValueForList([
          ...(this.trips && this.trips.value && this.trips.value?.results ? this.trips.value?.results : []) ,
          ...(listResponse.results ? listResponse.results : [])
          ],
          keepValue,
          listResponse.next,
          listResponse.previous);

        if (this.trips.value?.count !== listResponse.count) {
          this.trips.next({ ...this.trips.value, count: listResponse.count });
        }
      });
    }
  }
}


export const increment = (v: number) => v + 1;
export const decrement = (v: number) => v - 1;
export const keepValue = (v: number) => v;

