import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { User } from './user.model';

export interface AuthState {
  token: string | null;
  error: string | null;
  isAuthenticated: boolean;
  user: User | null;
}

export const initialState: AuthState = {
  token: null,
  error: null,
  isAuthenticated: false,
  user: null
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { token, user }) => {
    // console.log('Reducer: loginSuccess', token); // Log here
    return {
      ...state,
      token,
      user,
      isAuthenticated: true,
      error: null,
    };
  }),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(AuthActions.logout, state => ({
    ...state,
    token: null,
    user: null,
    isAuthenticated: false,
    error: null,
  })),
  on(AuthActions.registerSuccess, (state, { token, user }) => ({
    ...state,
    token,
    user,
    isAuthenticated: true,
    error: null,
  })),
  on(AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(AuthActions.setUser, (state, { user }) => ({
    ...state,
    user,
  })),
  on(AuthActions.clearUser, (state) => ({
    ...state,
    user: null,
  })),
);
