import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteDetailComponent } from './note-detail/note-detail.component';
import { NoteCreateComponent } from './note-create/note-create.component';
import { NoteEditComponent } from './note-edit/note-edit.component';
import { RouterModule } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ScrollerModule } from 'primeng/scroller';
import { LayoutComponent } from './layout/layout.component';
import { InputTextModule } from 'primeng/inputtext';
import { ColorPickerModule } from 'primeng/colorpicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TagModule } from 'primeng/tag';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    NoteListComponent,
    NoteDetailComponent,
    NoteCreateComponent,
    NoteEditComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ButtonModule,
    CardModule,
    ScrollerModule,
    InputTextModule,
    FormsModule,
    ColorPickerModule,
    BrowserAnimationsModule,
    TagModule,
    SelectButtonModule,
    CheckboxModule,
    RouterModule.forRoot([
      {
        path: '', component: LayoutComponent, children: [
          { path: '', component: NoteListComponent },
          { path: 'create', component: NoteCreateComponent },
          { path: ':checklist/:id', component: NoteEditComponent },
          { path: ':id', component: NoteEditComponent },          
      ] },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
