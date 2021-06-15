import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {TripService} from '../trip.service';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'lib-create-trip-dialog',
  templateUrl: './create-trip-dialog.component.html',
  styleUrls: ['./create-trip-dialog.component.css']
})
export class CreateTripDialogComponent {
  tripForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<CreateTripDialogComponent>,
              private fb: FormBuilder,
              private tripService: TripService
              ) {
    this.tripForm = this.fb.group({
      title: [ '', Validators.required],
      description: '',
      budget: [ 0, [ Validators.required, budgetValidator]]
    });
  }

  createTrip(): void {
    this.tripService.createTrip(this.tripForm.value).subscribe((v) => {
      this.dialogRef.close(v);
    });
  }
}

export const budgetValidator = (control: AbstractControl): ValidationErrors | null => {
    return +control.value < 0 ? { budgetValidation: true } : null;
};

