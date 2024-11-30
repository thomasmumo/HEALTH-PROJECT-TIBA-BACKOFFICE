import { TestBed } from '@angular/core/testing';

import { AuthSignupService } from './auth-signup.service';

describe('AuthSignupService', () => {
  let service: AuthSignupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthSignupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
