import { TestBed } from '@angular/core/testing';

import { CollapsedSidebar } from './collapsed-sidebar';

describe('CollapsedSidebar', () => {
  let service: CollapsedSidebar;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollapsedSidebar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
