import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from './auth.state';
import { map, Observable, tap } from 'rxjs';
import { selectIsAuthenticated } from './auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AuthState>, private router: Router) {}
  
  canActivate(): Observable<boolean> {
    return this.store.select(selectIsAuthenticated).pipe(
      tap(isAuthenticated => {
        // console.log('Guard: isAuthenticated', isAuthenticated); // Debug log
        if (!isAuthenticated) {
          this.router.navigate(['/login']);
        }
      }),
      map(isAuthenticated => isAuthenticated)
    );
  }
  
}
