import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorSubject, Subject} from 'rxjs';
import {TripService} from '../trip.service';
import {filter, takeUntil, tap} from 'rxjs/operators';
import {Trip} from '../interfaces/list-response.interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {TravelersDialogComponent} from '../travelers-dialog/travelers-dialog.component';

@Component({
  selector: 'lib-trip',
  templateUrl: 'trip.component.html',
  styleUrls: ['trip.component.css'],
})
export class TripComponent implements OnInit, OnDestroy {
  trip = new BehaviorSubject<Trip>({});
  destroyer$ = new Subject<void>();
  tripForm: FormGroup | undefined;
  id = 0;

  constructor(private activeRoute: ActivatedRoute, private tripService: TripService, private fb: FormBuilder, private router: Router, private dialog: MatDialog) {
    this.tripForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.maxLength(500)],
      budget: [0, Validators.min(0)],
      owner: null,
      travelers: null,
      created: Date.now(),

      // TODO:
      id: [''],
      budget_left: ['']
    });
    this.tripForm.get('budget_left')?.disable();
  }

  ngOnInit(): void {
    this.activeRoute.params.pipe(
      takeUntil(this.destroyer$),
      filter(v => v !== null && v !== undefined)
    ).subscribe(v => {
      this.id = v.id;
      this.tripService.getTripById(v.id).pipe(
        tap(value => this.trip?.next(value)),
        tap(value => this.tripForm?.setValue(value))
      ).subscribe();
    });
  }

  ngOnDestroy(): void {
    this.destroyer$.next();
    this.destroyer$.complete();
  }


  saveTrip(): void {
    if (this.trip.value.id) {
      this.tripService.updateTrip(this.trip.value.id, this.tripForm?.value).pipe(
        tap(v => this.trip.next(v))
      ).subscribe();
    }
  }

  returnToList(): void {
    this.router.navigate(['/trip/list']);
  }

  manageTravelers(): void {
    const dialogRef = this.dialog.open(TravelersDialogComponent, {
      width: '80vw',
      data: { trip: this.trip.value }
    });

    dialogRef.afterClosed().subscribe(() =>
      this.tripService.getTripById(this.id).pipe(
        tap(value => this.trip?.next(value)),
        tap(value => this.tripForm?.setValue(value))
      ).subscribe());
  }
}
