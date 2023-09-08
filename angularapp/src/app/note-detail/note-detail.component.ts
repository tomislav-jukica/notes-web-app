import { Component, Input } from '@angular/core';
import { Note } from '../models/note.model';
import { NoteService } from '../note.service';
import { Router } from '@angular/router';
import { NoteListComponent } from '../note-list/note-list.component';


@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css']
})
export class NoteDetailComponent {
  @Input() public note: Note;

  constructor(
    private noteService: NoteService,
    private router: Router,
    private noteList: NoteListComponent) { }

  onEdit() {
    this.router.navigate([this.note.id]);
  }

  onDelete() {
    this.noteService.delete(this.note.id).subscribe(
      (result: null) => {
        console.log(result);
        this.noteList.afterDelete(this.note);
      }, (error) => {
        console.error(error);
      }
    );
  }

  onOpen() {
    //TODO maybe make a different view page
    this.router.navigate([this.note.id]);
  }

  onPin() {
    this.note.isPinned = !this.note.isPinned;
    this.noteService.update(this.note.id, this.note.title, this.note.content, this.note.isPinned).subscribe(
      (result) => {
        console.log(result);
        this.noteList.ngOnInit();
      }
    );
  }

}

