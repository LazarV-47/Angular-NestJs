import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from '../auth/user.model';
import { AuthState } from '../auth/auth.state';
import { Store } from '@ngrx/store';
import { loginSuccess, registerSuccess } from '../auth/auth.actions';
import { LoginDTO } from '../auth/auth-dto/login.dto';
import { RegisterDTO } from '../auth/auth-dto/register.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';  

  constructor(private http: HttpClient, private store: Store<AuthState>) {}

  login(credentials: LoginDTO): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, credentials);
  }

  register(credentials: RegisterDTO): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/register`, credentials);
  }

  getUserDetails(): Observable<any> {
    return this.http.get(`${this.apiUrl}/me`);
  }
}
