import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from '../auth/user.model';
import { AuthState } from '../auth/auth.reducer';
import { Store } from '@ngrx/store';
import { loginSuccess, registerSuccess } from '../auth/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';  

  constructor(private http: HttpClient, private store: Store<AuthState>) {}

  login(username: string, password: string): Observable<{ token: string, user: User }> {
    return this.http.post<{ token: string, user: User }>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        tap(response => {
          this.store.dispatch(loginSuccess({ token: response.token, user: response.user }));
        })
      );
  }

  register(username: string, email: string, password: string, picture: File | null): Observable<{ token: string, user: User }> {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    if (picture) {
      formData.append('picture', picture);
    }

    return this.http.post<{ token: string, user: User }>(`${this.apiUrl}/register`, formData)
      .pipe(
        tap(response => {
          this.store.dispatch(registerSuccess({ token: response.token, user: response.user }));
        })
      );
  }

  getUserDetails(): Observable<any> {
    return this.http.get(`${this.apiUrl}/me`);
  }
}
