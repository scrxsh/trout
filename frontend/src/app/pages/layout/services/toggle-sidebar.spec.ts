import { TestBed } from '@angular/core/testing';

import { ToggleSidebar } from './toggle-sidebar';

describe('ToggleSidebar', () => {
  let service: ToggleSidebar;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToggleSidebar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
