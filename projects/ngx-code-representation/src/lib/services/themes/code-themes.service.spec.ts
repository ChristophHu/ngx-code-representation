import { TestBed } from '@angular/core/testing';

import { NgxCodeThemesService } from './code-themes.service';

describe('NgxCodeThemesService', () => {
  let service: NgxCodeThemesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxCodeThemesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
