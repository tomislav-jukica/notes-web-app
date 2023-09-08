import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Note } from '../models/note.model';
import { NoteService } from '../note.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.css']
})
export class NoteEditComponent implements OnInit {

  note: Note;
  private id: number;
  private routeSub: Subscription;
  loading: boolean;

  constructor(
    private noteService: NoteService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.loading = true;
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
    })

    this.noteService.get(this.id).subscribe(
      (result) => {
        this.note = result;
        this.loading = false;
      }, (error) => {
        console.error(error);
      }
    );
  }

  onSubmit(form: NgForm) {
    this.noteService.update(this.id, form.value.title, form.value.content, formatDate(Date.now(), 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0200'), this.note.isPinned, form.value.color, form.value.tags).subscribe(
      () => {
        console.log(this.note.tags);
        this.router.navigate(['']);
      }, (error) => {
        console.error(error);
      }
    );
  }
}
