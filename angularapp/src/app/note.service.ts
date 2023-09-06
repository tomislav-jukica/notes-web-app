import { Injectable } from '@angular/core';
import { Note } from './models/note.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  notes: Note[] = new Array<Note>();
  note: Note;

  constructor(private http: HttpClient) {
    this.getAll();
  }

  getAll() : Observable<Note[]> {
    return this.http.get<Note[]>('/notes');
  }

  get(id: number) : Observable<Note> {
    return this.http.get<Note>('/notes/' + id);
  }

  add(note: Note) : Observable<Note> {
    console.log(note);
    return this.http.post<Note>('/notes', note);

  }

  update(id: number, title: string, content: string): Observable<Note>{
    const newNote = new Note(title, content, "some time"); //TODO get time
    newNote.id = id;
    return this.http.put<Note>('/notes/' + id, newNote);
  }

  delete(id: number): Observable<null> {
    return this.http.delete<null>('/notes/' + id);
  }
}
