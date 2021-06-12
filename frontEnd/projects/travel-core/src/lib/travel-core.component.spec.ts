import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelCoreComponent } from './travel-core.component';

describe('TravelCoreComponent', () => {
  let component: TravelCoreComponent;
  let fixture: ComponentFixture<TravelCoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelCoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
