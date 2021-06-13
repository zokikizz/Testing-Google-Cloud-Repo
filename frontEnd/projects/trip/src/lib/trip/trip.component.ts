import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {TripService} from '../trip.service';
import {filter, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'lib-trip',
  template: `
    <p>
      trip works!
    </p>
    <div>
      {{ trip | async | json }}
    </div>
  `,
  styles: [
  ]
})
export class TripComponent implements OnInit, OnDestroy {
  trip: Observable<any> | null | undefined;
  destroyer$ = new Subject<void>();

  constructor(private activeRoute: ActivatedRoute, private tripService: TripService) { }

  ngOnInit(): void {
    this.activeRoute.params.pipe(
      takeUntil(this.destroyer$),
      filter(v => v !== null && v !== undefined)
    ).subscribe(v => {
      this.tripService.getTripById(v.id);
    });
  }

  ngOnDestroy(): void {
    this.destroyer$.next();
    this.destroyer$.complete();
  }


}
