import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransitDialogComponent } from './transit-dialog.component';

describe('TransitDialogComponent', () => {
  let component: TransitDialogComponent;
  let fixture: ComponentFixture<TransitDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransitDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
