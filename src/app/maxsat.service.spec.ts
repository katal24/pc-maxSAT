import { TestBed, inject } from '@angular/core/testing';

import { MaxsatService } from './maxsat.service';

describe('MaxsatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MaxsatService]
    });
  });

  it('should be created', inject([MaxsatService], (service: MaxsatService) => {
    expect(service).toBeTruthy();
  }));
});
