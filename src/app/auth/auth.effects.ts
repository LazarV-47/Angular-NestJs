import { Injectable } from '@angular/core';
import { act, Actions, createEffect, ofType } from '@ngrx/effects';
import { login, loginSuccess, loginFailure, register, registerSuccess, registerFailure, logout } from './auth.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from './user.model';
import { jwtDecode } from "jwt-decode";

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {
  }

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      mergeMap(action =>
        this.authService.login(action.credentials).pipe(
          //tap(response => console.log('Login Response:', response)),
          map(response => {
            //tap(response => console.log('Login Response:', response));
            const decodedToken: any = jwtDecode(response.token);
            const user: User = {
              userId: decodedToken.sub,
              username: decodedToken.username,
              email: decodedToken.email,
              role: decodedToken.role,
              picture: decodedToken.picture
            };
            //console.log(user)
            return loginSuccess({ token: response.token, user: user });
          }),
          catchError(error => of(loginFailure({ error: error.message })))
        )
      )
    )
  );
  

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap(() => {
          this.router.navigate(['/game-list']); 
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(() => 
    this.actions$.pipe(
      ofType(logout),
      tap(() => {
        logout();
        this.router.navigate(['/login']);
      })
    ),
    { dispatch: false }
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(register),
      mergeMap(action => {
        // console.log('Register Action in Effect', action);  // Check if this is reached
        return this.authService.register(action.credentials).pipe(
          map(response => {
            // console.log('Register Success Response', response);  // Check if this is reached
            const decodedToken: any = jwtDecode(response.token);
            const user: User = {
              userId: decodedToken.sub,
              username: decodedToken.username,
              email: decodedToken.email,
              role: decodedToken.role,
              picture: decodedToken.picture
            };
            return registerSuccess({ token: response.token, user: user });
          }),
          catchError(error => {
            // console.error('Register Failure', error);  // Log the error
            return of(registerFailure({ error: error.message }));
          })
        );
      })    
    )
  );

  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(registerSuccess),
        tap(() => {
          this.router.navigate(['/game-list']); 
        })
      ),
    { dispatch: false }
  );
}  

