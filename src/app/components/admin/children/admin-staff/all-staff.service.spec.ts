import { TestBed } from '@angular/core/testing';

import { AllStaffService } from './all-staff.service';

describe('AllStaffService', () => {
  let service: AllStaffService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllStaffService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
