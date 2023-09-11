import { Injectable } from '@angular/core';
import { NormalNote } from './models/note.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Checklist } from './models/checklist.model';
import { ChecklistElement } from './models/checklistElement.model';


@Injectable({
  providedIn: 'root'
})
export class NoteService {
  notes: NormalNote[] = new Array<NormalNote>();
  note: NormalNote;

  constructor(private http: HttpClient) {
    this.getAll();
  }

  getAll(): Observable<NormalNote[]> {
    return this.http.get<NormalNote[]>('/notes');
  }

  get(id: number): Observable<NormalNote> {
    return this.http.get<NormalNote>('/notes/' + id);
  }

  getChecklist(id: number): Observable<Checklist> {
    return this.http.get<Checklist>('/notes/checklist/' + id);
  }

  add(note: NormalNote): Observable<NormalNote> {
    console.log(note);
    return this.http.post<NormalNote>('/notes', note);

  }

  update(id: number, title: string, content: string, createdAt: string, isPinned: boolean, color: string, tags: string): Observable<NormalNote> {
    const newNote = new NormalNote(title, content, createdAt, color, tags);
    newNote.id = id;
    newNote.isPinned = isPinned;
    return this.http.put<NormalNote>('/notes/' + id, newNote);
  }

  updateChecklist(id: number, title: string, elements: ChecklistElement[], createdAt: string, isPinned: boolean, color: string, tags: string): Observable<Checklist> {
    const newNote = new Checklist(title, createdAt, color, tags);
    newNote.elements = elements;
    newNote.isPinned = isPinned;
    return this.http.put<Checklist>('/notes/checklist/' + id, newNote);
  }

  delete(id: number, normalNote: boolean): Observable<null> {
    if (normalNote) {
      return this.http.delete<null>('/notes/' + id);
    } else {
      return this.http.delete<null>('/notes/checklist/' + id);
    }

  }

  getAllChecklists(): Observable<Checklist[]> {
    return this.http.get<Checklist[]>('/notes/checklist');
  }

  getAllChecklistElements(id: number): Observable<ChecklistElement[]> {
    return this.http.get<ChecklistElement[]>('/notes/checklist/elements/' + id);
  }

  addChecklist(checklist: Checklist) {
    console.log(checklist);
    return this.http.post<Checklist>('/notes/checklist', checklist);
  }
}
