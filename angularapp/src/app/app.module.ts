import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteDetailComponent } from './note-detail/note-detail.component';
import { NoteCreateComponent } from './note-create/note-create.component';
import { NoteEditComponent } from './note-edit/note-edit.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    NoteListComponent,
    NoteDetailComponent,
    NoteCreateComponent,
    NoteEditComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, RouterModule.forRoot([
      { path: 'create', component: NoteCreateComponent },
      { path: 'edit', component: NoteDetailComponent },
      { path: 'list', component: NoteListComponent },
      { path: 'detail', component: NoteDetailComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
