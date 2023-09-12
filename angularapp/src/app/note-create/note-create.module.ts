import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteCreateComponent } from './note-create.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';

const routes: Routes = [
  {
    path: '',
    component: NoteCreateComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    SelectButtonModule,
    InputTextModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NoteCreateComponent]
})
export class NoteCreateModule { }
