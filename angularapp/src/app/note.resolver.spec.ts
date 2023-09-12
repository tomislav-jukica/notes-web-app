import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { noteResolver } from './note.resolver';

describe('noteResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => noteResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
