import { Component, Input, OnInit } from '@angular/core';
import { Note } from '../models/note.model';
import { NoteService } from '../note.service';
import { Router } from '@angular/router';
import { NoteListComponent } from '../note-list/note-list.component';


@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css']
})
export class NoteDetailComponent implements OnInit {
  @Input() public note: Note;
  tags: string;

  constructor(
    private noteService: NoteService,
    private router: Router,
    private noteList: NoteListComponent) { }

  ngOnInit(): void {
    this.tags = this.note.tags;
    console.log(this.tags);
    }

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
    this.noteService.update(this.note.id, this.note.title, this.note.content, this.note.createdAt, this.note.isPinned, this.note.color, this.note.tags).subscribe(
      (result) => {
        console.log(result);
        this.noteList.ngOnInit();
      }
    );
  }

}

