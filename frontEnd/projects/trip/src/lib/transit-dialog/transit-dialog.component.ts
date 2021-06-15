import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TransitService} from '../transit.service';
import {ListResponseInterface, Trip} from '../interfaces/list-response.interface';
import {Observable} from 'rxjs';
import {Destination} from '../destination-dialog/destination-dialog.component';
import {DestinationService} from '../destination.service';

export interface Transit {
  company_name?: string;
  price?: number;
  transit_type?: any;
  start?: Date | undefined;
  end?: Date | undefined;
  trip?: Trip | number;
  // @ts-ignore
  start_destination?: Destination | undefined;
  // @ts-ignore
  end_destination?: Destination | undefined;
}

@Component({
  selector: 'lib-transit-dialog',
  templateUrl: './transit-dialog.component.html',
  styleUrls: ['./transit-dialog.component.css']
})
export class TransitDialogComponent implements OnInit {
  transitList: Observable<ListResponseInterface<Transit>> | undefined;
  destinationList: Observable<ListResponseInterface<Destination>> | undefined;
  transitForm: FormGroup;
  transitTypes: string[] = ['train', 'bus', 'plane', 'ship'];

  constructor(
    public dialogRef: MatDialogRef<TransitDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder,
    private transitService: TransitService,
    private destinationService: DestinationService) {
    this.transitForm = this.fb.group({
      company_name: '',
      price: 0,
      transit_type: 'bus',
      start: Date.now(),
      end: null,

      trip: null,
      start_destination: null,
      end_destination: null,
    });
  }

  ngOnInit(): void {
    this.transitList = this.transitService.getList(this.data.id);
    this.destinationList = this.destinationService.getListOfDestination(this.data.id);
  }

  onClickFillForm(transit: Transit): void {
  }

  removeDestination(transit: Transit): void {
  }

  onSave(): void {
    this.transitService.saveTransition(this.data.id, { ...this.transitForm.value,
      start_destination: this.transitForm.value.start_destination?.id,
      end_destination: this.transitForm.value.end_destination?.id
    }).subscribe( v => {
      this.transitList = this.transitService.getList(this.data.id);
      this.transitForm.reset();
    });
  }

  onUpdate(): void {

  }
}
