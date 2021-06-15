import { NgModule } from '@angular/core';
import { TripComponent } from './trip/trip.component';
import { TripListComponent } from './trip-list/trip-list.component';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { CreateTripDialogComponent } from './create-trip-dialog/create-trip-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {TravelCoreModule} from '../../../travel-core/src/lib/travel-core.module';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';
import { TravelersDialogComponent } from './travelers-dialog/travelers-dialog.component';
import { DestinationDialogComponent } from './destination-dialog/destination-dialog.component';
import { TransitDialogComponent } from './transit-dialog/transit-dialog.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';



@NgModule({
  declarations: [
    TripComponent,
    TripListComponent,
    CreateTripDialogComponent,
    TravelersDialogComponent,
    DestinationDialogComponent,
    TransitDialogComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatToolbarModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    TravelCoreModule,
    MatProgressBarModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatCheckboxModule,

    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports: [
    TripComponent
  ]
})
export class TripModule { }
