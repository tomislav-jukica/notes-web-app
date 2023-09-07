/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { Note } from '../models/note.model';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {
  public notes: Note[] = new Array<Note>();
  filteredNotes: Note[] = new Array<Note>();
  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
    this.noteService.getAll().subscribe(
      (result: Note[]) => {
        this.notes = result;
        this.filteredNotes = this.notes;
      }, (error) => {
        console.error(error);
      }
    );
  }

  title = 'angularapp';

  afterDelete(note: Note) {
    this.noteService.getAll().subscribe(
      (result: Note[]) => {
        const index = this.filteredNotes.indexOf(note);
        if (index !== -1) {
          this.filteredNotes.splice(index, 1);
        }
        this.notes = result;
      }, (error) => {
        console.error(error);
      }
    );
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
      if (note.content.toLowerCase().includes(query) || note.title.toLowerCase().includes(query)) {
        return true;
      }
      return false;
    });

    return relevantNotes;
  }

  sortByTime() {
    this.filteredNotes.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  }

  sortByTitle() {
    this.filteredNotes.sort((a, b) => {
      return a.title.localeCompare(b.title);
    });
  }
}

