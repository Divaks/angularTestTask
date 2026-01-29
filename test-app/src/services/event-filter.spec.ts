import { TestBed } from '@angular/core/testing';

import { EventFilter } from './event-filter';

describe('EventFilter', () => {
  let service: EventFilter;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventFilter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
