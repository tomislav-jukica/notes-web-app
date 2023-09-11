import { Component, Input, OnInit } from '@angular/core';
import { NoteService } from '../note.service';
import { Router } from '@angular/router';
import { NoteListComponent } from '../note-list/note-list.component';
import { NormalNote, Note } from '../models/note.model';
import { Checklist } from '../models/checklist.model';
import { ChecklistElement } from '../models/checklistElement.model';


@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css']
})
export class NoteDetailComponent implements OnInit {
  @Input() public normalNote: NormalNote;
  @Input() public checklist: Checklist;
  @Input() public isNormalNote: boolean;
  @Input() public note: (NormalNote | Checklist);
  tags: string[];
  title: string;
  createdAt: string;
  content: string = "";
  isPinned: boolean;
  color: string;
  checklistElements: ChecklistElement[] = new Array<ChecklistElement>();


  constructor(
    private noteService: NoteService,
    private router: Router,
    private noteList: NoteListComponent) { }

  ngOnInit(): void {
    this.normalNote = (this.note as NormalNote);
    this.checklist = (this.note as Checklist);

    if (this.normalNote.content != undefined) {
      this.isNormalNote = true;
      this.normalNote = (this.note as NormalNote);
    } else if (this.checklist.elements != undefined) {
      this.isNormalNote = false;
      this.checklist = (this.note as Checklist);
    } else {
      console.log("error");
    }

    if (this.isNormalNote) {
      this.tags = (this.normalNote as Note).tags?.trim().split(' ');
      this.title = (this.normalNote as Note).title;
      this.createdAt = (this.normalNote as Note).createdAt;
      this.color = (this.normalNote as Note).color;
      this.isPinned = (this.normalNote as Note).isPinned;
    }

    if (!this.isNormalNote) {
      this.tags = (this.checklist as Note).tags?.trim().split(' ');
      this.title = (this.checklist as Note).title;
      this.createdAt = (this.checklist as Note).createdAt;
      this.color = (this.checklist as Note).color;
      this.isPinned = (this.checklist as Note).isPinned;
    }

    if (this.isNormalNote) {
      this.content = this.normalNote.content;
    } else if (!this.isNormalNote) {
      for (let i = 0; i < this.checklist.elements.length; i++) {
        const checklistElement = new ChecklistElement(this.checklist.elements[i].title, this.checklist.elements[i].isChecked);
        this.checklistElements.push(checklistElement);
      }
    }
  }

  onEdit() {
    if (this.isNormalNote) {
      this.router.navigate([this.normalNote.id]);
    } else {
      this.router.navigate(['/checklist', this.checklist.id]);
    }

  }

  onDelete() {
    if (this.isNormalNote) {
      this.noteService.delete(this.normalNote.id, this.isNormalNote).subscribe(
        (result: null) => {
          console.log(result);
          this.noteList.refreshList();
        }, (error) => {
          console.error(error);
        }
      );
    } else {
      this.noteService.delete(this.checklist.id, this.isNormalNote).subscribe(
        () => {
          this.noteList.refreshList();
        }, (error) => {
          console.error(error);
        }
      );
    }

  }

  onOpen() {
    if (this.isNormalNote) {
      //TODO maybe make a different view page
      this.router.navigate([this.normalNote.id]);
    } else {
      this.router.navigate(['/checklist', this.checklist.id]);
    }
  }

  onPin() {
    if (this.isNormalNote) {
      this.normalNote.isPinned = !this.normalNote.isPinned;
      this.noteService.update(this.normalNote.id, this.normalNote.title, this.normalNote.content, this.normalNote.createdAt, this.normalNote.isPinned, this.normalNote.color, this.normalNote.tags).subscribe(
        () => {
          this.noteList.refreshList();
        }, (error) => {
          console.error(error);
        });
    } else {
      this.checklist.isPinned = !this.checklist.isPinned;
      this.noteService.updateChecklist(this.checklist.id, this.checklist.title, this.checklist.elements, this.checklist.createdAt, this.checklist.isPinned, this.checklist.color, this.checklist.tags).subscribe(
        () => {
          this.noteList.refreshList();
        }, (error) => {
          console.error(error);
        });
    }
  }

  onCheckboxChange(value: boolean, element: ChecklistElement) {
    const foundElement = this.checklist.elements.find(x => x == element);
    if (foundElement != undefined) {
      foundElement.isChecked = value;
      this.noteService.updateChecklist(
        this.checklist.id,
        this.checklist.title,
        this.checklist.elements,
        this.checklist.createdAt,
        this.checklist.isPinned,
        this.checklist.color,
        this.checklist.tags
      ).subscribe(
        (result) => {
          console.log(result);
        }, (error) => {
          console.error(error);
        }
      )
    }
  }
}

