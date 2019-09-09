import { TestBed } from '@angular/core/testing';

import { RoundDetailsService } from './round-details.service';

describe('RoundDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoundDetailsService = TestBed.get(RoundDetailsService);
    expect(service).toBeTruthy();
  });
});
