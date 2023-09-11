import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NormalNote } from '../models/note.model';
import { NoteService } from '../note.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { formatDate } from '@angular/common';
import { Checklist } from '../models/checklist.model';
import { ChecklistElement } from '../models/checklistElement.model';

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.css']
})
export class NoteEditComponent implements OnInit {

  note: NormalNote;
  checklist: Checklist;
  private id: number;
  isNormalNote: boolean;
  private routeSub: Subscription;
  loading: boolean;
  checklistElements: ChecklistElement[];

  constructor(
    private noteService: NoteService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.loading = true;
    this.routeSub = this.route.params.subscribe(params => {
      this.isNormalNote = params['checklist'] != 'checklist';
      this.id = params['id'];
    })

    if (this.isNormalNote) {
      this.noteService.get(this.id).subscribe(
        (result) => {
          this.note = result;
          this.loading = false;
        }, (error) => {
          console.error(error);
        }
      );
    } else {
      this.noteService.getChecklist(this.id).subscribe(
        (result) => {
          this.checklist = result;
          this.loading = false;
          this.checklistElements = result.elements;
        }, (error) => {
          console.error(error);
        }
      );
    }
    
  }

  onSubmit(form: NgForm) {
    if (this.isNormalNote) {
      this.noteService.update(this.id, form.value.title, form.value.content, formatDate(Date.now(), 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0200'), this.note.isPinned, form.value.color, form.value.tags).subscribe(
        () => {
          console.log(this.note.tags);
          this.router.navigate(['']);
        }, (error) => {
          console.error(error);
        }
      );
    } else {
      this.noteService.updateChecklist(
        this.id,
        form.value.title,
        this.checklistElements,
        formatDate(Date.now(), 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0200'),
        this.checklist.isPinned,
        form.value.color,
        form.value.tags).subscribe(
          () => {
            this.router.navigate(['']);
          }, (error) => {
            console.error(error);
          }
        );
    }
  }

  onCheckboxChange(value: boolean, element: ChecklistElement) {
    const checkboxElement = this.checklistElements.find(x => x == element);
    if (checkboxElement != null) {
      checkboxElement.isChecked = value;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onCheckboxTitleChange(input: any, element: ChecklistElement) {
    const checkboxElement = this.checklistElements.find(x => x == element);
    if (checkboxElement != null) {
      checkboxElement.title = input.target.value;
    }
  }
}
