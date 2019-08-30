import { TestBed } from '@angular/core/testing';

import { HolesService } from './holes.service';

describe('HolesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HolesService = TestBed.get(HolesService);
    expect(service).toBeTruthy();
  });
});
