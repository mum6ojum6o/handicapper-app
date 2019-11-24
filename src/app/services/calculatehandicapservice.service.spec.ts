import { TestBed } from '@angular/core/testing';

import { CalculatehandicapserviceService } from './calculatehandicapservice.service';

describe('CalculatehandicapserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CalculatehandicapserviceService = TestBed.get(CalculatehandicapserviceService);
    expect(service).toBeTruthy();
  });
});
