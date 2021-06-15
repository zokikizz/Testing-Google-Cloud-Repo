import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TransitService} from '../transit.service';
import {ListResponseInterface, Trip} from '../interfaces/list-response.interface';
import {Observable} from 'rxjs';

export interface Transit {
  company_name?: string;
  price?: number;
  transit_type?: any;
  start?: Date | undefined;
  end?: Date | undefined;
  trip?: Trip | number;
}

@Component({
  selector: 'lib-transit-dialog',
  templateUrl: './transit-dialog.component.html',
  styleUrls: ['./transit-dialog.component.css']
})
export class TransitDialogComponent implements OnInit {
  transitList: Observable<ListResponseInterface<Transit>> | undefined;
  transitForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<TransitDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder,
    private transitService: TransitService) {
    this.transitForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.transitList = this.transitService.getList(this.data.id);
  }

  onClickFillForm(transit: Transit): void {
  }

  removeDestination(transit: Transit): void {
  }

  onSave(): void {

  }

  onUpdate(): void {

  }
}
