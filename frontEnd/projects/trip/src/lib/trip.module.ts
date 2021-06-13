import { NgModule } from '@angular/core';
import { TripComponent } from './trip/trip.component';
import { TripListComponent } from './trip-list/trip-list.component';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { CreateTripDialogComponent } from './create-trip-dialog/create-trip-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';



@NgModule({
  declarations: [
    TripComponent,
    TripListComponent,
    CreateTripDialogComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
  ],
  exports: [
    TripComponent
  ]
})
export class TripModule { }
