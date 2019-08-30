import { TestBed } from '@angular/core/testing';

import { SinglegolfcourseService } from './singlegolfcourse.service';

describe('SinglegolfcourseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SinglegolfcourseService = TestBed.get(SinglegolfcourseService);
    expect(service).toBeTruthy();
  });
});
