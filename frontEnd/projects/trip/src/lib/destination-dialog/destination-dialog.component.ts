import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DestinationService} from '../destination.service';
import {Observable} from 'rxjs';
import {ListResponseInterface, Trip} from '../interfaces/list-response.interface';

export interface Destination {
  id?: number;
  location?: string;
  booking?: string;
  booking_price?: string;
  belongs_to?: string;
  start_destination?: string;
}

@Component({
  selector: 'lib-destination-dialog',
  templateUrl: './destination-dialog.component.html',
  styleUrls: ['./destination-dialog.component.css']
})
export class DestinationDialogComponent implements OnInit {
  destinationFrom: any;
  listOfDestinations: Observable<ListResponseInterface<Destination>> | undefined;
  selectedDestination: any;

  constructor(public dialogRef: MatDialogRef<DestinationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any,
              private fb: FormBuilder,
              private destinationService: DestinationService) {
    this.destinationFrom = this.fb.group({
      location: ['', Validators.required],
      booking: [''],
      booking_price: [0, Validators.min(0)],
      start_destination: [false],

      id: [null],
      belongs_to: [{}],
    });
  }

  ngOnInit(): void {
    this.listOfDestinations = this.destinationService.getListOfDestination(this.data.id);
  }

  onClickFillForm(destination: any): void {
    this.selectedDestination = destination;
    this.destinationFrom.setValue(destination);
  }

  onUpdate(): void {
    this.destinationService.updateDestination({ ...this.destinationFrom.value, belongs_to:
      this.destinationFrom.value.belongs_to.id
    }).subscribe(() => {
      this.listOfDestinations = this.destinationService.getListOfDestination(this.data.id);
      this.selectedDestination = null;
      this.destinationFrom.reset();
    });
  }

  onSave(): void {
    this.destinationService.saveDestination(this.data.id, { ...this.destinationFrom.value }).subscribe(() => {
      this.listOfDestinations = this.destinationService.getListOfDestination(this.data.id);
    });
  }

  removeDestination(destination: Destination): void {
    if (destination.id) {
      this.destinationService.removeDestination(destination.id).subscribe(() => {
        this.listOfDestinations = this.destinationService.getListOfDestination(this.data.id);
      });
    }
  }
}
