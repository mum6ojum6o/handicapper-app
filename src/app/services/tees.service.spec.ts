import { TestBed } from '@angular/core/testing';

import { TeesService } from './tees.service';

describe('TeesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TeesService = TestBed.get(TeesService);
    expect(service).toBeTruthy();
  });
});
