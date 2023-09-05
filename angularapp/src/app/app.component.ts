import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public notes?: Note[];

  constructor(http: HttpClient) {
    http.get<Note[]>('/notes').subscribe(result => {
      this.notes = result;
    }, error => console.error(error));
  }

  title = 'angularapp';
}

interface Note {
  title: string;
  content: string;
  createdAt: string;
}
