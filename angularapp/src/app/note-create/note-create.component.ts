import { Component, OnInit } from '@angular/core';
import { Note } from '../models/note.model';
import { NgForm } from '@angular/forms';
import { NoteService } from '../note.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-note-create',
  templateUrl: './note-create.component.html',
  styleUrls: ['./note-create.component.css']
})
export class NoteCreateComponent implements OnInit {
  note: Note;
  constructor(private noteService: NoteService, private router: Router) {}

  ngOnInit(): void {
    this.note = new Note("","","");
  }

  onSubmit(form: NgForm) {
    this.note.title = form.value.title;
    this.note.content = form.value.title;
    this.note.createdAt = "this should be some time"; //TODO get time

    this.noteService.add(this.note).subscribe(
      (result) => {
        console.log(result);
      }, (error) => {
        console.error(error);
      }
    );

    this.router.navigate(['']);
  }

}
