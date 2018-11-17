import { TestBed } from '@angular/core/testing';

import { GoDaddyService } from './go-daddy.service';

describe('GoDaddyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GoDaddyService = TestBed.get(GoDaddyService);
    expect(service).toBeTruthy();
  });
});
