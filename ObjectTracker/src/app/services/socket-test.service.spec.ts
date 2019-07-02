import { TestBed } from '@angular/core/testing';

import { SocketTestService } from './socket-test.service';

describe('SocketTestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SocketTestService = TestBed.get(SocketTestService);
    expect(service).toBeTruthy();
  });
});
