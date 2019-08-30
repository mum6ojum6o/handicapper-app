import { TestBed } from '@angular/core/testing';

import { PlayerslistService } from './playerslist.service';

describe('PlayerslistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlayerslistService = TestBed.get(PlayerslistService);
    expect(service).toBeTruthy();
  });
});
