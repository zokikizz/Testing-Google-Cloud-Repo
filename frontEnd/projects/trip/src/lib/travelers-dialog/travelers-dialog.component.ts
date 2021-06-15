import {Component, Inject, OnInit} from '@angular/core';
import {tap} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';
import {Trip} from '../interfaces/list-response.interface';
import {FormBuilder} from '@angular/forms';
import {TripService} from '../trip.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'lib-travelers-dialog',
  templateUrl: './travelers-dialog.component.html',
  styleUrls: ['./travelers-dialog.component.css']
})
export class TravelersDialogComponent implements OnInit {

  trip: BehaviorSubject<Trip> = new BehaviorSubject<Trip>({});
  travelers = new BehaviorSubject<{ results?: any[] }>({});
  travelerControl: any;

  constructor(
    public dialogRef: MatDialogRef<TravelersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { trip: Trip },
    private fb: FormBuilder, private tripService: TripService) {

    this.travelerControl = this.fb.control(null);
    this.trip.next(data.trip);


    this.tripService.getUsernames().pipe(
      tap(v => this.travelers.next(v)),
    ).subscribe();
  }

  ngOnInit(): void {
  }


  removeTraveler(traveler: any): void {
    if (this.trip && this.trip.value && this.trip.value.id && this.trip.value.travelers) {
      const travelers = [ ...this.trip.value.travelers.filter(t => t.id !== traveler.id)].map(v => typeof v === 'number' ? v : v.id );
      this.tripService.updateTravelers(this.trip.value.id, travelers).pipe(
        tap(v => this.trip.next(v)),
      ).subscribe((value) => {
        // this.tripService.getUsernames().pipe(
        //   tap(v => this.travelers.next(v)),
        // ).subscribe();
      });
    }
  }

  addTraveler(): void {
    if (this.trip && this.trip.value && this.trip.value.id && this.trip.value.travelers) {
      const travelers = Array.from(new Set([ ...this.trip.value.travelers.map(t => t.id), this.travelerControl.value.id]));
      this.tripService.updateTravelers(this.trip.value.id, travelers).pipe(
        tap(v => this.trip.next(v))
      ).subscribe((value) => {
      });
    }
  }

}
