import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';
import { User } from './user.model';
import { adapter } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

const { selectAll: selectAllUsers, selectEntities: selectUserEntities } = adapter.getSelectors(selectAuthState);


// Select a user by ID
export const selectUserById = (userId: number) => 
  createSelector(selectUserEntities, entities => entities[userId]);

// Select token from the state
export const selectAuthToken = createSelector(
  selectAuthState,
  (state: AuthState) => state.token
);

// Select authentication status
export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenticated
);

// Select error message
export const selectAuthError = createSelector(
  selectAuthState,
  (state: AuthState) => state.error
);