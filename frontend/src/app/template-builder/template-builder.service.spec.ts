import { TestBed } from '@angular/core/testing';

import { TemplateBuilderService } from './template-builder.service';

describe('TemplateBuilderService', () => {
  let service: TemplateBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemplateBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
