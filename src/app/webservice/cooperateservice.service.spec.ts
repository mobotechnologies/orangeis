import { TestBed } from '@angular/core/testing';

import { CooperateserviceService } from './cooperateservice.service';

describe('CooperateserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CooperateserviceService = TestBed.get(CooperateserviceService);
    expect(service).toBeTruthy();
  });
});
