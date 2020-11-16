import { TestBed } from '@angular/core/testing';

import { ApprovalsService } from './approvals.service';

describe('ApprovalsService', () => {
  let service: ApprovalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApprovalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
