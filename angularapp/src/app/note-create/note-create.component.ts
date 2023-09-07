import { Component, OnInit } from '@angular/core';
import { Note } from '../models/note.model';
import { NgForm } from '@angular/forms';
import { NoteService } from '../note.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

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
    this.note.content = form.value.content;
    this.note.createdAt = formatDate(Date.now(), 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0200');

    this.noteService.add(this.note).subscribe(
      (result) => {
        console.log(result);
        this.router.navigate(['']);
      }, (error) => {
        console.error(error);
      }
    );
  }

}
