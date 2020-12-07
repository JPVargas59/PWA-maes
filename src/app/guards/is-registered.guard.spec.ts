import { TestBed, async, inject } from '@angular/core/testing';

import { IsRegisteredGuard } from './is-registered.guard';

describe('IsRegisteredGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsRegisteredGuard]
    });
  });

  it('should ...', inject([IsRegisteredGuard], (guard: IsRegisteredGuard) => {
    expect(guard).toBeTruthy();
  }));
});
