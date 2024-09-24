import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from '../auth/auth.state';
import { Router, RouterModule } from '@angular/router';
import { selectAuthToken, selectUserById } from '../auth/auth.selectors';
import { logout } from '../auth/auth.actions';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormField } from '@angular/material/form-field';
import { User } from '../auth/user.model';
import { environment } from '../../environments/environments';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule, 
    RouterModule, 
    MatFormField,
    CommonModule,
    MatButton,
    MatIcon
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  username: string | null = '';
  profilePicture: string | null = '';
  role: string | null = '';

  constructor(private store: Store<AuthState>, private router: Router) {
    this.store.select(selectAuthToken).subscribe(token => {
      if (token) {
        const decodedToken: any = jwtDecode(token);

        this.store.select(selectUserById(decodedToken.sub)).subscribe((user: User | undefined) => {
          if (user) {
            this.username = user.username;
            this.profilePicture = `${environment.backendUrl}${user.picture}`;
            this.role = user.role;
          }
        });
      }})
    }


  logout(): void {
    this.store.dispatch(logout());
    this.router.navigate(['/login']);
  }

  isAdmin(): boolean {
    return this.role === 'ADMIN';
  }

  isConsumer(): boolean {
    return this.role === 'CONSUMER';
  }
}
