import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent {
  public notes?: Note[];

  constructor(http: HttpClient) {
    http.get<Note[]>('/notes').subscribe(result => {
      this.notes = result;
    }, error => console.error(error));
  }

  title = 'angularapp';
}
export interface Note {
  title: string;
  content: string;
  createdAt: string;
}
