import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteCreateComponent } from './note-create.component';

describe('NoteCreateComponent', () => {
  let component: NoteCreateComponent;
  let fixture: ComponentFixture<NoteCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoteCreateComponent]
    });
    fixture = TestBed.createComponent(NoteCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
