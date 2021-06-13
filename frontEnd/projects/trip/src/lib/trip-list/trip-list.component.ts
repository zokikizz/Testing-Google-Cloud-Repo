import { Component, OnInit } from '@angular/core';
import {TripService} from '../trip.service';
import {Observable} from 'rxjs';
import {ListResponseInterface} from '../interfaces/list-response.interface';
import {MatDialog} from '@angular/material/dialog';
import {CreateTripDialogComponent} from '../create-trip-dialog/create-trip-dialog.component';

@Component({
  selector: 'lib-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit {
  trips: Observable<ListResponseInterface> | undefined;

  constructor(private tripService: TripService, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.trips = this.tripService.getTrips();
  }

  addTrip(): void {
    this.matDialog.open(CreateTripDialogComponent, {
      width: '1000px',
    });
  }
}
