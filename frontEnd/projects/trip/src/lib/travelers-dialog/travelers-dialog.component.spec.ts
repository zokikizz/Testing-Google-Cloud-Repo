import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelersDialogComponent } from './travelers-dialog.component';

describe('TravelersDialogComponent', () => {
  let component: TravelersDialogComponent;
  let fixture: ComponentFixture<TravelersDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelersDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
