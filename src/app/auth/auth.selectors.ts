import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';
import { User } from './user.model';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenticated
);

export const selectAuthToken = createSelector(
  selectAuthState,
  (state: AuthState) => state.token
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state: AuthState) => state.error
);

export const selectUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);

export const selectUsername = createSelector(
  selectUser,
  (user: User | null) => user ? user.username : null
);

export const selectUserEmail = createSelector(
  selectUser,
  (user: User | null) => user ? user.email : null
);

export const selectUserProfilePicture = createSelector(
  selectUser,
  (user: User | null) => user ? user.profilePicture : null
);