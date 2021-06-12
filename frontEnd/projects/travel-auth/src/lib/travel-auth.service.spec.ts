import { TestBed } from '@angular/core/testing';

import { TravelAuthService } from './travel-auth.service';

describe('TravelAuthService', () => {
  let service: TravelAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TravelAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
