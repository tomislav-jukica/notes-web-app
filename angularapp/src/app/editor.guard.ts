import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';


export const editorGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.getRole() == 0 || authService.getRole() == 1) {
    return true;
  } else {
    router.navigate(['']);
    return false;
  }
};
