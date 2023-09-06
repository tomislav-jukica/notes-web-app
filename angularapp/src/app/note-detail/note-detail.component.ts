import { Component, Input } from '@angular/core';
import { Note } from '../note-list/note-list.component';


@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css']
})
export class NoteDetailComponent {
  @Input() public note: Note;
}

