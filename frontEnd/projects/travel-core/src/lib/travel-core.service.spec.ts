import { TestBed } from '@angular/core/testing';

import { TravelCoreService } from './travel-core.service';

describe('TravelCoreService', () => {
  let service: TravelCoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TravelCoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
