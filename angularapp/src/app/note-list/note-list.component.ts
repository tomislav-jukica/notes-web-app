/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { NormalNote, Note } from '../models/note.model';
import { Checklist } from '../models/checklist.model';
import { NoteService } from '../note.service';
import { ChecklistElement } from '../models/checklistElement.model';
import { AuthService } from '../auth.service';
import { catchError, forkJoin, map, mergeMap, of, throwError } from 'rxjs';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {
  public notes: (Checklist | NormalNote)[] = new Array<(Checklist | NormalNote)>();
  filteredNotes: (Checklist | NormalNote)[] = new Array<(Checklist | NormalNote)>();
  pinnedNotes: Note[] = new Array<Note>();

  normalNotes: NormalNote[] = new Array<NormalNote>();
  checklists: Checklist[] = new Array<Checklist>();
  isLoading: boolean;

  private isSortedByDate: boolean = false;
  private isSortedByTitle: boolean = false;

  constructor(private noteService: NoteService, private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.refreshList();
  }

  title = 'angularapp';

  refreshList() {
    this.normalNotes = new Array<NormalNote>();
    this.checklists = new Array<Checklist>();

    this.noteService.getAll().pipe(
      catchError(error => {
        console.error(error);
        return throwError(() => error);
      }),
      mergeMap((result: NormalNote[]) => {
        this.normalNotes = result;
        return this.noteService.getAllChecklists();
      }),
      catchError(error => {
        console.error(error);
        return throwError(() => error);
      }),
      mergeMap((checklists: Checklist[]) => {
        const checklistObservables = checklists.map(checklist =>
          this.noteService.getAllChecklistElements(checklist.id).pipe(
            catchError(error => {
              console.error(error);
              return of([]); // Return an empty array if there's an error
            }),
            map((checklistElements: ChecklistElement[]) => {
              checklist.elements = checklistElements;
              this.checklists.push(checklist);
              return this.checklists;
            })
          )
        );
        return forkJoin(checklistObservables);
      }),
      catchError(error => {
        console.error(error);
        return throwError(() => error);
      })
    ).subscribe(() => {
      this.notes = [...this.normalNotes, ...this.checklists];
      this.filteredNotes = this.notes;

      if (this.isSortedByTitle) {
        this.sortByTitle();
      } else if (this.isSortedByDate) {
        this.sortByTime();
      } else {
        this.filteredNotes.sort((a, b) => {
          if (a.isPinned && !b.isPinned) {
            return -1;
          } else if (!a.isPinned && b.isPinned) {
            return 1;
          }
          return 0;
        });
      }
      this.isLoading = false;
    });
  }

  filter(event: Event) {
    let query = (event.target as HTMLInputElement).value;
    query = query.toLowerCase().trim();

    let allResults: Note[] = new Array<Note>();
    const words: string[] = query.split(' ');

    words.forEach(word => {
      const results: Note[] = this.relevantNotes(word);
      allResults = [...allResults, ...results]
    });

    const uniqueResults = this.removeDuplicates(allResults);
    this.filteredNotes = uniqueResults;
  }

  removeDuplicates(array: Array<any>): Array<any> {
    const uniqueResults: Set<any> = new Set<any>();
    array.forEach(e => uniqueResults.add(e));
    return Array.from(uniqueResults);
  }

  relevantNotes(query: string): Array<Note> {
    query = query.toLowerCase().trim();

    const relevantNotes = this.notes.filter(note => {
      if ((note as NormalNote).content != undefined) {
        if ((note as NormalNote).content.toLowerCase().includes(query)
          || note.title.toLowerCase().includes(query)
          || (note.tags != null && note.tags.toLowerCase().includes(query))) {
          return true;
        }
      } else if ((note as Checklist).elements != undefined) {
        let checklistContent = "";
        (note as Checklist).elements.forEach(e => {
          checklistContent += e.title + " ";
        });
        if (checklistContent.toLowerCase().includes(query)
          || note.title.toLowerCase().includes(query)
          || (note.tags != null && note.tags.toLowerCase().includes(query))) {
          return true;
        }
      }      
      return false;
    });

    return relevantNotes;
  }

  sortByTime() {
    this.isSortedByTitle = false;
    this.isSortedByDate = true;

    this.filteredNotes.sort((a, b) => {
      if (a.isPinned && !b.isPinned) {
        return -1;
      } else if (!a.isPinned && b.isPinned) {
        return 1;
      }

      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    console.log(this.filteredNotes);
  }

  sortByTitle() {
    this.isSortedByTitle = true;
    this.isSortedByDate = false;

    this.filteredNotes.sort((a, b) => {

      if (a.isPinned && !b.isPinned) {
        return -1;
      } else if (!a.isPinned && b.isPinned) {
        return 1;
      }

      return a.title.localeCompare(b.title);
    });
  }

  canEdit(): boolean {
    return (this.authService.getRole() == 0 || this.authService.getRole() == 1);
  }
}

