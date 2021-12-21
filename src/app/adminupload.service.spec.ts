import { TestBed } from '@angular/core/testing';

import { AdminuploadService } from './adminupload.service';

describe('AdminuploadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminuploadService = TestBed.get(AdminuploadService);
    expect(service).toBeTruthy();
  });
});
