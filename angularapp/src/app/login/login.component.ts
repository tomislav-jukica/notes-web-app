import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) { }


  onSubmit(): void {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        if (response && response.token) {
          this.authService.setToken(response.token);
          this.authService.setRole(response.role);
          this.router.navigate(['']);
          console.log('Login successful');
        } else {
          console.log('Login failed');
        }
      },
      (error) => {
        console.error('An error occurred:', error);
      }
    );
  }
}
