import { TestBed } from '@angular/core/testing';

import { PasswordRessetService } from './password-resset.service';

describe('PasswordRessetService', () => {
  let service: PasswordRessetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordRessetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
