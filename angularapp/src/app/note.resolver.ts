/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { NoteService } from './note.service';
import { EMPTY, Observable, catchError, delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class NoteResolver implements Resolve<any> {
  constructor(private noteService: NoteService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) :Observable<any> {
      const noteId = route.params['id'];
      return this.noteService.get(noteId).pipe(
        catchError(() => {
          console.error("error while getting note data");
          return EMPTY;
        })
      );
    }
  
}
