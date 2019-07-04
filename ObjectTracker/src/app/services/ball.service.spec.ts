import { TestBed } from '@angular/core/testing';

import { BallService } from './ball.service';

describe('BallService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BallService = TestBed.get(BallService);
    expect(service).toBeTruthy();
  });
});
