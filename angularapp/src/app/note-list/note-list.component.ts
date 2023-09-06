import { Component, OnInit } from '@angular/core';
import { Note } from '../models/note.model';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {
  public notes?: Note[];
  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    this.noteService.getAll().subscribe(
      (result: Note[]) => {
        this.notes = result;
        console.log(this.notes);
      }, (error) => {
        console.error(error);
      }
    );
  }

  title = 'angularapp';
}
