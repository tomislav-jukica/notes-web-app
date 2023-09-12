/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'secretsecretsecretsecretsecretsecret';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const number = -1;
    const credentials = {
      number,
      username,
      password
    };
    return this.http.post<any>(`/notes/login`, credentials);
  }

  logout(): void {
    sessionStorage.removeItem(this.tokenKey);
  }

  setToken(token: string): void {
    sessionStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
