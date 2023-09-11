/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NormalNote } from '../models/note.model';
import { NgForm } from '@angular/forms';
import { NoteService } from '../note.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { Checklist } from '../models/checklist.model';
import { ChecklistElement } from '../models/checklistElement.model';

@Component({
  selector: 'app-note-create',
  templateUrl: './note-create.component.html',
  styleUrls: ['./note-create.component.css']
})
export class NoteCreateComponent implements OnInit {
  note: NormalNote;
  checklist: Checklist;

  stateOptions: any[] = [
    { label: 'Normal', value: false },
    { label: 'Checklist', value: true }
  ];
  isChecklist: boolean = false;
  checklistElement: string = "";
  checklistElements: string[] = new Array<string>();
  constructor(private noteService: NoteService, private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.note = new NormalNote("", "", "", "#ffffff", "");
  }

  onSubmit(form: NgForm) {
    if (this.isChecklist) {
      this.checklist = new Checklist(
        form.value.title,
        formatDate(Date.now(), 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0200'),
        form.value.color,
        form.value.tags,
       );
      this.checklist.elements = new Array<ChecklistElement>();

      for (let i = 0; i < this.checklistElements.length; i++) {
        const newElement = new ChecklistElement(this.checklistElements[i], false);
        this.checklist.elements.push(newElement);
      }

      this.noteService.addChecklist(this.checklist).subscribe(
        (result) => {
          console.log(result);
          this.router.navigate(['']);
        }, (error) => {
          console.error(error);
        }
      );

    } else {
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

  onSelectionChange(event: any) {
    console.log('Selected value:', event.value); // The selected value
    // Handle the selection change here
  }

  addChecklistElement() {

    if (this.checklistElement?.trim() != "") {

      console.log(this.checklistElement);
      this.checklistElements.push(this.checklistElement.trim());
      this.checklistElement = "";
    }
  }

}
